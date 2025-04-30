

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
 
    { id: 'productos', label: 'Productos' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'Administracion', label: 'Categorias' },
  
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-lg p-4">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button 
                className={`w-full text-left p-3 rounded-lg ${
                  activeTab === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;