// src/store/authStore.js
import { create } from 'zustand'
import CategoryService from '../services/CategoryService';


export const useCategoryStore = create((set, get) => ({
  // Estado inicial
  categories: [],
  loadingCategories: true, // Inicialmente true para indicar carga
  error: null,
  currentCategory: null,

  setProducts: (categories) => set({ categories}),
  // Inicializar el estado desde localStorage al cargar la aplicación
  createCategory: async (nombre) => {
    set({ loading: true });
    try {
      console.log(nombre);
      const newCategory = await CategoryService.create(nombre);
      
      set((prevState) => ({
        categories: [...prevState.categories, newCategory],
        loading: false,
      }));
    } catch (error) {
      console.error(error.response?.data?.error || "Error al crear categoría");
      set({ loading: false });
    }
  },
  
  // Registrar un nuevo usuario
  loadCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await CategoryService.getAll(); // obtiene todas las categorías
      console.log(data);
      set({
        categories: data, // actualiza todo el array con las categorías obtenidas
        loading: false,
      });
  
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Error al cargar categorías',
        loading: false,
      });
  
      return {
        success: false,
        message: error.response?.data?.error || 'Error al cargar categorías',
      };
    }
  },

   // Cargar una categoría específica por ID
   fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const category = await CategoryService.getById(id);
      set({ currentCategory: category, loading: false });
    } catch (error) {
      set({ 
        error: 'Error al obtener la categoría' + error,
        loading: false 
      });
      console.error('No se pudo cargar la categoría');
    }
  },

  // Limpiar categoría actual
  clearCurrentCategory: () => set({ currentCategory: null }),

  // Actualizar una categoría
  updateCategory: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updatedCategory = await CategoryService.update(id, data);

      // Actualiza en el array si ya estaban listadas
      const { categories } = get();
      const updatedCategories = categories.map(cat =>
        cat.id === id ? updatedCategory : cat
      );

      set({
        categories: updatedCategories,
        currentCategory: updatedCategory,
        loading: false,
      });

      console.success('Categoría actualizada correctamente');
    } catch (error) {
      set({ loading: false });
      console.error('Error al actualizar la categoría' + error);
    }
  },

  // Eliminar una categoría
  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await CategoryService.delete(id);

      const { categories } = get();
      const updatedCategories = categories.filter(cat => cat.id !== id);

      set({
        categories: updatedCategories,
        currentCategory: null,
        loading: false,
      });

      console.success('Categoría eliminada correctamente');
    } catch (error) {
      set({ loading: false });
      console.error('Error al eliminar la categoría' + error);
    }
  },



  
}));

// Inicialización automática del stor