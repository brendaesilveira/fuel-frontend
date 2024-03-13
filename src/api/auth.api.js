import axios from 'axios';
const baseURL = `${import.meta.env.VITE_RESTAURANTS_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  });
};

export const setup = user => {
  return axios.post(`${baseURL}/setup`, user);
};