import { useState, useEffect } from 'react';

const BLUE = 'var(--accent)';
const CREAM = 'var(--bg)';
const BLACK = 'var(--text)';

const API_URL = 'http://localhost:5047';

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
  background: 'var(--btn-bg)', color: 'var(--btn-text)', border: 'none', padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
};

const btnDanger: React.CSSProperties = {
  background: 'none', color: '#e63946', border: 'none', cursor: 'pointer',
  fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0',
};

interface Archivo {
  nombre: string;
  ruta: string;
  esVideo: boolean;
}

interface Carpeta {
  carpeta: string;
  archivos: Archivo[];
}

export default function ArchivosManagement() {
  const [carpetas, setCarpetas] = useState<Carpeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<File[]>([]);
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState('');
  const [nuevaCarpetaInput, setNuevaCarpetaInput] = useState('');

  const fetchArchivos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/archivos`);
      if (!res.ok) throw new Error();
      setCarpetas(await res.json());
    } catch {
      setError('Error al cargar archivos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArchivos(); }, []);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleUpload = async () => {
    const carpeta = carpetaSeleccionada === '__nueva__' ? nuevaCarpetaInput.trim() : carpetaSeleccionada;
    if (!carpeta) { setError('Selecciona o crea una carpeta'); return; }
    if (archivosSeleccionados.length === 0) { setError('Selecciona al menos un archivo'); return; }

    setUploading(true);
    setError(null);

    try {
      for (const archivo of archivosSeleccionados) {
        const fd = new FormData();
        fd.append('archivo', archivo);
        fd.append('carpeta', carpeta);
        const res = await fetch(`${API_URL}/api/archivos/upload`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error(await res.text());
      }
      setArchivosSeleccionados([]);
      setCarpetaSeleccionada('');
      setNuevaCarpetaInput('');
      await fetchArchivos();
      showSuccess(`${archivosSeleccionados.length} archivo(s) subido(s) correctamente`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (ruta: string) => {
    if (!window.confirm('¿Eliminar este archivo?')) return;
    try {
      const res = await fetch(`${API_URL}/api/archivos?ruta=${encodeURIComponent(ruta)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      await fetchArchivos();
      showSuccess('Archivo eliminado');
    } catch {
      setError('Error al eliminar');
    }
  };

  const todasLasCarpetas = carpetas.map(c => c.carpeta);

  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', color: BLACK }}>

      {success && <div style={{ background: 'var(--btn-bg)', color: 'var(--btn-text)', padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{success}</div>}
      {error && <div style={{ background: '#e63946', color: CREAM, padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

      {/* ── UPLOAD ── */}
      <div style={{ border: `1px solid var(--border-subtle)`, padding: '1.75rem', marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5, margin: '0 0 1.25rem 0' }}>Subir archivos</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <div>
            <label style={labelStyle}>Carpeta</label>
            <select
              style={{ ...inputStyle, cursor: 'pointer' }}
              value={carpetaSeleccionada}
              onChange={e => setCarpetaSeleccionada(e.target.value)}
            >
              <option value="">Selecciona una carpeta...</option>
              {todasLasCarpetas.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="__nueva__">+ Nueva carpeta</option>
            </select>
          </div>

          {carpetaSeleccionada === '__nueva__' && (
            <div>
              <label style={labelStyle}>Nombre de la nueva carpeta</label>
              <input
                type="text"
                style={inputStyle}
                placeholder="ej. alcine"
                value={nuevaCarpetaInput}
                onChange={e => setNuevaCarpetaInput(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>
              Archivos {archivosSeleccionados.length > 0 && `(${archivosSeleccionados.length} seleccionados)`}
            </label>
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*,video/mp4,video/webm"
              style={{ display: 'none' }}
              onChange={e => setArchivosSeleccionados(Array.from(e.target.files ?? []))}
            />
            <label htmlFor="file-upload" style={{ ...inputStyle, display: 'block', cursor: 'pointer', opacity: 0.8 }}>
              {archivosSeleccionados.length > 0
                ? archivosSeleccionados.map(f => f.name).join(', ')
                : 'Seleccionar archivos...'}
            </label>
          </div>

          <div>
            <button onClick={handleUpload} disabled={uploading} style={{ ...btnPrimary, opacity: uploading ? 0.6 : 1 }}>
              {uploading ? 'Subiendo...' : 'Subir'}
            </button>
          </div>
        </div>
      </div>

      {/* ── ARCHIVOS POR CARPETA ── */}
      {loading ? (
        <div style={{ opacity: 0.5 }}>Cargando archivos...</div>
      ) : carpetas.length === 0 ? (
        <div style={{ opacity: 0.5 }}>No hay archivos subidos todavía</div>
      ) : (
        carpetas.map(({ carpeta, archivos }) => (
          <div key={carpeta} style={{ marginBottom: '3rem' }}>
            <div style={{ borderTop: `2px solid ${BLUE}`, paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: '1.5rem', fontWeight: 400, margin: 0 }}>{carpeta}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
              {archivos.map(archivo => (
                <div key={archivo.ruta} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ aspectRatio: '1', overflow: 'hidden', background: 'rgba(var(--accent-rgb), 0.05)' }}>
                    {archivo.esVideo ? (
                      <video
                        src={`${API_URL}/${archivo.ruta}`}
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={`${API_URL}/${archivo.ruta}`}
                        alt={archivo.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', margin: 0, opacity: 0.6, wordBreak: 'break-all', lineHeight: 1.3 }}>{archivo.nombre}</p>
                  <button onClick={() => handleDelete(archivo.ruta)} style={btnDanger}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}