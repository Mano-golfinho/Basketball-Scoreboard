import React from 'react';
import FoulTable from './FoulTable';

const IceIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--ice-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px var(--ice-primary))' }}>
    <path d="M12 2v20" />
    <path d="M12 6l4-4" />
    <path d="M12 6l-4-4" />
    <path d="M20 12h-8" />
    <path d="M4 12h8" />
    <path d="M16 12l4 4" />
    <path d="M16 12l4-4" />
    <path d="M8 12L4 16" />
    <path d="M8 12L4 8" />
    <path d="M12 18l4 4" />
    <path d="M12 18l-4 4" />
  </svg>
);

const FireIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--fire-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px var(--fire-primary))' }}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a7 7 0 0 0 3 2.8z" />
  </svg>
);

const TeamPanel = ({ name, score, theme, onScoreChange, disabled }) => {
  const isIce = theme === 'ice';
  const themeClass = isIce ? 'ice-theme' : 'fire-theme';

  return (
    <div className={`team-panel glass-panel ${themeClass} ${disabled ? 'disabled' : ''}`}>
      <div className="team-header">
        <div className="team-icon">
          {isIce ? <IceIcon /> : <FireIcon />}
        </div>
        <h2 className="team-name glow-text">{name}</h2>
      </div>

      <div className="score-display glow-text">
        {score}
      </div>

      <div className="score-controls">
        <button className="btn-control" disabled={disabled} onClick={() => onScoreChange(1)}>+1</button>
        <button className="btn-control" disabled={disabled} onClick={() => onScoreChange(2)}>+2</button>
        <button className="btn-control" disabled={disabled} onClick={() => onScoreChange(3)}>+3</button>
        <button className="btn-control minus" disabled={disabled} onClick={() => onScoreChange(-1)}>-1</button>
      </div>

      <FoulTable theme={theme} />

      <style>{`
        .team-panel {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 350px;
          transition: border-color 0.3s, opacity 0.3s, filter 0.3s;
          border-color: var(--theme-border);
          background: linear-gradient(180deg, var(--theme-bg) 0%, rgba(0,0,0,0) 100%);
        }
        .team-panel.disabled {
          opacity: 0.5;
          filter: grayscale(0.8);
          pointer-events: none;
        }
        .team-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }
        .team-icon {
          margin-bottom: 1rem;
          animation: float 6s ease-in-out infinite;
        }
        .team-name {
          font-family: var(--font-display);
          font-size: 2rem;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--theme-primary);
        }
        .score-display {
          font-family: var(--font-display);
          font-size: 6rem;
          font-weight: 900;
          line-height: 1;
          margin: 1rem 0 2rem;
          color: white;
        }
        .score-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default TeamPanel;
