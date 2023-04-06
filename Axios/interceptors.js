import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://test-api.chargeonsite.com',
});
let ACCESS_TOKEN = '';
export const getAccessToken = (token) => {
  ACCESS_TOKEN = token;
};
axiosInstance.interceptors.request.use((config) => {
  if (config.method === 'post' && config.url === '/user/login/admin') {
    // config.headers['X-Custom-Header'] = 'Hello';
    config.data = {
      email: 'jo@email.com',
      password: '2&57DyhUTH1c',
      type:'email'
    };
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
