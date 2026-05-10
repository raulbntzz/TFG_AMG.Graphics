import { useState, useEffect } from 'react';

interface Proyecto {
	id: number; src: string; categoria: string; title: string; description: string; fecha?: string; height?: number;
}

const API_URL = 'http://localhost:5047';

const getImageUrl = (src: string) => {
	if (src.startsWith('http')) return src;
	if (src.startsWith('/') || src.startsWith('uploads')) return `${API_URL}/${src}`;
	return `${API_URL}/uploads/galeria/${src}`;
};

export default function Galeria() {
	const [proyectos, setProyectos] = useState<Proyecto[]>([]);
	const [categorias, setCategorias] = useState<string[]>([]);
	const [filtroActivo, setFiltroActivo] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [vista, setVista] = useState<'grid' | 'list'>('grid');
	const [expandido, setExpandido] = useState<number | null>(null);

	useEffect(() => {
		const fetchProyectos = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${API_URL}/api/galeria`);
				if (!res.ok) throw new Error();
				const data: Proyecto[] = await res.json();
				setProyectos(data);
				setCategorias(Array.from(new Set(data.map(p => p.categoria))));
			} catch { setProyectos([]); } finally { setLoading(false); }
		};
		fetchProyectos();
	}, []);

	const categoriasFiltradas = filtroActivo ? [filtroActivo] : categorias;
	const proyectosFiltrados = filtroActivo ? proyectos.filter(p => p.categoria === filtroActivo) : proyectos;

	const ImagenConOverlay = ({ p, width = '100%' }: { p: Proyecto; width?: string }) => (
		<a href={`/galeria/${p.id}`} style={{ display: 'block', width, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
			<img src={getImageUrl(p.src)} alt={p.title} style={{ width: '100%', display: 'block', filter: 'grayscale(100%)', transition: 'transform 0.4s ease' }} />
			<div style={{ position: 'absolute', inset: 0, background: `rgba(var(--accent-rgb), 0.55)`, mixBlendMode: 'multiply', transition: 'opacity 0.3s' }} />
		</a>
	);

	return (
		<div style={{ paddingTop: '56px', backgroundColor: 'var(--bg)', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', minHeight: '100vh' }}>

			<section style={{ padding: '3rem 7vw 2.5rem' }}>
				<h1 style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: 400, lineHeight: 1.25, color: 'var(--text)', maxWidth: '520px', margin: 0 }}>
					Diseño con intención, creando{' '}
					<strong style={{ fontWeight: 900 }}>soluciones visuales</strong>{' '}
					que conectan ideas con personas.
				</h1>
			</section>

			<div style={{ padding: '0 7vw', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
				<span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>Filtrar por categoría</span>
				<div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
					<button onClick={() => setVista('grid')} title="Vista cuadrícula" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', opacity: vista === 'grid' ? 1 : 0.35 }}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="var(--accent)"><rect x="0" y="0" width="7" height="7" rx="1"/><rect x="11" y="0" width="7" height="7" rx="1"/><rect x="0" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/></svg>
					</button>
					<button onClick={() => setVista('list')} title="Vista lista" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', opacity: vista === 'list' ? 1 : 0.35 }}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="var(--accent)"><rect x="0" y="1" width="18" height="3" rx="1"/><rect x="0" y="7.5" width="18" height="3" rx="1"/><rect x="0" y="14" width="18" height="3" rx="1"/></svg>
					</button>
				</div>
				<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
					{categorias.map(cat => (
						<button key={cat} onClick={() => setFiltroActivo(filtroActivo === cat ? null : cat)}
							style={{ background: filtroActivo === cat ? 'var(--btn-bg)' : 'transparent', color: filtroActivo === cat ? 'var(--btn-text)' : 'var(--accent)', border: '1px solid var(--accent)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', padding: '3px 12px', cursor: 'pointer', transition: 'all 0.2s', borderRadius: 0 }}>
							{cat}
						</button>
					))}
				</div>
			</div>

			<div style={{ borderTop: '2px solid var(--accent)', margin: '0.75rem 7vw 0' }} />

			{loading ? (
				<div style={{ padding: '4rem 7vw' }}>Cargando galería...</div>
			) : vista === 'grid' ? (
				<div style={{ padding: '0 7vw 5rem' }}>
					{categoriasFiltradas.map(cat => {
						const items = proyectosFiltrados.filter(p => p.categoria === cat);
						if (items.length === 0) return null;
						return (
							<section key={cat} style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
								<div className="galeria-cat-grid">
									<div style={{ paddingTop: '1.8rem' }}>
										<div style={{ borderTop: '1px solid var(--text)', marginBottom: '1rem' }} />
										<h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.15, color: 'var(--text)', margin: 0 }}>{cat}</h2>
									</div>
									<div className="galeria-items-grid">
										{items.map(p => (
											<div key={p.id}>
												<p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.5rem' }}>{p.title}</p>
												<ImagenConOverlay p={p} />
												<div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.6rem', paddingTop: '0.4rem' }}>
													<p style={{ fontSize: '0.85rem', color: 'var(--text)', margin: 0, textAlign: 'right' }}>{p.description}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</section>
						);
					})}
				</div>
			) : (
				<div style={{ padding: '0 7vw 5rem' }}>
					{categoriasFiltradas.map(cat => {
						const items = proyectosFiltrados.filter(p => p.categoria === cat);
						if (items.length === 0) return null;
						return (
							<section key={cat} style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
								<h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text)', margin: '0 0 1.5rem' }}>{cat}</h2>
								<div>
									{items.map((p, idx) => (
										<div key={p.id}>
											<div onClick={() => setExpandido(expandido === p.id ? null : p.id)}
												className="galeria-list-row"
												style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr auto', alignItems: 'center', gap: '0 2rem', padding: '1.1rem 0', cursor: 'pointer', borderTop: idx === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
												<span style={{ fontSize: '1rem', color: 'var(--text)' }}>{p.title}</span>
												<span className="list-fecha" style={{ fontSize: '1rem', color: 'var(--text)' }}>{p.fecha ?? ''}</span>
												<span className="list-desc" style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text)' }}>{p.description}</span>
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
													style={{ transform: expandido === p.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>
													<path d="M19 9l-7 7-7-7" />
												</svg>
											</div>
											<div style={{ maxHeight: expandido === p.id ? '2000px' : '0', overflow: 'hidden', transition: 'max-height 0.45s' }}>
												<div style={{ paddingBottom: '2rem', paddingTop: '0.75rem' }}>
													<div style={{ display: 'flex', justifyContent: 'center' }}>
														<ImagenConOverlay p={p} width="45%" />
													</div>
													<div style={{ textAlign: 'center', marginTop: '1rem' }}>
														<a href={`/galeria/${p.id}`} style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent)', fontSize: '0.85rem' }}>Ver proyecto →</a>
													</div>
												</div>
											</div>
											<div style={{ borderTop: '1px solid var(--border-subtle)' }} />
										</div>
									))}
								</div>
							</section>
						);
					})}
				</div>
			)}
		</div>
	);
}