import React, { useState } from 'react';

const FoulTable = ({ theme }) => {
    const [players, setPlayers] = useState([]);
    const [newNumber, setNewNumber] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddConfirm = (e) => {
        e.preventDefault();
        if (!newNumber) return;
        setPlayers([...players, { id: Date.now(), number: newNumber, fouls: 1 }]);
        setNewNumber('');
        setIsAdding(false);
    };

    const incrementFoul = (id) => {
        setPlayers(players.map(p =>
            p.id === id ? { ...p, fouls: p.fouls + 1 } : p
        ));
    };

    const themeClass = theme === 'ice' ? 'ice-theme' : 'fire-theme';

    return (
        <div className={`foul-table-container ${themeClass}`}>
            <div className="table-header">
                <span>#</span>
                <span>FOULS</span>
                <span>ACT</span>
            </div>

            <div className="players-list">
                {players.map(player => (
                    <div key={player.id} className="player-row">
                        <span className="player-num">{player.number}</span>
                        <span className="player-fouls">{player.fouls}</span>
                        <button
                            className="btn-foul-add"
                            onClick={() => incrementFoul(player.id)}
                        >
                            +1
                        </button>
                    </div>
                ))}
            </div>

            {isAdding ? (
                <form onSubmit={handleAddConfirm} className="add-row-form">
                    <input
                        type="text"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        placeholder="#"
                        autoFocus
                        className="input-small"
                        maxLength={3}
                    />
                    <button type="submit" className="btn-confirm">OK</button>
                </form>
            ) : (
                <button className="btn-add-row" onClick={() => setIsAdding(true)}>
                    + ADD PLAYER
                </button>
            )}

            <style>{`
        .foul-table-container {
          margin-top: 2rem;
          width: 100%;
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          padding: 1rem;
          border: 1px solid var(--theme-border);
        }
        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          text-align: center;
          font-weight: 700;
          opacity: 0.7;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .players-list {
          max-height: 200px;
          overflow-y: auto;
        }
        .player-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          text-align: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-family: var(--font-display);
        }
        .player-num {
          font-weight: 700;
        }
        .player-fouls {
          color: var(--theme-primary);
          text-shadow: 0 0 5px var(--theme-primary);
          font-size: 1.2rem;
        }
        .btn-foul-add {
          background: transparent;
          border: 1px solid var(--theme-border);
          color: var(--theme-primary);
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 0.8rem;
        }
        .btn-foul-add:hover {
          background: var(--theme-primary);
          color: black;
        }
        .btn-add-row {
          width: 100%;
          margin-top: 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px dashed var(--theme-border);
          color: rgba(255,255,255,0.7);
          padding: 0.5rem;
          border-radius: 6px;
        }
        .btn-add-row:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .add-row-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .input-small {
          width: 60px;
          text-align: center;
        }
        .btn-confirm {
          flex: 1;
          background: var(--theme-primary);
          color: black;
          border-radius: 6px;
          font-weight: 700;
        }
      `}</style>
        </div>
    );
};

export default FoulTable;
