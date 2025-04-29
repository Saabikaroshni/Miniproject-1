import { FaLightbulb } from 'react-icons/fa';
import '../css/ControlCard.css';

function LEDControl({ ledColor }) {
  return (
    <div className="control-card led-control">
      <h3 className="control-title"><FaLightbulb className="icon yellow" /> LED Control</h3>
      {ledColor ? (
        <>
          <p>LED is <strong>ON</strong></p>
          <p>Color: <span className={`led-color ${ledColor}`}>{ledColor.toUpperCase()}</span></p>
        </>
      ) : (
        <p>LEDs are <strong>OFF</strong></p>
      )}
    </div>
  );
}

export default LEDControl;
