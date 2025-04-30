import { useState } from 'react';
import { useCategoryStore } from '../stores/useCategoryStore'; // Asegúrate que el path sea correcto

function AdministracionCategoriaTab({ categorias }) {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const { createCategory } = useCategoryStore();

  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    if (nombreCategoria.trim() === '') return;
    console.log('Crear categoría:', nombreCategoria);
    await createCategory(nombreCategoria);
    setNombreCategoria('');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium">Administración de Categorías</h3>
        <form onSubmit={handleCrearCategoria} className="flex gap-2">
          <input
            type="text"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            placeholder="Nueva categoría"
            className="border rounded px-3 py-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </form>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categorias && categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className="px-6 py-4 whitespace-nowrap">{categoria.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{categoria.nombre}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                <button className="text-red-600 hover:text-red-900">Eliminar</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministracionCategoriaTab;
