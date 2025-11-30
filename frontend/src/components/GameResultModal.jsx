import React from 'react';

const GameResultModal = ({ leftTeam, rightTeam, onClose }) => {
    const leftWinner = leftTeam.score > rightTeam.score;
    const isDraw = leftTeam.score === rightTeam.score;

    return (
        <div className="result-overlay">
            <div className="result-modal glass-panel">
                <div className="modal-header">
                    <h2>FINAL SCORE</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="result-content">
                    <div className={`team-result ${leftWinner ? 'winner' : ''}`}>
                        <h3 className="team-name ice-text">{leftTeam.name}</h3>
                        <div className="score">{leftTeam.score}</div>
                    </div>

                    <div className="vs">VS</div>

                    <div className={`team-result ${!leftWinner && !isDraw ? 'winner' : ''}`}>
                        <h3 className="team-name fire-text">{rightTeam.name}</h3>
                        <div className="score">{rightTeam.score}</div>
                    </div>
                </div>

                <div className="winner-announcement">
                    {isDraw ? "IT'S A DRAW" : (leftWinner ? `${leftTeam.name} WINS!` : `${rightTeam.name} WINS!`)}
                </div>
            </div>

            <style>{`
        .result-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
          backdrop-filter: blur(10px);
        }
        .result-modal {
          width: 700px;
          max-width: 90%;
          padding: 2rem;
          background: #111;
          border: 1px solid #333;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .modal-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
        }
        .modal-header h2 {
          margin: 0;
          font-family: var(--font-display);
          letter-spacing: 4px;
          color: #ffd700;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 2.5rem;
          cursor: pointer;
          line-height: 1;
        }
        .result-content {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          margin-bottom: 2rem;
        }
        .team-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          transition: all 0.5s;
        }
        .team-result.winner {
          opacity: 1;
          transform: scale(1.1);
        }
        .team-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        .score {
          font-family: var(--font-display);
          font-size: 6rem;
          font-weight: 700;
          line-height: 1;
        }
        .vs {
          font-family: var(--font-display);
          font-size: 2rem;
          opacity: 0.3;
        }
        .winner-announcement {
          font-family: var(--font-display);
          font-size: 2rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 1rem;
        }
        .ice-text { color: var(--ice-primary); }
        .fire-text { color: var(--fire-primary); }
      `}</style>
        </div>
    );
};

export default GameResultModal;
