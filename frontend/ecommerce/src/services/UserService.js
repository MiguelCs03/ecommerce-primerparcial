// src/services/UsuarioService.js
import axios from "axios";

const API_URL = "http://localhost:8000/usuarios/"; // Ajusta la URL a tu endpoint real

class UserService {
  /**
   * Obtener usuarios filtrados por tipo (admin o noadmin)
   * @param {string} tipo 'admin' o 'noadmin'
   * @returns {Promise} Lista de usuarios
   */
  static async getUsuarios(tipo) {
    try {
      const response = await axios.get(`${API_URL}usuarios/`, {
        params: { tipo },
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw error;
    }
  }

  /**
   * Actualizar un usuario
   * @param {number} id ID del usuario
   * @param {object} data Datos a actualizar
   * @returns {Promise} Usuario actualizado
   */
  static async actualizarUsuario(id, data) {
    try {
      const body = { id, ...data };
      const response = await axios.put(`${API_URL}usuarios/`, body);
      return response.data;
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      throw error;
    }
  }

  /**
   * Eliminar un usuario
   * @param {number} id ID del usuario
   * @returns {Promise} Mensaje de confirmación
   */
  static async eliminarUsuario(id) {
    try {
      const body = { id };
      const response = await axios.delete(`${API_URL}usuarios/`, { data: body });
      return response.data;
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      throw error;
    }
  }
}

export default UserService;
