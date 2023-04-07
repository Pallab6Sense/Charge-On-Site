import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://test-api.chargeonsite.com',
});

let ACCESS_TOKEN = '';
export const getAccessToken = (token) => {
  ACCESS_TOKEN = token;
};

let REFRESH_TOKEN ='';

export const getRefreshToken = (token) => {
  REFRESH_TOKEN = token;
};

let CREDENTIALS;

export const getCredentials = (credentialsFromLogin) => {
  CREDENTIALS = credentialsFromLogin;
};
axiosInstance.interceptors.request.use((config) => {
  if (config.method === 'post' && config.url === '/user/login/admin') {
    config.data = CREDENTIALS;
    return config;
  }
  if (config.method === 'get' && config.url === '/user/me') {
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  }
});
export default axiosInstance;
