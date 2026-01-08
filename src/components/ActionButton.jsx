import './ActionButton.css';

function ActionButton({ icon, label, onClick }) {
  return (
    <button className="action-button interactive" onClick={onClick}>
      <span className="action-icon">{icon}</span>
      <span className="action-label">{label}</span>
    </button>
  );
}

export default ActionButton;
