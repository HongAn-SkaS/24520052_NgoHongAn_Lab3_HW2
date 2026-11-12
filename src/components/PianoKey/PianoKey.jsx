
import "./PianoKey.css";

export function PianoKey({
  midi,
  noteName,
  isBlack,
  isPressed,
  onNoteOn,
  onNoteOff,
}) {
  const handlePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    onNoteOn(midi);
  };

  const handlePointerUp = () => {
    onNoteOff(midi);
  };

  const handlePointerCancel = () => {
    onNoteOff(midi);
  };

  const handleLostPointerCapture = () => {
    onNoteOff(midi);
  };

  const className = [
    "key",
    isBlack ? "key--black" : "key--white",
    isPressed ? "key--pressed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      data-midi={midi}
      aria-label={`${noteName} piano key`}
      aria-pressed={isPressed}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handleLostPointerCapture}
    >
      <span className="key__label">{noteName}</span>
    </button>
  );
}
