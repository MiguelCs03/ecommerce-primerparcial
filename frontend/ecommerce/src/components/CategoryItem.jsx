import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const getCategoryColors = (categoryName) => {
    const name = categoryName.toLowerCase();

    if (name.includes("electro") || name.includes("tecno"))
      return { bg: "bg-blue-600", accent: "bg-blue-300", text: "text-blue-700" };
    if (name.includes("hogar"))
      return { bg: "bg-green-600", accent: "bg-green-300", text: "text-green-700" };
    if (name.includes("ropa") || name.includes("moda"))
      return { bg: "bg-purple-600", accent: "bg-purple-300", text: "text-purple-700" };
    if (name.includes("comida") || name.includes("alimentos"))
      return { bg: "bg-orange-600", accent: "bg-orange-300", text: "text-orange-700" };
    if (name.includes("libro"))
      return { bg: "bg-cyan-600", accent: "bg-cyan-300", text: "text-cyan-700" };
    if (name.includes("regalo"))
      return { bg: "bg-pink-600", accent: "bg-pink-300", text: "text-pink-700" };
    if (name.includes("auto"))
      return { bg: "bg-red-600", accent: "bg-red-300", text: "text-red-700" };
    if (name.includes("comput"))
      return { bg: "bg-indigo-600", accent: "bg-indigo-300", text: "text-indigo-700" };

    return { bg: "bg-yellow-600", accent: "bg-yellow-300", text: "text-yellow-700" };
  };

  const getCategoryInitials = (categoryName) => {
    const words = categoryName.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return categoryName.substring(0, 2).toUpperCase();
  };

  const colors = getCategoryColors(category.nombre);
  const initials = getCategoryInitials(category.nombre);

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center">
      <Link to={`/category/${category.id}`} className="group flex flex-col items-center justify-center">
        <div className="relative mb-3 transition-transform duration-300 transform group-hover:scale-110">
          <div className={`w-16 h-16 ${colors.bg} rounded-lg shadow-md flex items-center justify-center relative`}>
            <div className={`absolute top-0 right-0 w-8 h-8 ${colors.accent} rounded-full -translate-x-2 -translate-y-3`}></div>
            <span className="text-white text-xl font-bold z-10">{initials}</span>
            <div className={`absolute bottom-0 left-0 w-6 h-6 ${colors.accent} rounded-tr-lg translate-x-1 translate-y-2`}></div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <p className={`font-medium text-sm transition-colors ${colors.text} group-hover:underline`}>
          {category.nombre}
        </p>
      </Link>
    </div>
  );
};

export default CategoryItem;
