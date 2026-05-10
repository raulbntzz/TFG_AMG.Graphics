import React, { useState, useEffect } from 'react';

const BLUE = 'var(--accent)';
const CREAM = 'var(--bg)';
const BLACK = 'var(--text)';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.9rem',
  background: 'var(--input-bg)',
  border: `1px solid var(--border-subtle)`,
  borderRadius: 0,
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.95rem',
  color: BLACK,
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: BLACK,
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const btnPrimary: React.CSSProperties = {
  background: 'var(--btn-bg)',
  color: CREAM,
  border: 'none',
  padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
  letterSpacing: '0.03em',
};

const btnSecondary: React.CSSProperties = {
  background: 'transparent',
  color: BLACK,
  border: `1px solid var(--border)`,
  padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 400,
  cursor: 'pointer',
};

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
  const [createFormData, setCreateFormData] = useState({ nombre: '', apellido: '', email: '', password: '', rol: 'Usuario' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:5047';

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

  useEffect(() => { fetchUsuarios(); }, []);

  const handleEdit = (usuario: Usuario) => {
    setEditingUser({ id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, rol: usuario.rol });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingUser.id, nombre: editingUser.nombre, apellido: editingUser.apellido, email: editingUser.email, rol: editingUser.rol }),
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

  const handleCreateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nombre: createFormData.nombre, Apellido: createFormData.apellido, Email: createFormData.email, Password: createFormData.password, Rol: createFormData.rol }),
      });
      if (!response.ok) throw new Error('Error al crear usuario');
      setShowCreateModal(false);
      setCreateFormData({ nombre: '', apellido: '', email: '', password: '', rol: 'Usuario' });
      setSuccessMessage('Usuario creado correctamente');
      fetchUsuarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      setSuccessMessage('Usuario eliminado correctamente');
      fetchUsuarios();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const closeModal = () => { setShowEditModal(false); setShowCreateModal(false); };

  const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', color: BLACK }}>

      {successMessage && (
        <div style={{ background: 'var(--btn-bg)', color: 'var(--btn-text)', padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{successMessage}</div>
      )}
      {error && (
        <div style={{ background: '#e63946', color: CREAM, padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button onClick={() => setShowCreateModal(true)} style={btnPrimary}>+ Nuevo Usuario</button>
      </div>

      <div style={{ border: `1px solid var(--border-subtle)` }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>Cargando usuarios...</div>
        ) : usuarios.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>No hay usuarios registrados</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border-subtle)` }}>
                  {['Usuario', 'Email', 'Rol', ''].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: h === '' ? 'right' : 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: `1px solid var(--border-subtle)`, background: i % 2 === 0 ? 'transparent' : 'rgba(var(--accent-rgb), 0.03)' }}>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.95rem', fontWeight: 700 }}>{u.nombre} {u.apellido}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.9rem', opacity: 0.7 }}>{u.email}</td>
                    <td style={{ padding: '0.9rem 1.25rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        background: u.rol === 'admin' ? BLUE : 'rgba(var(--accent-rgb), 0.08)',
                        color: u.rol === 'admin' ? CREAM : BLACK,
                      }}>
                        {u.rol === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => handleEdit(u)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginRight: '1rem', padding: 0 }}>Editar</button>
                      <button onClick={() => handleDelete(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e63946', fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, padding: 0 }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(showEditModal || showCreateModal) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ background: 'var(--input-bg)', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid var(--border-subtle)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: '1.5rem', fontWeight: 400, color: BLACK, margin: 0 }}>
                {showEditModal ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLACK, fontSize: '1.25rem', opacity: 0.5, lineHeight: 1, padding: 0 }}>✕</button>
            </div>

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormField label="Nombre">
                  <input type="text" style={inputStyle} placeholder="Ej. Juan"
                    value={showEditModal ? editingUser?.nombre ?? '' : createFormData.nombre}
                    onChange={e => showEditModal ? setEditingUser(p => p ? { ...p, nombre: e.target.value } : null) : setCreateFormData({ ...createFormData, nombre: e.target.value })}
                  />
                </FormField>
                <FormField label="Apellido">
                  <input type="text" style={inputStyle} placeholder="Ej. Pérez"
                    value={showEditModal ? editingUser?.apellido ?? '' : createFormData.apellido}
                    onChange={e => showEditModal ? setEditingUser(p => p ? { ...p, apellido: e.target.value } : null) : setCreateFormData({ ...createFormData, apellido: e.target.value })}
                  />
                </FormField>
              </div>

              <FormField label="Email">
                <input type="email" style={inputStyle} placeholder="correo@ejemplo.com"
                  value={showEditModal ? editingUser?.email ?? '' : createFormData.email}
                  onChange={e => showEditModal ? setEditingUser(p => p ? { ...p, email: e.target.value } : null) : setCreateFormData({ ...createFormData, email: e.target.value })}
                />
              </FormField>

              {!showEditModal && (
                <FormField label="Contraseña">
                  <input type="password" style={inputStyle} placeholder="••••••••"
                    value={createFormData.password}
                    onChange={e => setCreateFormData({ ...createFormData, password: e.target.value })}
                  />
                </FormField>
              )}

              <FormField label="Rol">
                <select style={{ ...inputStyle, cursor: 'pointer' }}
                  value={showEditModal ? editingUser?.rol ?? 'Usuario' : createFormData.rol}
                  onChange={e => showEditModal ? setEditingUser(p => p ? { ...p, rol: e.target.value } : null) : setCreateFormData({ ...createFormData, rol: e.target.value })}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </FormField>
            </div>

            <div style={{ padding: '1.25rem 1.75rem', borderTop: `1px solid var(--border-subtle)`, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={btnSecondary}>Cancelar</button>
              <button onClick={showEditModal ? handleSaveEdit : handleCreateUser} style={btnPrimary}>
                {showEditModal ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;