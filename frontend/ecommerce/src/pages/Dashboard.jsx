import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

function Dashboard() {
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('resumen');

  // Datos simulados para el dashboard
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

  const renderContenidoTab = () => {
    switch (activeTab) {
      case 'resumen':
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
      
      case 'pedidos':
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
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">#1287</td>
                  <td className="px-6 py-4 whitespace-nowrap">María López</td>
                  <td className="px-6 py-4">Smartphone XR-7 (1), Cargador Rápido (1)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$899.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Procesando</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Ver</button>
                    <button className="text-green-600 hover:text-green-900">Actualizar</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">#1286</td>
                  <td className="px-6 py-4 whitespace-nowrap">Juan Pérez</td>
                  <td className="px-6 py-4">Auriculares Pro (1)</td>
                  <td className="px-6 py-4 whitespace-nowrap">$149.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completado</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Ver</button>
                    <button className="text-green-600 hover:text-green-900">Actualizar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      
      case 'productos':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Listado de Productos</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Añadir Producto</button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">P001</td>
                  <td className="px-6 py-4 whitespace-nowrap">Smartphone XR-7</td>
                  <td className="px-6 py-4 whitespace-nowrap">Electrónica</td>
                  <td className="px-6 py-4 whitespace-nowrap">$799.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">24</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">P002</td>
                  <td className="px-6 py-4 whitespace-nowrap">Auriculares Pro</td>
                  <td className="px-6 py-4 whitespace-nowrap">Audio</td>
                  <td className="px-6 py-4 whitespace-nowrap">$149.99</td>
                  <td className="px-6 py-4 whitespace-nowrap">42</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      
      case 'clientes':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Clientes Registrados</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedidos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">C001</td>
                  <td className="px-6 py-4 whitespace-nowrap">María López</td>
                  <td className="px-6 py-4 whitespace-nowrap">maria@ejemplo.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">12/03/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Ver Detalles</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">C002</td>
                  <td className="px-6 py-4 whitespace-nowrap">Juan Pérez</td>
                  <td className="px-6 py-4 whitespace-nowrap">juan@ejemplo.com</td>
                  <td className="px-6 py-4 whitespace-nowrap">15/03/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Ver Detalles</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
        
      default:
        return <div>Selecciona una sección para ver su contenido</div>;
    }
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h2>
          <p className="text-gray-600">Bienvenido, {currentUser?.nombre || 'Administrador'}!</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Menú lateral */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-4">
            <nav>
              <ul>
                <li className="mb-2">
                  <button 
                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'resumen' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('resumen')}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'pedidos' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('pedidos')}
                  >
                    Pedidos
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'productos' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('productos')}
                  >
                    Productos
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'clientes' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('clientes')}
                  >
                    Clientes
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    className={`w-full text-left p-3 rounded-lg ${activeTab === 'configuracion' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('configuracion')}
                  >
                    Configuración
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {activeTab === 'resumen' && 'Resumen General'}
                {activeTab === 'pedidos' && 'Gestión de Pedidos'}
                {activeTab === 'productos' && 'Inventario de Productos'}
                {activeTab === 'clientes' && 'Base de Clientes'}
                {activeTab === 'configuracion' && 'Configuración de la Tienda'}
              </h3>
              
              {renderContenidoTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;