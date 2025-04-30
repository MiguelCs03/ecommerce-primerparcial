// src/store/authStore.js
import { create } from 'zustand';
import authService from '../services/authService';

export const useAuthStore = create((set, get) => ({
  // Estado inicial
  currentUser: null,
  isAuthenticated: false,
  isLoading: true, // Inicialmente true para indicar carga
  error: null,
  
  // Inicializar el estado desde localStorage al cargar la aplicación
  initialize: () => {
    set({ isLoading: true });
    const user = authService.getCurrentUser();
    console.log("User:", user);
    if (user) {
      authService.setAuthToken(user.access);
      set({ currentUser: user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
  
  // Registrar un nuevo usuario
  register: async (nombre, correo, contraseña) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register(nombre, correo, contraseña);
      authService.setAuthToken(data.access);
      set({ 
        currentUser: data, 
        isAuthenticated: true,
        isLoading: false
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Error al registrar usuario',
        isLoading: false
      });
      return { 
        success: false, 
        message: error.response?.data?.error || 'Error al registrar usuario'
      };
    }
  },
  
  // Iniciar sesión
  login: async (correo, contraseña) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.login(correo, contraseña);
      authService.setAuthToken(data.access);
      set({ 
        currentUser: data, 
        isAuthenticated: true,
        isLoading: false
      });
      return { success: true };
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Credenciales inválidas',
        isLoading: false
      });
      return { 
        success: false, 
        message: error.response?.data?.error || 'Credenciales inválidas'
      };
    }
  },
  
  // Cerrar sesión
  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      authService.setAuthToken(null);
      set({ 
        currentUser: null, 
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.error('Error al cerrar sesión:', error);
      return { success: false };
    }
  },

  // Actualizar el token de acceso
  updateToken: (accessToken) => {
    const user = get().currentUser;
    if (user) {
      const updatedUser = { ...user, access: accessToken };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      authService.setAuthToken(accessToken);
      set({ currentUser: updatedUser });
    }
  },

  // Verificar si el token ha expirado
  checkTokenValidity: () => {
    const user = get().currentUser;
    if (!user || !user.access) {
      return false;
    }
    
    // Implementación básica de verificación de token
    // En una aplicación real, deberías decodificar el JWT y verificar su fecha de expiración
    // o tener un endpoint en el backend para validar el token
    return true;
  }
}));

// Inicialización automática del store
const initializeAuth = () => {
  useAuthStore.getState().initialize();
};

// Ejecutar la inicialización al importar el módulo
initializeAuth();

// Exportar un hook personalizado para usar en componentes que necesitan esperar la carga
export const useAuthStoreWithLoading = () => {
  const { isLoading, ...rest } = useAuthStore();
  return { isLoading, ...rest };
};