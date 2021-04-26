import axios from 'axios';
// __dirname
const API = axios.create({ baseURL: __dirname });

export const getPois = () => API.get('/get-pois');
