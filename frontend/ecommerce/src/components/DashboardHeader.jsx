
function DashboardHeader({ userName }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Administrativo</h2>
      <p className="text-gray-600">Bienvenido, {userName}!</p>
    </div>
  );
}

export default DashboardHeader;