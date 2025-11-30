import React, { useState, useEffect } from 'react';
import TeamPanel from './TeamPanel';
import ShotClock from './ShotClock';
import GameResultModal from './GameResultModal';
import ConfirmModal from './ConfirmModal';

const ScoreBoard = ({ leftName, rightName, onGameEnd, onGuestExit, user, isGuest, onLogout, onShowHistory }) => {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [gameTime, setGameTime] = useState(720); // 12:00
  const [shotClock, setShotClock] = useState(24);
  const [isRunning, setIsRunning] = useState(false);
  const [period, setPeriod] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const [showResultModal, setShowResultModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Main Timer Effect
  useEffect(() => {
    let interval = null;
    if (isRunning && gameTime > 0) {
      interval = setInterval(() => {
        setGameTime((prev) => prev - 1);
        setShotClock((prev) => {
          if (prev <= 1) {
            setIsRunning(false); // Auto-pause when shot clock hits 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameTime]);

  // Period End & Game End Logic
  useEffect(() => {
    if (gameTime === 0) {
      setIsRunning(false);

      if (period < 4) {
        // End of Period 1-3: Reset for next period (12 mins)
        setGameTime(720);
        setPeriod(p => p + 1);
        setShotClock(24);
      } else {
        // End of Period 4 or Overtime
        if (leftScore === rightScore) {
          // It's a tie! Go to Overtime (5 mins)
          setGameTime(300); // 5 minutes
          setPeriod(p => p + 1);
          setShotClock(24);
          alert("OVERTIME! 5 Minutes added.");
        } else {
          // Winner decided
          saveGame(true); // Auto-save
        }
      }
    }
  }, [gameTime, period, leftScore, rightScore]);

  const handleTimerToggle = () => {
    if (isGameOver) return;
    if (!isRunning && shotClock === 0) {
      setShotClock(24); // Auto-reset shot clock if starting from 0
    }
    setIsRunning(!isRunning);
  };

  const handleShotClockReset = () => {
    if (isGameOver) return;
    setShotClock(24);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePeriodNext = () => {
    if (isGameOver) return;
    setPeriod(period + 1);
  };

  const saveGame = async (auto = false) => {
    if (isGuest) {
      setIsGameOver(true);
      setShowResultModal(true);
      return;
    }

    const gameData = {
      leftTeam: { name: leftName, score: leftScore, fouls: 0 },
      rightTeam: { name: rightName, score: rightScore, fouls: 0 },
      winner: leftScore > rightScore ? 'left' : rightScore > leftScore ? 'right' : 'draw'
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(gameData)
      });
      if (res.ok) {
        setIsGameOver(true); // Set game over state
        setShowResultModal(true); // Show result modal instead of alert
      } else {
        alert('Failed to save game');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const handleFinishGameClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmFinish = () => {
    setIsRunning(false);
    setShowConfirmModal(false);
    saveGame();
  };

  const handleCloseResult = () => {
    setShowResultModal(false);
    // Do NOT reset game here anymore. Just stay in "Game Over" state.
  };

  const handleNewGame = () => {
    if (isGuest) {
      if (onGuestExit) onGuestExit();
    } else {
      if (onGameEnd) onGameEnd(); // Reset app state to setup
    }
  };

  const isControlsDisabled = isGameOver || showConfirmModal;

  return (
    <div className="scoreboard-container">
      {showResultModal && (
        <GameResultModal
          leftTeam={{ name: leftName, score: leftScore }}
          rightTeam={{ name: rightName, score: rightScore }}
          onClose={handleCloseResult}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          message={isGuest ? "Finish game? (Guest mode: No history saved)" : "Are you sure you want to finish and save this game?"}
          onConfirm={handleConfirmFinish}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      <div className="top-bar">
        {!isGuest && (
          <button className="btn-history" onClick={onShowHistory}>HISTORY</button>
        )}
      </div>

      <div className="main-board">
        <TeamPanel
          name={leftName}
          score={leftScore}
          theme="ice"
          onScoreChange={(val) => setLeftScore(leftScore + val)}
          disabled={isControlsDisabled}
        />

        <div className="center-column">
          <div className={`glass-panel game-timer-container ${isControlsDisabled ? 'disabled' : ''}`}>
            <div className="timer-label">GAME CLOCK</div>
            <div className="game-timer">{formatTime(gameTime)}</div>
            <button className="btn-timer" onClick={handleTimerToggle} disabled={isControlsDisabled}>
              {isRunning ? 'PAUSE' : (gameTime === 720 || (period > 4 && gameTime === 300) ? 'START' : 'RESUME')}
            </button>
          </div>

          <ShotClock time={shotClock} onReset={handleShotClockReset} disabled={isControlsDisabled} />

          <div className={`period-container glass-panel ${isControlsDisabled ? 'disabled' : ''}`} onClick={handlePeriodNext}>
            <div className="timer-label">PERIOD</div>
            <div className="period-display">{period}</div>
          </div>

          {isGameOver ? (
            <button className="btn-finish new-game" onClick={handleNewGame}>NEW GAME</button>
          ) : (
            <button className="btn-finish" onClick={handleFinishGameClick} disabled={showConfirmModal}>FINISH GAME</button>
          )}
        </div>

        <TeamPanel
          name={rightName}
          score={rightScore}
          theme="fire"
          onScoreChange={(val) => setRightScore(rightScore + val)}
          disabled={isControlsDisabled}
        />
      </div>

      <style>{`
        .scoreboard-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .top-bar {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          min-height: 60px;
        }
        .btn-history {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 4px;
          font-family: var(--font-display);
          letter-spacing: 1px;
        }
        .btn-history:hover {
          background: white;
          color: black;
        }
        .main-board {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          justify-content: center;
          padding: 2rem;
          flex: 1;
        }
        .center-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 200px;
        }
        .game-timer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          width: 100%;
          transition: opacity 0.3s;
        }
        .game-timer-container.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .game-timer {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 0 10px white;
          margin: 0.5rem 0;
        }
        .timer-label {
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.6;
        }
        .btn-timer {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-weight: 700;
          margin-top: 0.5rem;
        }
        .btn-timer:hover {
          background: white;
          color: black;
        }
        .btn-timer.active {
          background: #ff3333;
          border-color: #ff3333;
          color: white;
        }
        .period-container {
          width: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .period-container.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .period-display {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffd700;
        }
        .btn-finish {
          background: #333;
          color: white;
          border: 1px solid #555;
          padding: 1rem;
          width: 100%;
          font-family: var(--font-display);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-finish:hover {
          background: #ff3300;
          border-color: #ff3300;
          box-shadow: 0 0 20px rgba(255, 51, 0, 0.4);
        }
        .btn-finish.new-game {
          background: #006600;
          border-color: #008800;
        }
        .btn-finish.new-game:hover {
          background: #008800;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default ScoreBoard;
