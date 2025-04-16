// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/usuarios/';

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el error es 401 Unauthorized, podríamos intentar refrescar el token
    // (implementación básica, ajusta según tus necesidades)
    if (error.response && error.response.status === 401) {
      // Aquí podrías implementar la lógica para refrescar el token
      // Por ahora, solo redirigimos al usuario a la página de login
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  register: async (nombre, correo, contraseña) => {
    try {
      const response = await axios.post(API_URL + 'register/', {
        nombre,
        correo,
        contraseña
      });
      
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message);
      throw error;
    }
  },
  
  login: async (correo, contraseña) => {
    try {
      const response = await axios.post(API_URL + 'login/', {
        correo,
        contraseña
      });
      
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.access) {
        const config = {
          headers: {
            'Authorization': `Bearer ${user.access}`
          }
        };
        await axios.post(API_URL + 'logout/', {}, config);
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('user');
    }
  },
  
  refreshToken: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.refresh) {
        throw new Error('No refresh token available');
      }
      
      const response = await axios.post(API_URL + 'token/refresh/', {
        refresh: user.refresh
      });
      
      if (response.data.access) {
        const updatedUser = { ...user, access: response.data.access };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return response.data.access;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
};

export default authService;