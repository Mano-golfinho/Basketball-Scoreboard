import React, { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';

const HistoryModal = ({ onClose, user, onLogout }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/games', {
      headers: { 'x-auth-token': token }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history:", err);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/games/${itemToDelete}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      if (res.ok) {
        setGames(games.filter(game => game._id !== itemToDelete));
        setItemToDelete(null);
      } else {
        alert('Failed to delete game');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-modal glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>GAME HISTORY</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="user-info">
          Logged in as: <strong>{user?.username}</strong>
        </div>

        <div className="history-list">
          {loading ? (
            <div className="loading">Loading history...</div>
          ) : games.length === 0 ? (
            <div className="no-history">No games recorded yet.</div>
          ) : (
            games.map(game => (
              <div key={game._id} className="history-item">
                <div className="game-date">
                  {new Date(game.date).toLocaleDateString()} {new Date(game.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="game-result">
                  <div className={`team-result ${game.winner === 'left' ? 'winner ice-text' : ''}`}>
                    <span className="team-name">{game.leftTeam.name}</span>
                    <span className="team-score">{game.leftTeam.score}</span>
                  </div>
                  <div className="vs">VS</div>
                  <div className={`team-result ${game.winner === 'right' ? 'winner fire-text' : ''}`}>
                    <span className="team-score">{game.rightTeam.score}</span>
                    <span className="team-name">{game.rightTeam.name}</span>
                  </div>
                </div>
                <button className="delete-btn" onClick={(e) => handleDeleteClick(game._id, e)}>DELETE</button>
              </div>
            ))
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-logout" onClick={onLogout}>LOG OUT</button>
        </div>
      </div>

      {itemToDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this record?"
          onConfirm={confirmDelete}
          onCancel={() => setItemToDelete(null)}
        />
      )}

      <style>{`
        .history-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }
        .history-modal {
          width: 600px;
          max-width: 90%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          background: #111;
          border: 1px solid #333;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #333;
        }
        .modal-header h2 {
          margin: 0;
          font-family: var(--font-display);
          letter-spacing: 2px;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
        }
        .user-info {
          padding: 0.5rem 1.5rem;
          background: rgba(255,255,255,0.05);
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .history-list {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }
        .history-item {
          background: rgba(255,255,255,0.05);
          margin-bottom: 1rem;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }
        .game-date {
          font-size: 0.8rem;
          opacity: 0.5;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .game-result {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-display);
          font-size: 1.2rem;
        }
        .team-result {
          display: flex;
          gap: 1rem;
          align-items: center;
          width: 40%;
        }
        .team-result:last-child {
          justify-content: flex-end;
        }
        .team-score {
          font-weight: 900;
          font-size: 1.5rem;
        }
        .vs {
          opacity: 0.3;
          font-size: 0.9rem;
        }
        .winner {
          text-shadow: 0 0 10px currentColor;
        }
        .ice-text { color: var(--ice-primary); }
        .fire-text { color: var(--fire-primary); }
        .loading, .no-history {
          text-align: center;
          opacity: 0.5;
          padding: 2rem;
        }
        .delete-btn {
          background: #330000;
          color: #ff6666;
          border: 1px solid #660000;
          padding: 4px 8px;
          font-size: 0.7rem;
          margin-top: 1rem;
          width: 100%;
          cursor: pointer;
          opacity: 0.6;
          transition: all 0.2s;
        }
        .delete-btn:hover {
          opacity: 1;
          background: #550000;
        }
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #333;
          display: flex;
          justify-content: center;
        }
        .btn-logout {
          background: transparent;
          border: 1px solid #555;
          color: #aaa;
          padding: 0.8rem 2rem;
          font-family: var(--font-display);
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-logout:hover {
          border-color: #ff3333;
          color: #ff3333;
        }
      `}</style>
    </div>
  );
};

export default HistoryModal;
