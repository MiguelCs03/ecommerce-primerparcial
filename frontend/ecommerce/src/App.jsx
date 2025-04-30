import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Eliminar import del AuthProvider
// import { AuthProvider } from './context/AuthContext'; 
import Login from './pages/Login';
import Register from './pages/register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
// Ya no es necesario importar useEffect si ya tienes inicialización automática en el store

function App() {
  // No es necesario inicializar aquí si ya tienes la inicialización automática en el store
  // Si aún prefieres mantener el control de la inicialización aquí, puedes dejarlo
  
  return (
    // Eliminar AuthProvider
    <Router>
  <div>
    <Navbar />
  </div>

  <div className="pt-16"> {/* Añade espacio arriba para que no se tape el contenido */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
</Router>

  );
}

export default App;