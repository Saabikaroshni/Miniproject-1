import { FaVolumeUp } from 'react-icons/fa';
import '../css/ControlCard.css';

function SpeakerControl({ volume }) {
  return (
    <div className="control-card speaker-control">
      <h3 className="control-title"><FaVolumeUp className="icon purple" /> Speaker Control</h3>
      <p>Volume: <strong>{volume}%</strong></p>
      <p>Status: <span className={volume === 0 ? 'status off' : 'status on'}>
        {volume === 0 ? 'MUTED' : 'ACTIVE'}
      </span></p>
    </div>
  );
}

export default SpeakerControl;
