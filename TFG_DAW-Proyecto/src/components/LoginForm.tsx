import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5047';
const CAROUSEL_IMAGES = [
	'../../public/nodo.jpg',
	'../../public/alcine.jpg',
	'../../public/ribera.jpg',
	'../../public/umbral.jpg',
	'../../public/repetir.jpg',
];

export default function LoginForm() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % CAROUSEL_IMAGES.length), 5000);
		return () => clearInterval(timer);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true); setError(''); setSuccess('');
		try {
			const res = await fetch(`${API_URL}/api/usuarios/login`, {
				method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
			});
			if (!res.ok) { const data = await res.json(); setError(data.message || 'Credenciales incorrectas'); return; }
			const data = await res.json();
			localStorage.setItem('token', data.token);
			localStorage.setItem('usuario', JSON.stringify(data.usuario));
			setSuccess('Sesión iniciada correctamente');
			setTimeout(() => { window.location.href = '/home'; }, 800);
		} catch { setError('Correo o contraseña incorrectos'); }
		finally { setIsSubmitting(false); }
	};

	return (
		<div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '100vh' }}>
			{CAROUSEL_IMAGES.map((img, i) => (
				<div key={i} style={{
					position: 'absolute', inset: 0, backgroundImage: `url('${img}')`,
					backgroundSize: 'cover', backgroundPosition: 'center',
					filter: 'grayscale(100%)', opacity: i === currentSlide ? 1 : 0, transition: 'opacity 1s',
				}} />
			))}
			<div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

			<div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '560px', margin: '5rem 1rem', padding: '2.5rem 2rem', background: 'var(--overlay-login)', backdropFilter: 'blur(3px)' }}>
				<h1 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, lineHeight: 1, color: 'var(--text)', margin: '0 0 2rem' }}>
					Iniciar sesión
				</h1>

				<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
					<div>
						<label style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif' }}>Correo electrónico*</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} required
							style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
							onFocus={e => e.target.style.borderColor = 'var(--accent)'}
							onBlur={e => e.target.style.borderColor = 'var(--border)'} />
					</div>
					<div>
						<label style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif' }}>Contraseña*</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} required
							style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
							onFocus={e => e.target.style.borderColor = 'var(--accent)'}
							onBlur={e => e.target.style.borderColor = 'var(--border)'} />
					</div>

					{error && <p style={{ color: '#c0392b', background: '#fff0ee', border: '1px solid #f5c6c2', padding: '0.75rem', fontSize: '0.9rem', margin: 0 }}>{error}</p>}
					{success && <p style={{ color: '#1a7f4b', background: '#edfaf3', border: '1px solid #b7efd0', padding: '0.75rem', fontSize: '0.9rem', margin: 0 }}>{success}</p>}

					<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
						<button type="submit" disabled={isSubmitting}
							style={{ background: 'var(--btn-bg)', color: 'var(--btn-text)', border: 'none', padding: '0.75rem 2.5rem', fontFamily: 'Satoshi, sans-serif', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1 }}>
							{isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
						</button>
					</div>
				</form>

				<p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '1.5rem', color: 'var(--text)', fontFamily: 'Satoshi, sans-serif' }}>
					¿No tienes cuenta?{' '}
					<a href="/registro" style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'underline' }}>Regístrate</a>
				</p>
			</div>

			<div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1rem', zIndex: 10, background: 'var(--overlay-bar)' }}>
				{CAROUSEL_IMAGES.map((_, i) => (
					<button key={i} onClick={() => setCurrentSlide(i)} style={{
						width: '18px', height: '18px', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 0,
						background: `rgba(var(--accent-rgb), ${0.2 + i * 0.2})`,
						outline: i === currentSlide ? '2px solid var(--accent)' : 'none',
						outlineOffset: '2px', transform: i === currentSlide ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.3s',
					}} />
				))}
			</div>
		</div>
	);
}