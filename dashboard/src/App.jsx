import { useRef, useState } from 'react';
import { useGestureControl } from './hooks/useGestureControl';
 import Dashboard from './components/Dashboard';

function App() {
  const [gesture, setGesture] = useState('None');
  const videoRef = useRef(null); // ✅ Create a ref for the video element

  useGestureControl({
    videoRef, // ✅ Pass ref to the hook
    onGestureDetected: (predictions) => {
      if (!predictions || predictions.length === 0) {
        setGesture('None');
        return;
      }

      const label = predictions[0].label;

      let mappedGesture;
      switch (label) {
        case 'hand-open':
          mappedGesture = 'Palm Open';
          break;
        case 'hand-close':
          mappedGesture = 'Fist';
          break;
        case 'swipe-up':
          mappedGesture = 'Victory';
          break;
        case 'swipe-down':
          mappedGesture = 'Thumbs Down';
          break;
        case 'swipe-left':
          mappedGesture = 'Thumbs Up';
          break;
        default:
          mappedGesture = 'None';
      }

      setGesture(mappedGesture);
    },
  });

  return <Dashboard gesture={gesture} videoRef={videoRef} />;
}

export default App;
