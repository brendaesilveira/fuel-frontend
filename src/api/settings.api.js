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

setAuthorizationHeaders()

// add new profile picture
export const uploadImage = image => {
    return axios.post(`${baseURL}/settings/upload`, image)
  }

// delete profile picture
export const deleteImage = image => {
    return axios.delete(`${baseURL}/settings/upload`);
  }

// update user location
export const updateLocation = updatedLocation => {
    return axios.put(`${baseURL}/settings/location`, updatedLocation);
  }

// update user name
export const updateName = updatedName => {
    return axios.put(`${baseURL}/settings/name`, updatedName);
  }

// change user name
export const updateEmail = updatedEmail => {
    return axios.put(`${baseURL}/settings/email`, updatedEmail);
  }

// change password
export const updatePassword = updatedPassword => {
    return axios.put(`${baseURL}/settings/password`, updatedPassword);
  }

// delete account password
export const deleteAccount = id => {
    return axios.delete(`${baseURL}/settings/delete/${id}`);
};

