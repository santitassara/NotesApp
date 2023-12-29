
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import './LoginComponent.css';



const LoginComponent = () => {
  const { login, fetchProtectedData, isAuthenticated } = useNoteContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
       await login(username, password);

      await fetchProtectedData();
      
      navigate('/Home');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };


  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <div className="input-container">
        <label className="label">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div className="input-container">
        <label className="label">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};


export default LoginComponent;
