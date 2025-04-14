import { Link } from "react-router-dom";
import { Smartphone, Home, Umbrella, Wrench } from "lucide-react"; // Reemplazamos Tools por Wrench

const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase();

  if (name.includes("tecnología") || name.includes("tecnologia") || name.includes("tech")) {
    return <Smartphone className="w-8 h-8 text-blue-700" />;
  } else if (name.includes("hogar") || name.includes("casa") || name.includes("home")) {
    return <Home className="w-8 h-8 text-blue-700" />;
  } else if (name.includes("exterior") || name.includes("jardín") || name.includes("jardin")) {
    return <Umbrella className="w-8 h-8 text-blue-700" />;
  } else if (name.includes("herramienta") || name.includes("tool")) {
    return <Wrench className="w-8 h-8 text-blue-700" />;
  }

  return <Smartphone className="w-8 h-8 text-blue-700" />;
};

const CategoryItem = ({ category }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={`/category${category.href}`} className="text-center">
        <div className="relative mb-2 group">
          {/* Círculo exterior amarillo */}
          <div className="w-20 h-20 rounded-full bg-yellow-300 flex items-center justify-center">
            {/* Círculo interior blanco */}
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              {/* Ícono de la categoría */}
              {getCategoryIcon(category.name)}
            </div>
          </div>

          {/* Indicador de hover (punto gris) */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Nombre de la categoría */}
        <p className="text-blue-800 text-sm font-medium">{category.name}</p>
      </Link>
    </div>
  );
};

export default CategoryItem;
