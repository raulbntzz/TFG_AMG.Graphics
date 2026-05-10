import { useState, useEffect } from 'react';

const CAROUSEL_ITEMS = [
	{ image: '../../public/repetir.jpg', title: 'Repetir está bien', description: 'campaña publicitaria sobre moda sostenible' },
	{ image: '../../public/nodo.jpg', title: 'Nodo', description: 'plataforma sobre talleres creativos' },
	{ image: '../../public/ribera.jpg', title: 'La ribera', description: 'identidad visual completa para un centro cultural' },
	{ image: '../../public/alcine.jpg', title: 'Alcine', description: 'cartel cinematográfico edición nº54' },
];

export default function HomePage() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setCurrent(prev => (prev + 1) % CAROUSEL_ITEMS.length), 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div style={{ paddingTop: '56px', backgroundColor: 'var(--bg)', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif' }}>

			<section style={{ padding: '0 7vw' }}>
				<div className="hero-layout">
					<div className="hero-image">
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
					<div className="hero-text">
						<div style={{ borderTop: '2px solid var(--accent)', marginBottom: '1.5rem', width: '100%' }} />
						<h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(2rem, 3vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--text)', margin: 0 }}>
							{CAROUSEL_ITEMS[current].title}
						</h2>
						<p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text)', marginBottom: 0 }}>
							{CAROUSEL_ITEMS[current].description}
						</p>
					</div>
				</div>
			</section>

			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 0' }}>
				{CAROUSEL_ITEMS.map((_, i) => (
					<button key={i} onClick={() => setCurrent(i)} aria-label={`Proyecto ${i + 1}`} style={{
						width: '20px', height: '20px', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 0,
						background: `rgba(var(--accent-rgb), ${0.2 + i * 0.22})`,
						outline: i === current ? '2px solid var(--accent)' : 'none',
						outlineOffset: '2px', transform: i === current ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.3s',
					}} />
				))}
			</div>

			<div style={{ borderTop: '2px solid var(--accent)', margin: '0 7vw' }} />

			<section style={{ padding: '3.5rem 7vw 0' }}>
				<h2 style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text)', marginBottom: '1.5rem', marginTop: 0 }}>Hola :)</h2>
				<div className="bio-text">
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.1rem', marginTop: 0 }}>Soy Adriana Mercedes, y estudio segundo año de Gráfica Publicitaria aquí en Madrid.</p>
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '1.1rem', marginTop: 0 }}>El diseño me apasiona, lo veo como una forma de comunicar y de explorar. Me interesa crear elementos visuales que conecten con la gente, que cuenten relaciones y que transmitan emociones de forma clara y atractiva.</p>
					<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginTop: 0, marginBottom: 0 }}>Una parte importante de mi inspiración viene de viajar. Conocer sitios y culturas nuevas, y ver el mundo de distintas maneras, alimenta mi creatividad y se nota en mis diseños. Disfruto aprendiendo, probando cosas y abordando nuevos desafíos; siempre con ganas y curiosidad.</p>
				</div>
			</section>

			<section className="aventura-grid">
				<div style={{ paddingBottom: '1rem' }}>
					<h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', fontWeight: 400, lineHeight: 1.2, color: 'var(--text)', margin: 0 }}>¿Quieres iniciar una aventura juntos?</h2>
				</div>
				<div style={{ position: 'relative', overflow: 'hidden' }}>
					<img src="public/adriana.png" alt="Adriana Mercedes" style={{ width: '100%', display: 'block'}} />
					<div style={{ position: 'absolute', inset: 0, background: `rgba(var(--accent-rgb), 0.5)`, mixBlendMode: 'multiply' }} />
				</div>
			</section>

			<section style={{ padding: '0 7vw 5rem' }}>
				<p style={{ fontSize: '1.05rem', marginBottom: '2rem', marginTop: 0 }}>Puedo ayudarte con:</p>
				<div className="servicios-inner">
					{[
						{ title: 'Identidad de marca y branding', desc: 'Creo identidades visuales que representan la esencia de una marca. Desarrollo logotipos, paletas de color, tipografías y sistemas gráficos coherentes para que las marcas se comuniquen de forma clara, reconocible y consistente.' },
						{ title: 'Diseño ux/ui', desc: 'Diseño experiencias digitales intuitivas y funcionales centradas en el usuario. Analizo necesidades, organizo la información y creo interfaces visuales claras para webs y aplicaciones, buscando siempre una navegación fluida y una experiencia agradable.' },
						{ title: 'Diseño editorial', desc: 'Desarrollo piezas editoriales que combinan estética y claridad para comunicar contenidos de forma efectiva. Trabajo la maquetación, jerarquía visual y tipografía para crear revistas, libros, catálogos o publicaciones digitales atractivas y fáciles de leer.' },
					].map(({ title, desc }) => (
						<div key={title} style={{ marginBottom: '1.8rem' }}>
							<h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', marginTop: 0, color: 'var(--text)' }}>{title}</h3>
							<p style={{ fontSize: '1.05rem', lineHeight: 1.75, marginTop: 0, marginBottom: 0 }}>{desc}</p>
						</div>
					))}
				</div>
			</section>

			<div style={{ borderTop: '1px solid var(--border)' }} />
		</div>
	);
}