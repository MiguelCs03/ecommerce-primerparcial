

function AdministracionTab({ usuarios }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Usuarios Administrativos</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios && usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-6 py-4 whitespace-nowrap">{usuario.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usuario.correo}</td>
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

export default AdministracionTab;