import React, { useState, useEffect } from 'react';

interface Mensaje {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  asunto: string;
  descripcion: string;
  fechaEnvio: string;
}

const MensajeContactoManagement: React.FC = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMensaje, setSelectedMensaje] = useState<Mensaje | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:5047';

  // Fetch mensajes
  const fetchMensajes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/mensajescontacto`);
      if (!response.ok) throw new Error('Error al obtener mensajes');
      const data: Mensaje[] = await response.json();
      setMensajes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  // Eliminar mensaje
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) return;
    try {
      const response = await fetch(`${API_URL}/api/mensajescontacto/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar mensaje');

      setSuccessMessage('Mensaje eliminado correctamente');
      fetchMensajes();
      setSelectedMensaje(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      
      {/* Tabla de mensajes */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
            <p className="text-slate-500 font-medium">Cargando mensajes...</p>
          </div>
        ) : mensajes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50">
            <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <i className="fa-solid fa-envelope text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No hay mensajes</h3>
            <p className="text-slate-500 mt-1 text-center max-w-sm">Aún no has recibido ningún mensaje de contacto</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Asunto</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mensajes.map((mensaje) => (
                  <tr key={mensaje.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{mensaje.nombre} {mensaje.apellido}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{mensaje.correo}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-xs">{mensaje.asunto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatDate(mensaje.fechaEnvio)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedMensaje(mensaje)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 focus:outline-none"
                        title="Ver detalles"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(mensaje.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedMensaje && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100">
            
            {/* Header del Modal */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">Detalles del Mensaje</h2>
              <button 
                onClick={() => setSelectedMensaje(null)}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-full p-2 transition-colors focus:outline-none"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                  <p className="text-slate-900 font-semibold text-sm">{selectedMensaje.nombre}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                  <p className="text-slate-900 font-semibold text-sm">{selectedMensaje.apellido}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <a href={`mailto:${selectedMensaje.correo}`} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm break-all">{selectedMensaje.correo}</a>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
                  <a href={`tel:${selectedMensaje.telefono}`} className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm">{selectedMensaje.telefono}</a>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Asunto</label>
                <p className="text-slate-900 font-semibold text-sm">{selectedMensaje.asunto}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mensaje</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700 whitespace-pre-wrap text-sm max-h-40 overflow-y-auto">
                  {selectedMensaje.descripcion}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Fecha de envío</label>
                <p className="text-slate-600 text-sm">{formatDate(selectedMensaje.fechaEnvio)}</p>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedMensaje(null)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedMensaje.id);
                }}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <i className="fa-solid fa-trash-can"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MensajeContactoManagement;
