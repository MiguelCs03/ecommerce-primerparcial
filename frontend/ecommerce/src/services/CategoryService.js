// src/services/categoriaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/productos/categorias/'; // Ajusta esta ruta si es necesario

const CategoryService = {
  // Obtener todas las categorías
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener categoría con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva categoría
  create: async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error.response?.data || error.message);
      throw error;
    }
  },

  // Actualizar una categoría existente
  update: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar categoría con ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Eliminar una categoría
  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error);
      throw error;
    }
  }
};

export default CategoryService;
