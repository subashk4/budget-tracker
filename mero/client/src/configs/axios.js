import axios from 'axios';

// dotenv.config({ path: path.join(__dirname, '.env') });

console.log(process.env.REACT_APP_DEV_URI);
const customAxios = axios.create({
  baseURL: process.env.REACT_APP_DEV_URI,
  timeout: 1000,
});

customAxios.interceptors.request.use((config) => {
  const accessTkn = localStorage.getItem('accessTkn') || '';
  if (accessTkn) config.headers.Authorization = `Bearer ${accessTkn}`;
  return config;
});

export default customAxios;
