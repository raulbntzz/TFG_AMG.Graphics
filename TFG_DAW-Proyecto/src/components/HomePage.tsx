import { useState, useEffect } from 'react';

const CAROUSEL_ITEMS = [
	{
		image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80&auto=format&fit=crop',
		title: 'Repetir está bien',
		description: 'campaña publicitaria sobre moda sostenible',
	},
	{
		image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
		title: 'Identidad visual',
		description: 'branding para marca de productos naturales',
	},
	{
		image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=1200&q=80&auto=format&fit=crop',
		title: 'Diseño editorial',
		description: 'revista cultural para público joven',
	},
	{
		image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80&auto=format&fit=crop',
		title: 'UX/UI app',
		description: 'interfaz para plataforma de música independiente',
	},
];

export default function HomePage() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent(prev => (prev + 1) % CAROUSEL_ITEMS.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div style={{ paddingTop: '56px', backgroundColor: '#FFF4E6', color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>

			{/* ── HERO ── */}
			<section style={{ padding: '0 7vw' }}>
				<div style={{ display: 'flex', minHeight: '440px' }}>

					{/* Imagen 55% */}
					<div style={{ position: 'relative', flex: '0 0 55%', overflow: 'hidden' }}>
						{CAROUSEL_ITEMS.map((ci, i) => (
							<div key={i} style={{
								position: 'absolute', inset: 0,
								backgroundImage: `url('${ci.image}')`,
								backgroundSize: 'cover', backgroundPosition: 'center',
								filter: 'grayscale(100%)',
								opacity: i === current ? 1 : 0,
								transition: 'opacity 1s ease',
							}} />
						))}
					</div>

					{/* Texto 45% alineado al fondo */}
					<div style={{
						flex: '0 0 45%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						paddingLeft: '3.5rem',
						paddingBottom: '2rem',
					}}>
						<div style={{ borderTop: '2px solid #182AE6', marginBottom: '1.5rem', width: '100%' }} />
						<h2 style={{
							fontFamily: 'LTCBroadway, serif',
							fontSize: 'clamp(2rem, 3vw, 3.2rem)',
							fontWeight: 400,
							lineHeight: 1.1,
							color: '#111111',
							margin: 0,
						}}>
							{CAROUSEL_ITEMS[current].title}
						</h2>
						<p style={{
							marginTop: '1rem',
							fontSize: '1.05rem',
							lineHeight: 1.6,
							color: '#111111',
							marginBottom: 0,
						}}>
							{CAROUSEL_ITEMS[current].description}
						</p>
					</div>

				</div>
			</section>

			{/* ── INDICADORES: cuadrados ── */}
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '0.75rem',
				padding: '1.25rem 0',
			}}>
				{CAROUSEL_ITEMS.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						aria-label={`Proyecto ${i + 1}`}
						style={{
							width: '20px',
							height: '20px',
							border: 'none',
							cursor: 'pointer',
							background: `rgba(24,42,230,${0.2 + i * 0.22})`,
							outline: i === current ? '2px solid #182AE6' : 'none',
							outlineOffset: '2px',
							transform: i === current ? 'scale(1.15)' : 'scale(1)',
							transition: 'all 0.3s',
							padding: 0,
							borderRadius: 0,
						}}
					/>
				))}
			</div>

			{/* Separador */}
			<div style={{ borderTop: '1px solid rgba(24,42,230,0.2)', margin: '0 7vw' }} />

			{/* ── BIO ── */}
			<section style={{ padding: '3.5rem 7vw 3rem' }}>
				<h2 style={{
					fontFamily: 'Satoshi, sans-serif',
					fontSize: '2.2rem',
					fontWeight: 900,
					color: '#111111',
					marginBottom: '1.5rem',
					marginTop: 0,
				}}>
					Hola :)
				</h2>
				<div style={{ maxWidth: '46%' }}>
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.1rem', marginTop: 0 }}>
						Soy Adriana Mercedes, y estudio segundo año de Gráfica Publicitaria aquí en Madrid.
					</p>
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.1rem', marginTop: 0 }}>
						El diseño me apasiona, lo veo como una forma de comunicar y de explorar. Me interesa crear elementos visuales que conecten con la gente, que cuenten relaciones y que transmitan emociones de forma clara y atractiva.
					</p>
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginTop: 0, marginBottom: 0 }}>
						Una parte importante de mi inspiración viene de viajar. Conocer sitios y culturas nuevas, y ver el mundo de distintas maneras, alimenta mi creatividad y se nota en mis diseños. Disfruto aprendiendo, probando cosas y abordando nuevos desafíos; siempre con ganas y curiosidad.
					</p>
				</div>
			</section>

			{/* ── AVENTURA + FOTO ── */}
			<section style={{
				padding: '2rem 7vw 3rem',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: 'auto auto',
				gap: '0 4vw',
			}}>
				{/* Foto — col 2, fila 1-2 */}
				<div style={{
					gridColumn: '2',
					gridRow: '1 / 3',
					position: 'relative',
					overflow: 'hidden',
					alignSelf: 'start',
				}}>
					<img
						src="public/adriana.jpg"
						alt="Adriana Mercedes"
						style={{ width: '100%', display: 'block', filter: 'grayscale(100%)' }}
					/>
					<div style={{
						position: 'absolute',
						inset: 0,
						background: 'rgba(24,42,230,0.55)',
						mixBlendMode: 'multiply',
					}} />
				</div>

				{/* Celda vacía fila 1 col 1 */}
				<div style={{ gridColumn: '1', gridRow: '1', minHeight: '60%' }} />

				{/* Título — fila 2 col 1 */}
				<div style={{ gridColumn: '1', gridRow: '2', alignSelf: 'end', paddingBottom: '1rem' }}>
					<h2 style={{
						fontFamily: 'LTCBroadway, serif',
						fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
						fontWeight: 400,
						lineHeight: 1.2,
						color: '#111111',
						margin: 0,
					}}>
						¿Quieres iniciar una aventura juntos?
					</h2>
				</div>
			</section>

			{/* ── SERVICIOS ── */}
			<section style={{ padding: '0 7vw 5rem' }}>
				<p style={{ fontSize: '1.05rem', marginBottom: '2rem', marginTop: 0 }}>Puedo ayudarte con:</p>
				<div style={{ maxWidth: '55%' }}>
					{[
						{
							title: 'Identidad de marca y branding',
							desc: 'Creo identidades visuales que representan la esencia de una marca. Desarrollo logotipos, paletas de color, tipografías y sistemas gráficos coherentes para que las marcas se comuniquen de forma clara, reconocible y consistente.',
						},
						{
							title: 'Diseño ux/ui',
							desc: 'Diseño experiencias digitales intuitivas y funcionales centradas en el usuario. Analizo necesidades, organizo la información y creo interfaces visuales claras para webs y aplicaciones, buscando siempre una navegación fluida y una experiencia agradable.',
						},
						{
							title: 'Diseño editorial',
							desc: 'Desarrollo piezas editoriales que combinan estética y claridad para comunicar contenidos de forma efectiva. Trabajo la maquetación, jerarquía visual y tipografía para crear revistas, libros, catálogos o publicaciones digitales atractivas y fáciles de leer.',
						},
					].map(({ title, desc }) => (
						<div key={title} style={{ marginBottom: '1.8rem' }}>
							<h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', marginTop: 0 }}>{title}</h3>
							<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginTop: 0, marginBottom: 0 }}>{desc}</p>
						</div>
					))}
				</div>
			</section>

			<div style={{ borderTop: '1px solid #D9CFC4' }} />
		</div>
	);
}