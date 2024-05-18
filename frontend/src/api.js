import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network Error');
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network Error');
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network Error');
  }
};
