import axios from 'axios';

export const baseURL = `${import.meta.env.VITE_RESTAURANTS_API}/api`;

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

export const discardRestaurant = restaurant => {
  return axios.post(`${baseURL}/discards`, restaurant);
};

export const addFavorite = favourite => {
  return axios.post(`${baseURL}/favourites`, favourite);
};

export const getFavorites = (userCode) => {
  return axios.get(`${baseURL}/favourites?userCode=${userCode}`);
};

export const addBeen = been => {
  return axios.post(`${baseURL}/been`, been);
};

export const handleLike = likes => {
  return axios.post(`${baseURL}/likes`, likes);
};

export const getLikes = (userCode) => {
  return axios.get(`${baseURL}/likes?userCode=${userCode}`);
};

export const getMatches = (userCode, friendCode) => {
  return axios.get(`${baseURL}/match?userCode=${userCode}&friendCode=${friendCode}`);
};


