import React from 'react';

const ShotClock = ({ time, onReset, disabled }) => {
  // Calculate progress for the circle ring
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / 24) * circumference;
  const dashoffset = circumference - progress;

  // Color based on time
  const getColor = () => {
    if (time <= 5) return '#ff0000'; // Critical
    if (time <= 16) return '#ffaa00'; // Warning
    return '#ffffff'; // Normal
  };

  return (
    <div className={`shot-clock-container ${disabled ? 'disabled' : ''}`} onClick={!disabled ? onReset : undefined}>
      <div className="shot-clock-circle">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="time-display" style={{ color: getColor() }}>
          {time}
        </div>
      </div>
      <div className="label">SHOT CLOCK</div>

      <style>{`
        .shot-clock-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.1s;
        }
        .shot-clock-container:active {
          transform: scale(0.95);
        }
        .shot-clock-container.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }
        .shot-clock-circle {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .time-display {
          position: absolute;
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 700;
          text-shadow: 0 0 10px currentColor;
        }
        .label {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default ShotClock;
