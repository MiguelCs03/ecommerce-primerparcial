

function ConfiguracionTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Configuración de la Tienda</h3>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Mi Tienda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contacto
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="contacto@mitienda.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Calle Principal #123"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Descripción de la tienda..."
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Opciones de Envío</h3>
        {/* Aquí irían las opciones de envío */}
        <p className="text-gray-600">
          Configura las opciones de envío disponibles para tus clientes.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Métodos de Pago</h3>
        {/* Aquí irían los métodos de pago */}
        <p className="text-gray-600">
          Configura los métodos de pago que aceptará tu tienda.
        </p>
      </div>
    </div>
  );
}

export default ConfiguracionTab;