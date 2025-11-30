import React, { useState } from 'react';

const AuthModal = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const url = endpoint;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>{isLogin ? 'LOGIN' : 'REGISTER'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'LOADING...' : (isLogin ? 'LOGIN' : 'REGISTER')}
          </button>
        </form>

        <div className="toggle-mode">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </div>
      </div>

      <style>{`
        .auth-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
          backdrop-filter: blur(5px);
        }
        .auth-modal {
          width: 400px;
          padding: 2rem;
          background: #111;
          border: 1px solid #333;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .auth-modal h2 {
          font-family: var(--font-display);
          margin: 0;
          text-align: center;
          letter-spacing: 2px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .form-group label {
          font-size: 0.8rem;
          opacity: 0.7;
          letter-spacing: 1px;
        }
        .form-group input {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.8rem;
          color: white;
          border-radius: 4px;
          font-family: var(--font-body);
        }
        .form-group input:focus {
          outline: none;
          border-color: white;
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: white;
          color: black;
          border: none;
          font-family: var(--font-display);
          font-weight: bold;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.2s;
        }
        .btn-submit:hover {
          background: #ddd;
        }
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .error-msg {
          color: #ff6666;
          font-size: 0.9rem;
          text-align: center;
          background: rgba(255,0,0,0.1);
          padding: 0.5rem;
          border-radius: 4px;
        }
        .toggle-mode {
          text-align: center;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .toggle-mode span {
          color: var(--ice-primary);
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
