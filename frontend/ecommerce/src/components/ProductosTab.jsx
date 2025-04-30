

function ProductosTab({ products }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium">Listado de Productos</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Añadir Producto
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio_compra</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio_venta</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products && products.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4 whitespace-nowrap">{producto.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{producto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{producto.categoria.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">${producto.precio_compra}</td>
              <td className="px-6 py-4 whitespace-nowrap">${producto.precio_venta}</td>
              <td className="px-6 py-4 whitespace-nowrap">{producto.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                <button className="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosTab;