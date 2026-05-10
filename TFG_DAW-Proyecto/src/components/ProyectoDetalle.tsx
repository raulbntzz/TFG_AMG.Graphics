import { useState, useEffect } from 'react';

interface Proyecto {
  id: number; src: string; categoria: string; title: string; description: string; height: number;
  descripcionLarga?: string; descripcionLarga2?: string; proyecto?: string; anio?: string;
  imagenIntermedia?: string; captionIntermedia?: string; imagenesDetalle?: string;
  captionDetalle1?: string; captionDetalle2?: string;
}

const API_URL = 'http://localhost:5047';

const getImageUrl = (src: string) => {
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return src;
  if (src.startsWith('uploads')) return `${API_URL}/${src}`;
  return `/${src}`;
};

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

const Media = ({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) => {
  const url = getImageUrl(src);
  if (isVideo(src)) return <video src={url} autoPlay loop muted playsInline style={{ width: '100%', display: 'block', ...style }} />;
  return <img src={url} alt={alt} style={{ width: '100%', display: 'block', ...style }} />;
};

export default function ProyectoDetalle({ id }: { id: number }) {
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imagenesExtra, setImagenesExtra] = useState<string[]>([]);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${API_URL}/api/galeria/${id}`);
        if (!res.ok) throw new Error();
        const data: Proyecto = await res.json();
        setProyecto(data);
        if (data.imagenesDetalle) {
          try { const parsed = JSON.parse(data.imagenesDetalle); if (Array.isArray(parsed)) setImagenesExtra(parsed); } catch { }
        }
      } catch { setError(true); } finally { setLoading(false); }
    };
    fetch_();
  }, [id]);

  if (loading) return (
    <div style={{ paddingTop: '56px', background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Satoshi, sans-serif', color: 'var(--text)', opacity: 0.5 }}>
      Cargando...
    </div>
  );

  if (error || !proyecto) return (
    <div style={{ paddingTop: '56px', background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Satoshi, sans-serif', color: 'var(--text)', gap: '1rem' }}>
      <p style={{ margin: 0, opacity: 0.5 }}>Proyecto no encontrado</p>
      <a href="/galeria" style={{ color: 'var(--accent)', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '1px solid var(--accent)' }}>← Volver a la galería</a>
    </div>
  );

  return (
    <div style={{ paddingTop: '56px', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif' }}>

      {/* ── IMAGEN HERO ── */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Media src={proyecto.src} alt={proyecto.title} style={{ width: '100%', height: 'auto' } as React.CSSProperties} />
      </div>

      <div style={{ padding: '3.5rem 7vw 5rem' }}>

        <a href="/galeria" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'var(--accent)', textDecoration: 'none', marginBottom: '2.5rem', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.borderBottomColor = 'var(--accent)')}
          onMouseOut={e => (e.currentTarget.style.borderBottomColor = 'transparent')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
          Volver a la galería
        </a>

        <div style={{ borderTop: '2px solid var(--accent)', marginBottom: '2rem' }} />
        <h1 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 400, lineHeight: 1.05, color: 'var(--text)', margin: '0 0 2.5rem 0' }}>
          {proyecto.title}
        </h1>

        <div className="detalle-meta">
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5, margin: '0 0 0.3rem 0' }}>Descripción</p>
            <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>{proyecto.description}</p>
          </div>
          {proyecto.proyecto && (
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5, margin: '0 0 0.3rem 0' }}>Proyecto</p>
              <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>{proyecto.proyecto}</p>
            </div>
          )}
          {proyecto.anio && (
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.5, margin: '0 0 0.3rem 0' }}>Año</p>
              <p style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>{proyecto.anio}</p>
            </div>
          )}
        </div>

        {proyecto.descripcionLarga && (
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: proyecto.descripcionLarga.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        )}

        {proyecto.imagenIntermedia && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3.5rem' }}>
            <div style={{ width: '55%', position: 'relative' }}>
              <Media src={proyecto.imagenIntermedia} alt={proyecto.title} />
              {proyecto.captionIntermedia && (
                <p style={{ position: 'absolute', bottom: '0', left: '-9rem', width: '8rem', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, opacity: 0.7 }}>
                  {proyecto.captionIntermedia}
                </p>
              )}
            </div>
          </div>
        )}

        {proyecto.descripcionLarga2 && (
          <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: proyecto.descripcionLarga2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        )}

        {imagenesExtra.length > 0 && (
          <div className="detalle-extras" style={{ position: 'relative', marginBottom: '3.5rem' }}>
            {imagenesExtra[0] && (
              <div style={{ width: '35%' }}>
                <Media src={imagenesExtra[0]} alt={`${proyecto.title} — 1`} />
                {proyecto.captionDetalle1 && (
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.5, margin: '0.6rem 0 0 0', opacity: 0.7 }}>{proyecto.captionDetalle1}</p>
                )}
              </div>
            )}
            {imagenesExtra[1] && (
              <div style={{ width: '35%', position: 'absolute', right: 0, top: '4rem' }}>
                <Media src={imagenesExtra[1]} alt={`${proyecto.title} — 2`} />
                {proyecto.captionDetalle2 && (
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.5, margin: '0.6rem 0 0 0', opacity: 0.7 }}>{proyecto.captionDetalle2}</p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}