import React, { useState } from 'react';
import { useProductStore } from '../../stores/useProductStore';

function ProductosTab({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio_compra: '',
    precio_venta: '',
    descripcion: '',
    categoria_id: '',
    imagen_url: 'claudinari_placeholder',
    proveedor_id: '',
    stock: ''
  });
  const { addProduct } = useProductStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'precio_compra' || name === 'precio_venta' || name === 'stock' || name === 'categoria_id' || name === 'proveedor_id'
        ? Number(value)
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(newProduct);
      setShowModal(false);
      setNewProduct({
        nombre: '',
        precio_compra: '',
        precio_venta: '',
        descripcion: '',
        categoria_id: '',
        imagen_url: 'claudinari_placeholder',
        proveedor_id: '',
        stock: ''
      });
    } catch (error) {
      console.error("Error al añadir producto:", error);
      // Aquí podrías mostrar un mensaje de error
    }
  };

export default ProductosTab;