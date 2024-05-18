import React, { useState } from 'react';
import { register, login } from '../api';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (type === 'register') {
        response = await register({ email, password });
      } else {
        response = await login({ email, password });
      }
      setMessage(response.message); // Handle the success message
    } catch (error) {
      setMessage(error.message || 'An error occurred'); // Handle the error message
    }
  };

  return (
    <div>
      <h2>{type === 'register' ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthForm;
