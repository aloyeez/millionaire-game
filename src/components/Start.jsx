import { useRef } from "react";

export default function Start({ setUserName }) {
  const inputRef = useRef();

  const handleClick = () => {
    const name = inputRef.current.value.trim();
    if (name) setUserName(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClick();
  };

  return (
    <div className="start-screen">
      <div className="start-logo">🍺</div>
      <p className="start-eyebrow">Who Wants to Be a Millionaire</p>
      <h1 className="start-title">Beer Edition</h1>
      <p className="start-subtitle">15 questions. One chance. No lifelines.</p>

      <div className="start-card">
        <p className="start-card-label">Your Name</p>
        <input
          className="startInput"
          placeholder="e.g. Hopmaster 3000"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="startButton" onClick={handleClick}>
          Start Playing
        </button>
      </div>

      <div className="start-rules">
        <div className="start-rule">
          <span className="start-rule-icon">⏱</span>
          <span className="start-rule-text">30 sec<br/>per question</span>
        </div>
        <div className="start-rule">
          <span className="start-rule-icon">🎯</span>
          <span className="start-rule-text">15<br/>questions</span>
        </div>
        <div className="start-rule">
          <span className="start-rule-icon">💰</span>
          <span className="start-rule-text">Win up to<br/>$1,000,000</span>
        </div>
      </div>
    </div>
  );
}
