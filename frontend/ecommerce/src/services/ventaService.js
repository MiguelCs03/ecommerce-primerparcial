// src/services/categoriaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/ventas/'; // Ajusta esta ruta si es necesario

const CategoryService = {
  // Obtener todas las categorías
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/ventas/`);
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
  createVenta: async (data) => {
    console.log("venta",data);
    try {

      const fechaActual = new Date().toISOString().split("T")[0];
      console.log(fechaActual);
      const response = await axios.post(`${API_URL}ventas/`, {
        orden: data.orden,
        total: data.total,
    
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear categoría:', error.response?.data || error.message);
      throw error;
    }
  },
  createOrder: async (data) => {
    console.log("order",data);
    try {
      const response = await axios.post(`${API_URL}ordenes/`, {
        usuario: data.usuario,
        estado: data.estado || 'Pendiente',  // puedes forzarlo si deseas
        items: data.items  // [{ producto: 1, cantidad: 2 }, ...]
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear orden:', error.response?.data || error.message);
      throw error;
    }
  },

  destacados: async (id) => {
    try {
      const response = await axios.get(`${API_URL}recomendaciones/usuario/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener destacados:', error);
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
