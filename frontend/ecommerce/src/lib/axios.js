import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000" // Asegúrate que Django sirve en este puerto
      : "/api",
  withCredentials: true, // para JWT con cookies, o sesiones
});

export default axiosInstance;
