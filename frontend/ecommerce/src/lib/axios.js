import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000" // Asegúrate que Django sirve en este puerto
      : "/api",
  headers: {
        'Content-Type': 'application/json'
  },
  withCredentials: true, // para JWT con cookies, o sesiones


});


// Interceptor para añadir el token a las solicitudes autenticadas
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
