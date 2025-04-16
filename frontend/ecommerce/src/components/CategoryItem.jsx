import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react"; // O cualquier ícono genérico que te guste

const CategoryItem = ({ category }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={`/category/${category.id}`} className="text-center">
        <div className="relative mb-2 group">
          {/* Círculo exterior amarillo */}
          <div className="w-20 h-20 rounded-full bg-yellow-300 flex items-center justify-center">
            {/* Círculo interior blanco */}
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              {/* Ícono fijo */}
              <Smartphone className="w-8 h-8 text-blue-700" />
            </div>
          </div>

          {/* Indicador de hover */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Nombre de la categoría */}
        <p className="text-blue-800 text-sm font-medium">{category.nombre}</p>
      </Link>
    </div>
  );
};

export default CategoryItem;