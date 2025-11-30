import React, { useState } from 'react';
import '../index.css';

const SetupModal = ({ onStart, onViewHistory, onLogout }) => {
  const [leftName, setLeftName] = useState('');
  const [rightName, setRightName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leftName && rightName) {
      onStart(leftName, rightName);
    }
  };

  return (
    <div className="setup-overlay">
      <div className="setup-modal glass-panel">
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem', textAlign: 'center' }}>
          NEW GAME
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="team-input-group ice-theme">
            <label style={{ color: 'var(--ice-primary)' }}>TEAM 1</label>
            <input
              type="text"
              value={leftName}
              onChange={(e) => setLeftName(e.target.value)}
              placeholder="Enter Team Name"
              autoFocus
              style={{ borderColor: 'var(--ice-primary)' }}
            />
          </div>

          <div className="vs-divider">VS</div>

          <div className="team-input-group fire-theme">
            <label style={{ color: 'var(--fire-primary)' }}>TEAM 2</label>
            <input
              type="text"
              value={rightName}
              onChange={(e) => setRightName(e.target.value)}
              placeholder="Enter Team Name"
              style={{ borderColor: 'var(--fire-primary)' }}
            />
          </div>

          <button
            type="submit"
            className="start-btn"
            disabled={!leftName || !rightName}
          >
            TIP OFF
          </button>

          {onViewHistory && (
            <button
              type="button"
              className="history-btn"
              onClick={onViewHistory}
            >
              VIEW HISTORY
            </button>
          )}

          <button
            type="button"
            className="logout-btn"
            onClick={onLogout}
          >
            LOG OUT / EXIT
          </button>
        </form>
      </div>
      <style>{`
        .setup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .setup-modal {
          padding: 3rem;
          width: 500px;
          max-width: 90%;
        }
        .team-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .team-input-group label {
          font-weight: 700;
          letter-spacing: 1px;
        }
        .team-input-group input {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1rem;
          color: white;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 1.1rem;
        }
        .team-input-group input:focus {
          outline: none;
          background: rgba(255,255,255,0.15);
        }
        .vs-divider {
          text-align: center;
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin: 1rem 0;
          opacity: 0.5;
        }
        .start-btn {
          width: 100%;
          padding: 1rem;
          margin-top: 1rem;
          background: white;
          color: black;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.2rem;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .start-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        .start-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .history-btn {
          width: 100%;
          padding: 1rem;
          margin-top: 1rem;
          background: transparent;
          color: white;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.2s;
        }
        .history-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }
        .logout-btn {
          width: 100%;
          padding: 0.8rem;
          margin-top: 1rem;
          background: transparent;
          color: #aaa;
          font-size: 0.8rem;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .logout-btn:hover {
          color: #ff6666;
        }
      `}</style>
    </div>
  );
};

export default SetupModal;
