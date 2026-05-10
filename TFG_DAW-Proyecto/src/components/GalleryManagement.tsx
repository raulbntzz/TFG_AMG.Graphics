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
  background: 'var(--btn-bg)', color: 'var(--btn-text)', border: 'none', padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.03em',
};

const btnSecondary: React.CSSProperties = {
  background: 'transparent', color: BLACK, border: `1px solid var(--border)`, padding: '0.65rem 1.5rem',
  fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', fontWeight: 400, cursor: 'pointer',
};

const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label style={labelStyle}>{label}</label>{children}</div>
);

const SectionDivider = ({ label }: { label: string }) => (
  <div style={{ borderTop: `1px solid var(--border-subtle)`, paddingTop: '0.25rem' }}>
    <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.4, margin: '0 0 1rem 0' }}>{label}</p>
  </div>
);

interface ArchivoItem {
  nombre: string;
  ruta: string;
  esVideo: boolean;
}

interface CarpetaItem {
  carpeta: string;
  archivos: ArchivoItem[];
}

interface Imagen {
  id: number;
  src: string;
  categoria: string;
  title: string;
  description: string;
  descripcionLarga?: string;
  descripcionLarga2?: string;
  proyecto?: string;
  anio?: string;
  imagenIntermedia?: string;
  captionIntermedia?: string;
  imagenesDetalle?: string;
  captionDetalle1?: string;
  captionDetalle2?: string;
}

interface GaleriaForm {
  id?: number;
  src: string;
  categoria: string;
  title: string;
  description: string;
  descripcionLarga: string;
  descripcionLarga2: string;
  proyecto: string;
  anio: string;
  imagenIntermedia: string;
  captionIntermedia: string;
  imagenDetalle1: string;
  captionDetalle1: string;
  imagenDetalle2: string;
  captionDetalle2: string;
}

const emptyForm: GaleriaForm = {
  src: '', categoria: '', title: '', description: '',
  descripcionLarga: '', descripcionLarga2: '', proyecto: '', anio: '',
  imagenIntermedia: '', captionIntermedia: '',
  imagenDetalle1: '', captionDetalle1: '',
  imagenDetalle2: '', captionDetalle2: '',
};

const FilePicker = ({
  onSelect,
  onClose,
  apiUrl,
}: {
  onSelect: (ruta: string) => void;
  onClose: () => void;
  apiUrl: string;
}) => {
  const [carpetas, setCarpetas] = useState<CarpetaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/archivos`)
      .then(r => r.json())
      .then(data => { setCarpetas(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div style={{ background: 'var(--input-bg)', width: '100%', maxWidth: '780px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: `1px solid var(--border-subtle)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h3 style={{ fontFamily: 'LTCBroadway, serif', fontSize: '1.25rem', fontWeight: 400, margin: 0 }}>Seleccionar archivo</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', opacity: 0.5, padding: 0 }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '1.5rem', flex: 1 }}>
          {loading ? (
            <p style={{ opacity: 0.5 }}>Cargando archivos...</p>
          ) : carpetas.length === 0 ? (
            <p style={{ opacity: 0.5 }}>No hay archivos. Súbelos en el panel de Archivos.</p>
          ) : (
            carpetas.map(({ carpeta, archivos }) => (
              <div key={carpeta} style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5, margin: '0 0 0.75rem 0', borderTop: `1px solid var(--border-subtle)`, paddingTop: '0.75rem' }}>{carpeta}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                  {archivos.map(archivo => (
                    <div
                      key={archivo.ruta}
                      onClick={() => onSelect(archivo.ruta)}
                      style={{ cursor: 'pointer', border: `1px solid var(--border-subtle)`, overflow: 'hidden', transition: 'border-color 0.2s' }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = BLUE)}
                      onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    >
                      <div style={{ aspectRatio: '1', overflow: 'hidden', background: 'rgba(var(--accent-rgb), 0.05)' }}>
                        {archivo.esVideo ? (
                          <video src={`${apiUrl}/${archivo.ruta}`} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <img src={`${apiUrl}/${archivo.ruta}`} alt={archivo.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                        )}
                      </div>
                      <p style={{ fontSize: '0.72rem', margin: '0.4rem 0.5rem', opacity: 0.6, wordBreak: 'break-all', lineHeight: 1.3 }}>{archivo.nombre}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const FileField = ({
  label,
  value,
  onChange,
  apiUrl,
  required,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  apiUrl: string;
  required?: boolean;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const isVideo = /\.(mp4|webm)$/i.test(value);
  return (
    <F label={required ? `${label} *` : label}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          style={{ ...inputStyle, flex: 1 }}
          placeholder="uploads/carpeta/archivo.jpg"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            title="Quitar imagen"
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', padding: '0 0.75rem', fontSize: '1rem', flexShrink: 0, opacity: 0.6 }}
          >
            ✕
          </button>
        )}
        <button
          onClick={() => setShowPicker(true)}
          style={{ ...btnPrimary, padding: '0.65rem 1rem', flexShrink: 0, fontSize: '0.8rem' }}
        >
          Explorar
        </button>
      </div>
      {value && !isVideo && (
        <img src={`${apiUrl}/${value}`} alt="" style={{ marginTop: '0.5rem', height: '60px', width: '60px', objectFit: 'cover'}} />
      )}
      {value && isVideo && (
        <video src={`${apiUrl}/${value}`} muted style={{ marginTop: '0.5rem', height: '60px', width: '60px', objectFit: 'cover' }} />
      )}
      {showPicker && (
        <FilePicker
          apiUrl={apiUrl}
          onSelect={ruta => { onChange(ruta); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </F>
  );
};

const GalleryManagement: React.FC = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<GaleriaForm>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const API_URL = 'http://localhost:5047';

  const fetchImagenes = async () => {
    try {
      setLoading(true); setError(null);
      const response = await fetch(`${API_URL}/api/galeria`);
      if (!response.ok) throw new Error('Error al obtener imágenes');
      setImagenes(await response.json());
    } catch (err) { setError(err instanceof Error ? err.message : 'Error desconocido'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchImagenes(); }, []);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const parseImagenesDetalle = (val: string): [string, string] => {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return [parsed[0] ?? '', parsed[1] ?? ''];
    } catch { }
    return ['', ''];
  };

  const openCreate = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (imagen: Imagen) => {
    const [img1, img2] = parseImagenesDetalle(imagen.imagenesDetalle ?? '');
    setForm({
      id: imagen.id,
      src: imagen.src,
      categoria: imagen.categoria,
      title: imagen.title,
      description: imagen.description,
      descripcionLarga: imagen.descripcionLarga ?? '',
      descripcionLarga2: imagen.descripcionLarga2 ?? '',
      proyecto: imagen.proyecto ?? '',
      anio: imagen.anio ?? '',
      imagenIntermedia: imagen.imagenIntermedia ?? '',
      captionIntermedia: imagen.captionIntermedia ?? '',
      imagenDetalle1: img1,
      captionDetalle1: imagen.captionDetalle1 ?? '',
      imagenDetalle2: img2,
      captionDetalle2: imagen.captionDetalle2 ?? '',
    });
    setIsEdit(true);
    setShowModal(true);
  };

  const buildBody = () => {
    const imagenesDetalle = JSON.stringify([form.imagenDetalle1, form.imagenDetalle2].filter(Boolean));
    return JSON.stringify({
      src: form.src,
      categoria: form.categoria,
      title: form.title,
      description: form.description,
      descripcionLarga: form.descripcionLarga,
      descripcionLarga2: form.descripcionLarga2,
      proyecto: form.proyecto,
      anio: form.anio,
      imagenIntermedia: form.imagenIntermedia,
      captionIntermedia: form.captionIntermedia,
      imagenesDetalle,
      captionDetalle1: form.captionDetalle1,
      captionDetalle2: form.captionDetalle2,
    });
  };

  const handleSave = async () => {
    if (!form.src) { setError('La imagen principal es requerida'); return; }
    if (!form.title) { setError('El título es requerido'); return; }
    if (!form.categoria) { setError('La categoría es requerida'); return; }
    setError(null);
    try {
      const url = isEdit ? `${API_URL}/api/galeria/${form.id}` : `${API_URL}/api/galeria`;
      const method = isEdit ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: buildBody(),
      });
      if (!response.ok) throw new Error('Error al guardar');
      setShowModal(false);
      setForm(emptyForm);
      fetchImagenes();
      showSuccess(isEdit ? 'Imagen actualizada correctamente' : 'Imagen añadida correctamente');
    } catch (err) { setError(err instanceof Error ? err.message : 'Error desconocido'); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) return;
    try {
      const response = await fetch(`${API_URL}/api/galeria/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar imagen');
      fetchImagenes();
      showSuccess('Imagen eliminada correctamente');
    } catch (err) { setError(err instanceof Error ? err.message : 'Error desconocido'); }
  };

  const set = (key: keyof GaleriaForm, val: string) =>
    setForm(p => ({ ...p, [key]: val }));

  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', color: BLACK }}>

      {successMessage && <div style={{ background: 'var(--btn-bg)', color: 'var(--btn-text)', padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{successMessage}</div>}
      {error && <div style={{ background: '#e63946', color: CREAM, padding: '0.75rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button onClick={openCreate} style={btnPrimary}>+ Nueva Imagen</button>
      </div>

      <div style={{ border: `1px solid var(--border-subtle)` }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>Cargando imágenes...</div>
        ) : imagenes.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>No hay imágenes en la galería</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid var(--border-subtle)` }}>
                  {['Imagen', 'Título', 'Categoría', 'Proyecto', ''].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: h === '' ? 'right' : 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {imagenes.map((imagen, i) => (
                  <tr key={imagen.id} style={{ borderBottom: `1px solid var(--border-subtle)`, background: i % 2 === 0 ? 'transparent' : 'rgba(var(--accent-rgb), 0.03)' }}>
                    <td style={{ padding: '0.9rem 1.25rem' }}>
                      <img src={`${API_URL}/${imagen.src}`} alt={imagen.title} style={{ height: '48px', width: '48px', objectFit: 'cover'}} />
                    </td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.95rem', fontWeight: 700 }}>{imagen.title}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.9rem', opacity: 0.7 }}>{imagen.categoria}</td>
                    <td style={{ padding: '0.9rem 1.25rem', fontSize: '0.9rem', opacity: 0.7 }}>{imagen.proyecto ?? '—'}</td>
                    <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <a href={`/galeria/${imagen.id}`} target="_blank" style={{ color: BLACK, fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', opacity: 0.45, marginRight: '1rem', textDecoration: 'none' }}>Ver</a>
                      <button onClick={() => openEdit(imagen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, marginRight: '1rem', padding: 0 }}>Editar</button>
                      <button onClick={() => handleDelete(imagen.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e63946', fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', fontWeight: 700, padding: 0 }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ background: 'var(--input-bg)', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid var(--border-subtle)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: '1.5rem', fontWeight: 400, color: BLACK, margin: 0 }}>
                {isEdit ? 'Editar Imagen' : 'Nueva Imagen'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLACK, fontSize: '1.25rem', opacity: 0.5, lineHeight: 1, padding: 0 }}>✕</button>
            </div>

            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <FileField
                label="Imagen principal"
                value={form.src}
                onChange={val => set('src', val)}
                apiUrl={API_URL}
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <F label="Título *">
                  <input type="text" style={inputStyle} placeholder="Mi Proyecto"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                  />
                </F>
                <F label="Categoría *">
                  <input type="text" style={inputStyle} placeholder="Branding, UI/UX..."
                    value={form.categoria}
                    onChange={e => set('categoria', e.target.value)}
                  />
                </F>
              </div>

              <F label="Descripción corta">
                <input type="text" style={inputStyle} placeholder="Breve descripción para la galería"
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                />
              </F>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <F label="Nombre del proyecto">
                  <input type="text" style={inputStyle} placeholder="Ej. La Ribera"
                    value={form.proyecto}
                    onChange={e => set('proyecto', e.target.value)}
                  />
                </F>
                <F label="Año">
                  <input type="text" style={inputStyle} placeholder="2026"
                    value={form.anio}
                    onChange={e => set('anio', e.target.value)}
                  />
                </F>
              </div>

              <SectionDivider label="Página de detalle" />

              <F label="Descripción larga 1">
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={5} placeholder="Primera descripción. Usa **texto** para negrita."
                  value={form.descripcionLarga}
                  onChange={e => set('descripcionLarga', e.target.value)}
                />
              </F>

              <FileField
                label="Imagen intermedia"
                value={form.imagenIntermedia}
                onChange={val => set('imagenIntermedia', val)}
                apiUrl={API_URL}
              />

              <F label="Caption imagen intermedia">
                <input type="text" style={inputStyle} placeholder="Pedro Tomás explica el mundo..."
                  value={form.captionIntermedia}
                  onChange={e => set('captionIntermedia', e.target.value)}
                />
              </F>

              <F label="Descripción larga 2">
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={5} placeholder="Segunda descripción. Usa **texto** para negrita."
                  value={form.descripcionLarga2}
                  onChange={e => set('descripcionLarga2', e.target.value)}
                />
              </F>

              <SectionDivider label="Imágenes adicionales" />

              <FileField
                label="Imagen adicional 1"
                value={form.imagenDetalle1}
                onChange={val => set('imagenDetalle1', val)}
                apiUrl={API_URL}
              />

              <F label="Caption imagen 1">
                <input type="text" style={inputStyle} placeholder="Story a modo de trailer..."
                  value={form.captionDetalle1}
                  onChange={e => set('captionDetalle1', e.target.value)}
                />
              </F>

              <FileField
                label="Imagen adicional 2"
                value={form.imagenDetalle2}
                onChange={val => set('imagenDetalle2', val)}
                apiUrl={API_URL}
              />

              <F label="Caption imagen 2">
                <input type="text" style={inputStyle} placeholder="Animacion de cartel..."
                  value={form.captionDetalle2}
                  onChange={e => set('captionDetalle2', e.target.value)}
                />
              </F>

            </div>

            <div style={{ padding: '1.25rem 1.75rem', borderTop: `1px solid var(--border-subtle)`, display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={btnSecondary}>Cancelar</button>
              <button onClick={handleSave} style={btnPrimary}>
                {isEdit ? 'Guardar cambios' : 'Añadir imagen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;