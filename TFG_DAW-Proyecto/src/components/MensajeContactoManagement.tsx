import React, { useState, useEffect } from 'react';

const BLUE = 'var(--accent)';
const CREAM = 'var(--bg)';
const BLACK = 'var(--text)';

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

const btnDanger: React.CSSProperties = {
  background: '#e63946',
  color: CREAM,
  border: 'none',
  padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 700,
  cursor: 'pointer',
};

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

  useEffect(() => { fetchMensajes(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) return;
    try {
      const response = await fetch(`${API_URL}/api/mensajescontacto/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar mensaje');
      setSuccessMessage('Mensaje eliminado correctamente');
      fetchMensajes();
      setSelectedMensaje(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: BLACK, opacity: 0.5, margin: '0 0 0.25rem 0' }}>{label}</p>
      <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.95rem', color: BLACK }}>{children}</div>
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

      <div style={{ border: `1px solid var(--border-subtle)` }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>Cargando mensajes...</div>
        ) : mensajes.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>No hay mensajes de contacto</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border-subtle)` }}>
                  {['Nombre', 'Email', 'Asunto', 'Fecha', ''].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: h === '' ? 'right' : 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mensajes.map((m, i) => (
                  <tr key={m.id} style={{ borderBottom: `1px solid var(--border-subtle)`, background: i % 2 === 0 ? 'transparent' : 'rgba(var(--accent-rgb), 0.03)' }}>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.95rem', fontWeight: 700 }}>{m.nombre} {m.apellido}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.9rem', opacity: 0.7 }}>{m.correo}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.9rem', opacity: 0.7, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.asunto}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.85rem', opacity: 0.55, whiteSpace: 'nowrap' }}>{formatDate(m.fechaEnvio)}</td>
                    <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => setSelectedMensaje(m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginRight: '1rem', padding: 0 }}>Ver</button>
                      <button onClick={() => handleDelete(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e63946', fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, padding: 0 }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMensaje && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ background: CREAM, width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid var(--border-subtle)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: '1.5rem', fontWeight: 400, color: BLACK, margin: 0 }}>Mensaje</h2>
              <button onClick={() => setSelectedMensaje(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLACK, fontSize: '1.25rem', opacity: 0.5, lineHeight: 1, padding: 0 }}>✕</button>
            </div>

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <DetailRow label="Nombre">{selectedMensaje.nombre}</DetailRow>
                <DetailRow label="Apellido">{selectedMensaje.apellido}</DetailRow>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <DetailRow label="Email">
                  <a href={`mailto:${selectedMensaje.correo}`} style={{ color: BLUE, textDecoration: 'none', fontFamily: 'Satoshi, sans-serif', fontSize: '0.95rem' }}>{selectedMensaje.correo}</a>
                </DetailRow>
                <DetailRow label="Teléfono">
                  <a href={`tel:${selectedMensaje.telefono}`} style={{ color: BLUE, textDecoration: 'none', fontFamily: 'Satoshi, sans-serif', fontSize: '0.95rem' }}>{selectedMensaje.telefono}</a>
                </DetailRow>
              </div>
              <DetailRow label="Asunto">{selectedMensaje.asunto}</DetailRow>
              <DetailRow label="Mensaje">
                <div style={{ background: 'rgba(var(--accent-rgb), 0.04)', border: `1px solid var(--border-subtle)`, padding: '1rem', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: '160px', overflowY: 'auto', color: BLACK }}>
                  {selectedMensaje.descripcion}
                </div>
              </DetailRow>
              <DetailRow label="Fecha de envío">
                <span style={{ opacity: 0.65, fontSize: '0.9rem' }}>{formatDate(selectedMensaje.fechaEnvio)}</span>
              </DetailRow>
            </div>

            <div style={{ padding: '1.25rem 1.75rem', borderTop: `1px solid var(--border-subtle)`, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedMensaje(null)} style={btnSecondary}>Cerrar</button>
              <button onClick={() => handleDelete(selectedMensaje.id)} style={btnDanger}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MensajeContactoManagement;