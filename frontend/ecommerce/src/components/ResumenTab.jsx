

function ResumenTab() {
  // Estos datos podrían venir de un store de estado o props
  const estadisticas = {
    ventas: {
      hoy: 2450,
      semana: 14320,
      mes: 42800
    },
    pedidos: {
      nuevos: 12,
      procesando: 8,
      enviados: 24,
      completados: 96
    },
    productos: {
      total: 158,
      sinStock: 7,
      masVendidos: ['Smartphone XR-7', 'Auriculares Pro', 'Smartwatch V3']
    },
    clientes: {
      total: 532,
      nuevosHoy: 5
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-700">Ventas Hoy</h3>
        <p className="text-2xl font-bold">${estadisticas.ventas.hoy}</p>
        <p className="text-sm text-green-600">+12% respecto a ayer</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-700">Pedidos Nuevos</h3>
        <p className="text-2xl font-bold">{estadisticas.pedidos.nuevos}</p>
        <p className="text-sm text-blue-600">Requieren atención</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-700">Productos sin Stock</h3>
        <p className="text-2xl font-bold">{estadisticas.productos.sinStock}</p>
        <p className="text-sm text-red-600">Necesitan reposición</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-700">Clientes Nuevos</h3>
        <p className="text-2xl font-bold">{estadisticas.clientes.nuevosHoy}</p>
        <p className="text-sm text-green-600">Registrados hoy</p>
      </div>
    </div>
  );
}

export default ResumenTab;