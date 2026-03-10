import { useState } from 'react';

const API_URL = 'http://localhost:5047';

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
		password: '',
		confirmPassword: '',
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
					nombre: formData.nombre,
					apellido: formData.apellido,
					email: formData.email,
					telefono: formData.telefono,
					password: formData.password,
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				setError(data.message || 'Error al crear la cuenta');
				return;
			}

			setSuccess('Cuenta creada correctamente. Redirigiendo al login...');
			setFormData({ nombre: '', apellido: '', email: '', telefono: '', password: '', confirmPassword: '' });
			setTimeout(() => { window.location.href = '/login'; }, 800);
		} catch (err) {
			setError('No se pudo conectar con el servidor');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-gray-200 max-w-md w-full">
			<div className="mb-8 text-center">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
							Nombre *
						</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
							placeholder="Adriana"
						/>
					</div>
					<div>
						<label htmlFor="apellido" className="block text-sm font-semibold text-gray-700 mb-2">
							Apellido *
						</label>
						<input
							type="text"
							id="apellido"
							name="apellido"
							value={formData.apellido}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
							placeholder="García"
						/>
					</div>
				</div>

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
					<label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
						Teléfono
					</label>
					<input
						type="tel"
						id="telefono"
						name="telefono"
						value={formData.telefono}
						onChange={handleChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
						placeholder="+34 600 000 000"
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

				<div>
					<label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
						Confirmar Contraseña *
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
						placeholder="••••••••"
					/>
				</div>

				{error && (
					<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
						{error}
					</p>
				)}

				{success && (
					<p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
						{success}
					</p>
				)}

				<div className="pt-2">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
					</button>
				</div>
			</form>

			<p className="text-center text-sm text-gray-500 mt-6">
				¿Ya tienes cuenta?{' '}
				<a href="/login" className="text-gray-900 font-semibold hover:underline">
					Inicia sesión
				</a>
			</p>
		</section>
	);
}
