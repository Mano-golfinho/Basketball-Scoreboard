import React, { useState, useEffect } from 'react';
import SetupModal from './components/SetupModal';
import ScoreBoard from './components/ScoreBoard';
import LandingPage from './components/LandingPage';
import HistoryModal from './components/HistoryModal';

function App() {
  const [user, setUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState({ left: '', right: '' });
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setGuestMode(false);
  };

  const handleGuest = () => {
    setGuestMode(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setGuestMode(false);
    setGameStarted(false);
    setShowHistory(false);
  };

  const handleStart = (left, right) => {
    setTeams({ left, right });
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    setGameStarted(false);
  };

  const handleGuestExit = () => {
    setGameStarted(false);
    setGuestMode(false);
  };

  if (!user && !guestMode) {
    return <LandingPage onLogin={handleLogin} onGuest={handleGuest} />;
  }

  return (
    <div className="app-container">
      {showHistory && (
        <HistoryModal
          onClose={() => setShowHistory(false)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {!gameStarted && (
        <SetupModal
          onStart={handleStart}
          onViewHistory={!guestMode ? () => setShowHistory(true) : null}
          onLogout={handleLogout}
        />
      )}

      {gameStarted && (
        <ScoreBoard
          leftName={teams.left}
          rightName={teams.right}
          onGameEnd={handleGameEnd}
          onGuestExit={handleGuestExit}
          user={user}
          isGuest={guestMode}
          onLogout={handleLogout}
          onShowHistory={() => setShowHistory(true)}
        />
      )}
    </div>
  );
}

export default App;
