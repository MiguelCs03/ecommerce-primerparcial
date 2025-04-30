

function PedidosTab() {
  // Estos datos podrían venir de un store o props
  const pedidos = [
    {
      id: '1287',
      cliente: 'María López',
      productos: 'Smartphone XR-7 (1), Cargador Rápido (1)',
      total: 899.99,
      estado: 'Procesando'
    }
    // Aquí se agregarían más pedidos
  ];

  const getEstadoClassName = (estado) => {
    const clases = {
      'Procesando': 'bg-yellow-100 text-yellow-800',
      'Enviado': 'bg-blue-100 text-blue-800',
      'Completado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return clases[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td className="px-6 py-4 whitespace-nowrap">#{pedido.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pedido.cliente}</td>
              <td className="px-6 py-4">{pedido.productos}</td>
              <td className="px-6 py-4 whitespace-nowrap">${pedido.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoClassName(pedido.estado)}`}>
                  {pedido.estado}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">Ver</button>
                <button className="text-green-600 hover:text-green-900">Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PedidosTab;