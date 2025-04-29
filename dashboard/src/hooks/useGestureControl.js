import { useEffect } from 'react';
import * as handTrack from 'handtrackjs';

export function useGestureControl({ videoRef,onGestureDetected }) {
  useEffect(() => {
    let model = null;
    let lastPositions = [];
    let lastBoundingBoxArea = null;
    let intervalId = null;

    async function startVideo() {
      if (!videoRef?.current) {
        console.error('Video element not found via ref');
        return;
      }
      const video = videoRef.current;
      
      

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      await video.play();

      model = await handTrack.load();
      detectHands(video);
    }

    async function detectHands(video) {
      if (!model) return;

      intervalId = setInterval(async () => {
        const predictions = await model.detect(video);

        if (predictions.length > 0) {
          const hand = predictions[0];
          const centerX = hand.bbox[0] + hand.bbox[2] / 2;
          const centerY = hand.bbox[1] + hand.bbox[3] / 2;
          const width = hand.bbox[2];
          const height = hand.bbox[3];
          const currentArea = width * height;
          const currentTime = Date.now();

          lastPositions.push({ x: centerX, y: centerY, time: currentTime });
          if (lastPositions.length > 5) lastPositions.shift();

          detectSwipe(lastPositions, onGestureDetected);

          if (lastBoundingBoxArea !== null) {
            const areaChange = currentArea - lastBoundingBoxArea;

            if (areaChange > 5000) {
              onGestureDetected([{ label: 'hand-open' }]);
            } else if (areaChange < -5000) {
              onGestureDetected([{ label: 'hand-close' }]);
            }
          }

          lastBoundingBoxArea = currentArea;
        }
      }, 300);
    }

    startVideo();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [videoRef,onGestureDetected]);
}

function detectSwipe(positions, onGestureDetected) {
  if (positions.length < 2) return;

  const first = positions[0];
  const last = positions[positions.length - 1];
  const dx = last.x - first.x;
  const dy = last.y - first.y;
  const dt = (last.time - first.time) / 1000;

  if (dt === 0) return;

  const speedX = dx / dt;
  const speedY = dy / dt;

  if (Math.abs(speedY) > Math.abs(speedX)) {
    if (speedY < -300) {
      onGestureDetected([{ label: 'swipe-up' }]);
    } else if (speedY > 300) {
      onGestureDetected([{ label: 'swipe-down' }]);
    }
  } else {
    if (speedX > 300) {
      onGestureDetected([{ label: 'swipe-right' }]);
    } else if (speedX < -300) {
      onGestureDetected([{ label: 'swipe-left' }]);
    }
  }
}
