import { useState } from 'react';

const API_URL = 'http://localhost:5047';

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');
		setSuccess('');

		try {
			const res = await fetch(`${API_URL}/api/usuarios/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				const data = await res.json();
				setError(data.message || 'Credenciales incorrectas');
				return;
			}

			const data = await res.json();
			localStorage.setItem('token', data.token);
			localStorage.setItem('usuario', JSON.stringify(data.usuario));
			setSuccess('Sesión iniciada correctamente');
			setTimeout(() => { window.location.href = '/home'; }, 800);
		} catch (err) {
			setError('Correo o contraseña incorrectos');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-gray-200 max-w-md w-full">
			<div className="mb-8 text-center">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
						Correo Electrónico *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
						placeholder="tu@email.com"
					/>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
						Contraseña *
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
						placeholder="••••••••"
					/>
				</div>

				{error && (
					<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
						{error}
					</div>
				)}

				{success && (
					<div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-200">
						{success}
					</div>
				)}

				<div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
					</button>
				</div>
			</form>

			<p className="text-center text-sm text-gray-500 mt-6">
				¿No tienes cuenta?{' '}
				<a href="/registro" className="text-gray-900 font-semibold hover:underline">
					Regístrate
				</a>
			</p>
		</section>
	);
}
