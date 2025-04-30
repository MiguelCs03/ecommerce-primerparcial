// src/stores/useUsuarioStore.js
import { create } from 'zustand';
import UserService from '../services/UserService';
import { toast } from 'react-hot-toast';

export const useUsuarioStore = create((set) => ({
  usuariosA: [],
  usuariosB: [],
  loading: false,

  // Obtener usuarios
  fetchUsuariosA: async () => {
    set({ loading: true });
    try {
      const usuarios = await UserService.getUsuarios("admin");
      console.log("Usuarios obtenidos:", usuarios);
      set({ usuariosA: usuarios });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      toast.error("Error al obtener usuarios");
    } finally {
      set({ loading: false });
    }
  },

  fetchUsuariosB: async () => {
    set({ loading: true });
    try {
      const usuarios = await UserService.getUsuarios("noadmin");
      set({ usuariosB: usuarios });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      toast.error("Error al obtener usuarios");
    } finally {
      set({ loading: false });
    }
  },

  // Actualizar usuario
  actualizarUsuario: async (id, data) => {
    try {
      const updatedUser = await UserService.actualizarUsuario(id, data);
      set((state) => ({
        usuarios: state.usuarios.map((user) =>
          user.id === id ? updatedUser : user
        ),
      }));
      toast.success("Usuario actualizado");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      toast.error("Error al actualizar usuario");
      throw error;
    }
  },

  // Eliminar usuario
  eliminarUsuario: async (id) => {
    try {
      await UserService.eliminarUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.filter((user) => user.id !== id),
      }));
      toast.success("Usuario eliminado");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      toast.error("Error al eliminar usuario");
      throw error;
    }
  },
}));


