import { FaFan } from 'react-icons/fa';
import '../css/ControlCard.css';

function FanControl({ fanSpeed }) {
  return (
    <div className="control-card fan-control">
      <h3 className="control-title"><FaFan className="icon skyblue" /> Fan Control</h3>
      <p>Fan Speed: <strong>{fanSpeed}</strong> / 5</p>
      <p>Status: <span className={fanSpeed === 0 ? 'status off' : 'status on'}>
        {fanSpeed === 0 ? 'OFF' : 'RUNNING'}
      </span></p>
    </div>
  );
}

export default FanControl;
