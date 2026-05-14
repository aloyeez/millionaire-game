import { useEffect, useState } from "react";

const TOTAL = 30;
const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(TOTAL);

  useEffect(() => {
    if (timer === 0) return setStop(true);
    const id = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(TOTAL);
  }, [questionNumber]);

  const progress = timer / TOTAL;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const urgent = timer <= 8;

  return (
    <div className="timer-container">
      <span className="timer-label">Time</span>
      <svg className="timer-svg" viewBox="0 0 80 80">
        <circle className="timer-bg-ring" cx="40" cy="40" r={RADIUS} />
        <circle
          className={`timer-ring${urgent ? " urgent" : ""}`}
          cx="40"
          cy="40"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
        <text className="timer-text" x="40" y="40">
          {timer}
        </text>
      </svg>
    </div>
  );
}
