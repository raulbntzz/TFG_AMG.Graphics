import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5047';
const BLUE = '#182AE6';
const CREAM = '#FFF4E6';

// Reemplaza por tus imágenes en /public/
const CAROUSEL_IMAGES = [
	'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&q=80&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=1600&q=80&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80&auto=format&fit=crop',
];

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		nombre: '', apellido: '', email: '', telefono: '', password: '', confirmPassword: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % CAROUSEL_IMAGES.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (formData.password !== formData.confirmPassword) {
			setError('Las contraseñas no coinciden');
			return;
		}
		setIsSubmitting(true);
		try {
			const res = await fetch(`${API_URL}/api/usuarios/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nombre: formData.nombre, apellido: formData.apellido,
					email: formData.email, telefono: formData.telefono, password: formData.password,
				}),
			});
			if (!res.ok) {
				const data = await res.json();
				setError(data.message || 'Error al crear la cuenta');
				return;
			}
			setSuccess('Cuenta creada correctamente. Redirigiendo...');
			setFormData({ nombre: '', apellido: '', email: '', telefono: '', password: '', confirmPassword: '' });
			setTimeout(() => { window.location.href = '/login'; }, 800);
		} catch {
			setError('No se pudo conectar con el servidor');
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputStyle: React.CSSProperties = {
		background: CREAM,
		borderColor: '#D9CFC4',
		fontFamily: 'Satoshi, sans-serif',
		color: '#111111',
	};

	return (
		<div className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
			{CAROUSEL_IMAGES.map((img, i) => (
				<div
					key={i}
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
					style={{ backgroundImage: `url('${img}')`, filter: 'grayscale(100%)', opacity: i === currentSlide ? 1 : 0 }}
				/>
			))}
			<div className="absolute inset-0 bg-black/25" />

			{/* Formulario */}
			<div
				className="relative z-10 w-full max-w-xl mx-4 my-20 py-10 px-10 md:px-14"
				style={{ background: 'rgba(255, 244, 230, 0.82)', backdropFilter: 'blur(3px)' }}
			>
				<div className="mb-8 text-center">
					<h1
						className="text-4xl md:text-5xl font-black leading-tight"
						style={{ fontFamily: "'LTC Broadway', 'Broadway', 'Georgia', serif", color: '#111111' }}
					>
						Crear cuenta
					</h1>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Nombre*</label>
							<input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required
								className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
								onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
						</div>
						<div>
							<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Apellido*</label>
							<input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required
								className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
								onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
						</div>
					</div>
					<div>
						<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Correo electrónico*</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} required
							className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
							onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
					</div>
					<div>
						<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Teléfono</label>
						<input type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
							className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
							onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
					</div>
					<div>
						<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Contraseña*</label>
						<input type="password" name="password" value={formData.password} onChange={handleChange} required
							className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
							onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
					</div>
					<div>
						<label className="block text-sm mb-1.5" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>Confirmar contraseña*</label>
						<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
							className="w-full px-4 py-4 border outline-none transition-colors" style={inputStyle}
							onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = '#D9CFC4'} />
					</div>

					{error && <p className="text-sm px-4 py-3 border" style={{ color: '#c0392b', background: '#fff0ee', borderColor: '#f5c6c2', fontFamily: 'Satoshi, sans-serif' }}>{error}</p>}
					{success && <p className="text-sm px-4 py-3 border" style={{ color: '#1a7f4b', background: '#edfaf3', borderColor: '#b7efd0', fontFamily: 'Satoshi, sans-serif' }}>{success}</p>}

					<div className="flex justify-center pt-2">
						<button
							type="submit" disabled={isSubmitting}
							className="px-10 py-3 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
							style={{ background: BLUE, color: '#fff', fontFamily: 'Satoshi, sans-serif' }}
						>
							{isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
						</button>
					</div>
				</form>

				<p className="text-center text-sm mt-6" style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}>
					¿Ya tienes cuenta?{' '}
					<a href="/login" className="font-bold underline underline-offset-2" style={{ color: '#111111' }}>Inicia sesión</a>
				</p>
			</div>

			{/* Indicadores del carrusel */}
			<div
				className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 py-5 z-10"
				style={{ background: 'rgba(255,244,230,0.88)' }}
			>
				{CAROUSEL_IMAGES.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentSlide(i)}
						className="w-5 h-5 transition-all duration-300 focus:outline-none"
						style={{
							background: `rgba(24, 42, 230, ${0.2 + i * 0.2})`,
							outline: i === currentSlide ? `2px solid ${BLUE}` : 'none',
							outlineOffset: '2px',
							transform: i === currentSlide ? 'scale(1.15)' : 'scale(1)',
						}}
						aria-label={`Imagen ${i + 1}`}
					/>
				))}
			</div>
		</div>
	);
}