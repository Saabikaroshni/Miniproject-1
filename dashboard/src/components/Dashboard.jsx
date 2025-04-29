import { useState, useEffect, useRef } from 'react';
import LEDControl from './LEDControl';
import FanControl from './FanControl';
import SpeakerControl from './SpeakerControl';
import "../css/Dashboard.css";

function Dashboard({ gesture,videoRef }) {
  const [ledColor, setLedColor] = useState(null);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [volume, setVolume] = useState(50);
  const [cameraActive, setCameraActive] = useState(false);

  <video ref={videoRef} autoPlay muted width="320" height="240" className="camera-view" />

  const streamRef = useRef(null);

  useEffect(() => {
    switch (gesture) {
      case 'Thumbs Up':
        setLedColor('green');
        break;
      case 'Thumbs Down':
        setLedColor('red');
        break;
      case 'Palm Open':
        setFanSpeed(5);
        break;
      case 'Fist':
        setFanSpeed(0);
        break;
      case 'Victory':
        setVolume(80);
        break;
      case 'None':
        resetControls();
        break;
      default:
        break;
    }
  }, [gesture]);

  const resetControls = () => {
    setLedColor(null);
    setFanSpeed(0);
    setVolume(50);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  return (
    <div className="dashboard">
      <h1>Wireless Gesture Control Dashboard</h1>

      <section className="gesture-info">
        <h3>Gesture Detected: <span>{gesture || 'None'}</span></h3>
      </section>

      <section className="camera-section">
        <video ref={videoRef} autoPlay muted width="320" height="240" className="camera-view" />
        <div className="camera-buttons">
          {!cameraActive ? (
            <button onClick={startCamera} className="start-btn">Start Camera</button>
          ) : (
            <button onClick={stopCamera} className="stop-btn">Stop Camera</button>
          )}
        </div>
      </section>

      <section className="controls">
        <LEDControl ledColor={ledColor} />
        <FanControl fanSpeed={fanSpeed} />
        <SpeakerControl volume={volume} />
      </section>
    </div>
  );
}

export default Dashboard;
