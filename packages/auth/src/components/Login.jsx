import React, { useState } from 'react';
import { useSharedState } from '../store/useSharedState';
import './Login.css';

const Login = () => {
  const [, setSharedState] = useSharedState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setSharedState({ isAuthenticated: true });
    } else {
      alert('Invalid username or password. Try admin / password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign In</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
