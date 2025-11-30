import React from 'react';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div className="confirm-modal glass-panel" onClick={e => e.stopPropagation()}>
                <div className="confirm-message">{message}</div>
                <div className="confirm-actions">
                    <button className="confirm-btn cancel" onClick={onCancel}>CANCEL</button>
                    <button className="confirm-btn confirm" onClick={onConfirm}>CONFIRM</button>
                </div>
            </div>

            <style>{`
        .confirm-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 4000;
          backdrop-filter: blur(5px);
        }
        .confirm-modal {
          width: 400px;
          max-width: 90%;
          padding: 2rem;
          background: #111;
          border: 1px solid #333;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .confirm-message {
          font-family: var(--font-display);
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: white;
          line-height: 1.5;
        }
        .confirm-actions {
          display: flex;
          gap: 1rem;
          width: 100%;
          justify-content: center;
        }
        .confirm-btn {
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          font-family: var(--font-display);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex: 1;
        }
        .confirm-btn.cancel {
          background: transparent;
          border: 1px solid #555;
          color: #aaa;
        }
        .confirm-btn.cancel:hover {
          border-color: white;
          color: white;
        }
        .confirm-btn.confirm {
          background: white;
          border: 1px solid white;
          color: black;
        }
        .confirm-btn.confirm:hover {
          background: #ddd;
          border-color: #ddd;
        }
      `}</style>
        </div>
    );
};

export default ConfirmModal;
