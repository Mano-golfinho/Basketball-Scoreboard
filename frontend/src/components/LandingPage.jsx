import React, { useState } from 'react';
import AuthModal from './AuthModal';

const LandingPage = ({ onLogin, onGuest }) => {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div className="landing-container">
            {showAuth && <AuthModal onLogin={onLogin} onClose={() => setShowAuth(false)} />}

            <div className="landing-content glass-panel">
                <h1 className="title">BASKETBALL<br />SCOREBOARD</h1>

                <div className="options">
                    <button className="btn-option login" onClick={() => setShowAuth(true)}>
                        LOGIN / REGISTER
                        <span className="sub-text">Save your game history</span>
                    </button>

                    <button className="btn-option guest" onClick={onGuest}>
                        GUEST MODE
                        <span className="sub-text">Temporary game • No history saved</span>
                    </button>
                </div>
            </div>

            <style>{`
        .landing-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #000;
        }
        .landing-content {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 600px;
          width: 90%;
        }
        .title {
          font-family: var(--font-display);
          font-size: 4rem;
          text-align: center;
          line-height: 1;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(255,255,255,0.1);
        }
        .options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }
        .btn-option {
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          font-family: var(--font-display);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          border-radius: 8px;
        }
        .btn-option:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .btn-option.login:hover {
          border-color: var(--ice-primary);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        }
        .btn-option.guest:hover {
          border-color: var(--fire-primary);
          box-shadow: 0 0 20px rgba(255, 50, 0, 0.2);
        }
        .sub-text {
          font-family: var(--font-body);
          font-size: 0.9rem;
          opacity: 0.5;
          font-weight: normal;
          letter-spacing: 1px;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
