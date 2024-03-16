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

export const getRestaurant = restaurants => {
  return axios.get(`${baseURL}/restaurants`, restaurants);
};

export const allRestaurants = (location, page) => {
  return axios.get(`${baseURL}/restaurants/${location}`, { params: { page } });
};