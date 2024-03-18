// settings.api.js

import axios from 'axios';

const baseURL = `${import.meta.env.VITE_RESTAURANTS_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }

    return config
  })
}

setAuthorizationHeaders();

export const settings = async (requestData) => {
  try {
    const response = await axios.post(`${baseURL}/settings`, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = image => {
  return axios.post(`${baseURL}/settings/upload`, image);
}

export const deleteImage = image => {
  return axios.delete(`${baseURL}/settings/upload`);
}

export const updateLocation = updatedLocation => {
  return axios.put(`${baseURL}/settings/location`, updatedLocation);
}

export const updateName = updatedName => {
  return axios.put(`${baseURL}/settings/name`, updatedName);
}

export const updateEmail = updatedEmail => {
  return axios.put(`${baseURL}/settings/email`, updatedEmail);
}

export const updatePassword = updatedPassword => {
  return axios.put(`${baseURL}/settings/password`, updatedPassword);
}

export const deleteAccount = id => {
  return axios.delete(`${baseURL}/settings/delete/${id}`);
};

export const connectUsers = async (userCode, friendCode) => {
  try {
    const response = await axios.post(`${baseURL}/connect`, { userCode, friendCode });
    return response.data;
  } catch (error) {
    throw error;
  }
}
