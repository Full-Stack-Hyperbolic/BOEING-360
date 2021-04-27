import axios from 'axios';
// __dirname
const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getPois = () => API.get('/get-pois');
