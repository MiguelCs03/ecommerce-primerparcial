
import axios from 'axios';

const API_URL = 'http://localhost:8000/ordenes/'; // Ajusta si es necesario

class OrdenService {
  // Obtener todas las órdenes
  async fetchOrdenes() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  // Crear una nueva orden
  async createOrden(ordenData) {
    const response = await axios.post(API_URL, ordenData);
    return response.data;
  }

  // Eliminar una orden por ID
  async deleteOrden(ordenId) {
    const response = await axios.delete(`${API_URL}${ordenId}/`);
    return response.data;
  }
}

export default new OrdenService();