import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        navigate('/track-journey');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      const response = await login({ email: 'demouser@example.com', password: 'demopassword' });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        navigate('/track-journey');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleDemoLogin}>Login as Demo User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
