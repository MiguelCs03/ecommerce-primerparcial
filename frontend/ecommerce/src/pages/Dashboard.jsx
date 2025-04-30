import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useProductStore } from "../stores/useProductStore";
import { useUsuarioStore } from '../stores/useUsuarioStore';
import { useCategoryStore } from '../stores/useCategoryStore';
// Componentes
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import ResumenTab from '../components/ResumenTab';
import ProductosTab from '../components/ProductosTab';
import ClientesTab from '../components/ClientesTab';
import AdministracionCategoriaTab from '../components/AdministracionCategoriaTab';

function Dashboard() {
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('resumen');
  const { products, fetchAllProducts } = useProductStore();
  const { fetchUsuariosA, fetchUsuariosB, usuariosA } = useUsuarioStore();
  const { categories, loadCategories } = useCategoryStore();

  useEffect(() => {
    fetchAllProducts();
    fetchUsuariosA();
    loadCategories();
  }, [fetchAllProducts, fetchUsuariosA, fetchUsuariosB, loadCategories]);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'resumen': return 'Resumen General';
      case 'productos': return 'Inventario de Productos';
      case 'clientes': return 'Base de Clientes';
      case 'Administracion': return 'Base de Clientes';
      default: return 'Selecciona una sección';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'resumen':
        return <ResumenTab />;
      case 'productos':
        return <ProductosTab products={products} />;
      case 'clientes':
        return <ClientesTab usuarios={usuariosA} />;
      case 'Administracion':
        return <AdministracionCategoriaTab categorias={categories} />;
      default:
        return <div>Selecciona una sección para ver su contenido</div>;
    }
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader userName={currentUser?.nombre || 'Administrador'} />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Menú lateral */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{getTabTitle()}</h3>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
