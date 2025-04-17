import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  // Redirigir a login si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Renderizar los componentes hijos si el usuario está autenticado
  return children;
}

export default ProtectedRoute;