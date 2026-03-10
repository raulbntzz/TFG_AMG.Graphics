import React, { useState, useEffect } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

interface EditingForm {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

const UserManagement: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingForm | null>(null);
  const [createFormData, setCreateFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'Usuario',
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:5047';

  // Fetch usuarios
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/usuarios`);
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data: Usuario[] = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Abrir modal de edición
  const handleEdit = (usuario: Usuario) => {
    setEditingUser({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
    });
    setShowEditModal(true);
  };

  // Guardar cambios de usuario
  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser.id,
          nombre: editingUser.nombre,
          apellido: editingUser.apellido,
          email: editingUser.email,
          rol: editingUser.rol,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar usuario');

      setShowEditModal(false);
      setSuccessMessage('Usuario actualizado correctamente');
      fetchUsuarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Crear nuevo usuario
  const handleCreateUser = async () => {
    try {
      const payload = {
        Nombre: createFormData.nombre,
        Apellido: createFormData.apellido,
        Email: createFormData.email,
        Password: createFormData.password,
        Rol: createFormData.rol,
      };
      console.log('Enviando usuario:', payload);
      
      const response = await fetch(`${API_URL}/api/usuarios/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al crear usuario');

      setShowCreateModal(false);
      setCreateFormData({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: 'Usuario',
      });
      setSuccessMessage('Usuario creado correctamente');
      fetchUsuarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar usuario');

      setSuccessMessage('Usuario eliminado correctamente');
      fetchUsuarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-slate-800">
      
      {/* Header del Dashboard */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-8 gap-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-sm"></i> Nuevo Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
            <p className="text-slate-500 font-medium">Cargando usuarios...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50">
            <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <i className="fa-solid fa-users text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No hay usuarios</h3>
            <p className="text-slate-500 mt-1 text-center max-w-sm">Aún no se han registrado usuarios en el sistema. Crea el primero para empezar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-900">
                            {usuario.nombre} {usuario.apellido}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {usuario.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        usuario.rol === 'admin'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {usuario.rol === 'admin' ? (
                          <><i className="fa-solid fa-shield-halved mr-1.5"></i> Admin</>
                        ) : (
                          <><i className="fa-regular fa-user mr-1.5"></i> Usuario</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 focus:outline-none"
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
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

      {/* Modal Reutilizable para Formulario (Se usa en Crear y Editar) */}
      {(showEditModal || showCreateModal) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
            {/* Header del Modal */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {showEditModal ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h2>
              <button 
                onClick={() => { setShowEditModal(false); setShowCreateModal(false); }}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-full p-2 transition-colors focus:outline-none"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                  <input
                    type="text"
                    value={showEditModal ? editingUser?.nombre : createFormData.nombre}
                    onChange={(e) => showEditModal 
                      ? setEditingUser(prev => prev ? { ...prev, nombre: e.target.value } : null)
                      : setCreateFormData({ ...createFormData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    placeholder="Ej. Juan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                  <input
                    type="text"
                    value={showEditModal ? editingUser?.apellido : createFormData.apellido}
                    onChange={(e) => showEditModal
                      ? setEditingUser(prev => prev ? { ...prev, apellido: e.target.value } : null)
                      : setCreateFormData({ ...createFormData, apellido: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    placeholder="Ej. Pérez"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    value={showEditModal ? editingUser?.email : createFormData.email}
                    onChange={(e) => showEditModal
                      ? setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)
                      : setCreateFormData({ ...createFormData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              {!showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input
                      type="password"
                      value={createFormData.password}
                      onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rol de Sistema</label>
                <select
                    value={showEditModal ? editingUser?.rol : createFormData.rol}
                    onChange={(e) => showEditModal
                        ? setEditingUser(prev => prev ? { ...prev, rol: e.target.value } : null)
                        : setCreateFormData({ ...createFormData, rol: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-colors text-sm cursor-pointer"
                    >
                    <option value="Usuario">Usuario</option>
                    <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <button
                onClick={() => { setShowEditModal(false); setShowCreateModal(false); }}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Cancelar
              </button>
              <button
                onClick={showEditModal ? handleSaveEdit : handleCreateUser}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {showEditModal ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;