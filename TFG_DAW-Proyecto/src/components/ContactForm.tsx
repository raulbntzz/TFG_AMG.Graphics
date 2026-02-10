import { useState } from 'react';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		correo: '',
		telefono: '',
		asunto: '',
		descripcion: ''
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			console.log('Datos del formulario:', formData);
			
			setFormData({
				nombre: '',
				apellido: '',
				correo: '',
				telefono: '',
				asunto: '',
				descripcion: ''
			});
		} catch (error) {
			console.error('Error al enviar:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-gray-200">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
							placeholder="Tu nombre"
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
							placeholder="Tu apellido"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-2">
							Correo Electrónico *
						</label>
						<input
							type="email"
							id="correo"
							name="correo"
							value={formData.correo}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
							placeholder="tu@email.com"
						/>
					</div>

					<div>
						<label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
							Número de Teléfono
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
				</div>

				<div>
					<label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-2">
						Asunto *
					</label>
					<input
						type="text"
						id="asunto"
						name="asunto"
						value={formData.asunto}
						onChange={handleChange}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition bg-white"
						placeholder="¿En qué puedo ayudarte?"
					/>
				</div>

				<div>
					<label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
						Descripción *
					</label>
					<textarea
						id="descripcion"
						name="descripcion"
						value={formData.descripcion}
						onChange={handleChange}
						required
						rows={3}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition resize-none bg-white"
						placeholder="Cuéntame más sobre tu proyecto o consulta..."
					></textarea>
				</div>

				<div className="pt-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
					</button>
				</div>
			</form>
		</section>
	);
}
