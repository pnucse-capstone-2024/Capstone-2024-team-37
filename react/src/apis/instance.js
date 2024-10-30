import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 6000,
  withCredentials: true, // logout을 위해
});

export default instance;
