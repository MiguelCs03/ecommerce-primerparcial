import axios from 'axios';

// Base URL for API requests
const API_URL = 'http://localhost:8000';  // Change this to your actual backend URL

class ProductService {
  /**
   * Get all products
   * @returns {Promise} Promise with products data
   */
  static async getAllProducts() {
    try {
      const response = await axios.get(`${API_URL}/productos/listarCrear/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get a specific product by ID
   * @param {number} id - Product ID
   * @returns {Promise} Promise with product data
   */
  static async getProductById(id) {
    try {
      const response = await axios.get(`${API_URL}/productos/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise} Promise with created product data
   */
  static async createProduct(productData) {
    try {
      const response = await axios.post(`${API_URL}/productos/`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update an existing product
   * @param {number} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise} Promise with updated product data
   */
  static async updateProduct(id, productData) {
    try {
      const response = await axios.put(`${API_URL}/productos/${id}/`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a product
   * @param {number} id - Product ID
   * @returns {Promise} Promise with response status
   */
  static async deleteProduct(id) {
    try {
      await axios.delete(`${API_URL}/productos/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get products by category
   * @param {string|number} categoryValue - Category ID or name
   * @returns {Promise} Promise with products data
   */
  static async getProductsByCategory(categoryValue) {
    try {
      const response = await axios.get(`${API_URL}/productos/porCategoria/${categoryValue}/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryValue}:`, error);
      throw error;
    }
  }
}

export default ProductService;