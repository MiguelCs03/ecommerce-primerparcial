import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { useCategoryStore } from '../stores/useCategoryStore';

function ProductosTab({ products }) {
  const [showForm, setShowForm] = useState(false);
  const { categories, loadCategories } = useCategoryStore();

  const [formData, setFormData] = useState({
    nombre: '',
    precio_compra: '',
    precio_venta: '',
    descripcion: '',
    categoria_id: '',
    proveedor_id: '',
    stock: '',
    imagen_url: '',
  });

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'tu_upload_preset'); // Reemplaza con tu upload preset
    data.append('cloud_name', 'tu_cloud_name');       // Reemplaza con tu cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      setFormData((prev) => ({
        ...prev,
        imagen_url: result.secure_url
      }));
      console.log('Imagen subida a Cloudinary:', result.secure_url);
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await ProductService.createProduct(formData);
      console.log('Producto creado:', newProduct);
      setShowForm(false);
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium">Listado de Productos</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Añadir Producto'}
        </button>
      </div>

      {showForm && (
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
          <input name="nombre" onChange={handleChange} value={formData.nombre} placeholder="Nombre" className="w-full border px-3 py-2 rounded" />
          <input name="precio_compra" type="number" onChange={handleChange} value={formData.precio_compra} placeholder="Precio Compra" className="w-full border px-3 py-2 rounded" />
          <input name="precio_venta" type="number" onChange={handleChange} value={formData.precio_venta} placeholder="Precio Venta" className="w-full border px-3 py-2 rounded" />
          <input name="descripcion" onChange={handleChange} value={formData.descripcion} placeholder="Descripción" className="w-full border px-3 py-2 rounded" />

          <select
            name="categoria_id"
            onChange={handleChange}
            value={formData.categoria_id}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Seleccione una categoría</option>
            {categories && categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <input name="proveedor_id" type="number" onChange={handleChange} value={formData.proveedor_id} placeholder="ID Proveedor" className="w-full border px-3 py-2 rounded" />
          <input name="stock" type="number" onChange={handleChange} value={formData.stock} placeholder="Stock" className="w-full border px-3 py-2 rounded" />

          {/* Nuevo input para imagen */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Mostrar la imagen subida si ya hay URL */}
          {formData.imagen_url && (
            <img src={formData.imagen_url} alt="Vista previa" className="h-32 object-contain" />
          )}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Crear Producto
          </button>
        </form>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Compra</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Venta</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products && products.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4">{producto.id}</td>
              <td className="px-6 py-4">{producto.nombre}</td>
              <td className="px-6 py-4">{producto.categoria.nombre}</td>
              <td className="px-6 py-4">${producto.precio_compra}</td>
              <td className="px-6 py-4">${producto.precio_venta}</td>
              <td className="px-6 py-4">{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosTab;
