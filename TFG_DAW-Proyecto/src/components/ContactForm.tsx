import { useState } from 'react';

const API_URL = 'http://localhost:5047';
const BLUE = '#182AE6';
const CREAM = '#FFF4E6';

const inputStyle: React.CSSProperties = {
	width: '100%',
	background: 'transparent',
	border: 'none',
	borderBottom: '1px solid #111111',
	outline: 'none',
	fontFamily: 'Satoshi, sans-serif',
	fontSize: '1rem',
	color: '#111111',
	padding: '0.4rem 0',
	marginTop: '0.5rem',
	marginBottom: '1.8rem',
	boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
	fontFamily: 'Satoshi, sans-serif',
	fontSize: '1rem',
	color: '#111111',
};

const btnStyle = (primary: boolean): React.CSSProperties => ({
	background: primary ? BLUE : BLUE,
	color: '#fff',
	fontFamily: 'Satoshi, sans-serif',
	fontSize: '0.9rem',
	fontWeight: 500,
	border: 'none',
	padding: '0.55rem 1.4rem',
	cursor: 'pointer',
	letterSpacing: '0.01em',
});

export default function ContactForm() {
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		correo: '',
		telefono: '',
		asunto: '',
		descripcion: '',
	});
	const [acepto, setAcepto] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleReset = () => {
		setFormData({ nombre: '', apellido: '', correo: '', telefono: '', asunto: '', descripcion: '' });
		setAcepto(false);
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!acepto) { setError('Debes aceptar los términos y condiciones.'); return; }
		setIsSubmitting(true);
		setError('');
		setSuccess('');
		try {
			const res = await fetch(`${API_URL}/api/mensajescontacto`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			if (!res.ok) {
				const data = await res.json();
				setError(data.message || 'Error al enviar el mensaje');
				return;
			}
			setSuccess('Mensaje enviado correctamente. Pronto me pondré en contacto.');
			handleReset();
		} catch {
			setError('No se pudo conectar con el servidor');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div style={{ backgroundColor: CREAM, color: '#111111', fontFamily: 'Satoshi, sans-serif', paddingTop: '56px' }}>

			{/* ── TOP SECTION: image left + contact info right ── */}
			<section style={{ padding: '3rem 7vw 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 4vw', alignItems: 'start' }}>

				{/* Image */}
				<div style={{ overflow: 'hidden' }}>
					<img
						src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80&auto=format&fit=crop"
						alt="Contacto"
						style={{ width: '100%', display: 'block', filter: 'grayscale(100%)' }}
					/>
				</div>

				{/* Contact info */}
				<div style={{ paddingTop: '0.5rem' }}>
					<h1 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: '#111111', margin: '0 0 0.3rem' }}>
						Contáctame
					</h1>
					<p style={{ fontSize: '1rem', color: '#111111', margin: '0 0 0.5rem' }}>por:</p>
					<div style={{ borderTop: `2px solid ${BLUE}`, marginBottom: '1.8rem', width: '60%' }} />

					{[
						{ label: 'Instagram', value: 'amg.graphic_' },
						{ label: 'Correo', value: 'adriana.m.graphic@gmail.com' },
						{ label: 'Linkedin', value: 'amg.graphic_' },
						{ label: 'Behance', value: 'amg.graphic_' },
					].map(({ label, value }) => (
						<p key={label} style={{ fontSize: '1rem', color: '#111111', margin: '0 0 0.55rem', fontFamily: 'Satoshi, sans-serif' }}>
							{label}&nbsp;&nbsp;<em>{value}</em>
						</p>
					))}

					<p style={{ fontSize: '1.1rem', color: '#111111', marginTop: '1.8rem', fontFamily: 'Satoshi, sans-serif' }}>
						+34 600 00 00 00
					</p>
				</div>
			</section>

			{/* Separador */}
			<div style={{ borderTop: '1px solid #D9CFC4', margin: '2.5rem 7vw 0' }} />

			{/* ── FORM SECTION ── */}
			<section style={{ padding: '3rem 7vw 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 4vw', alignItems: 'start' }}>

				{/* Left: tagline */}
				<div style={{ minWidth: 0 }}>
					<h2 style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', fontWeight: 400, lineHeight: 1.3, color: '#111111', margin: 0 }}>
						Si tienes un proyecto en mente y crees que puedo aportar, estaré <strong style={{ fontWeight: 900 }}>encantada</strong> de <strong style={{ fontWeight: 900 }}>escucharte.</strong>
					</h2>
				</div>

				{/* Right: form */}
				<div style={{ minWidth: 0 }}>
					<form onSubmit={handleSubmit}>

						<label style={labelStyle}>Nombre y apellidos*</label>
						<input
							type="text"
							name="nombre"
							value={formData.nombre}
							onChange={handleChange}
							required
							style={inputStyle}
						/>

						<label style={labelStyle}>Correo electrónico*</label>
						<input
							type="email"
							name="correo"
							value={formData.correo}
							onChange={handleChange}
							required
							style={inputStyle}
						/>

						<label style={labelStyle}>Cuéntame tu proyecto</label>
						<textarea
							name="descripcion"
							value={formData.descripcion}
							onChange={handleChange}
							rows={8}
							style={{
								width: '100%',
								boxSizing: 'border-box',
								background: 'transparent',
								border: '1px solid #111111',
								outline: 'none',
								fontFamily: 'Satoshi, sans-serif',
								fontSize: '1rem',
								color: '#111111',
								padding: '0.6rem',
								marginTop: '0.5rem',
								marginBottom: '1.5rem',
								resize: 'none',
								minHeight: '160px',
								display: 'block',
							}}
						/>

						{/* Checkbox */}
						<div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1.8rem' }}>
							<input
								type="checkbox"
								id="acepto"
								checked={acepto}
								onChange={e => setAcepto(e.target.checked)}
								style={{ marginTop: '3px', accentColor: BLUE, cursor: 'pointer', width: '16px', height: '16px', flexShrink: 0 }}
							/>
							<label htmlFor="acepto" style={{ ...labelStyle, fontSize: '0.95rem', cursor: 'pointer' }}>
								Acepto los términos y condiciones de privacidad
							</label>
						</div>

						{error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
						{success && <p style={{ color: 'green', fontSize: '0.9rem', marginBottom: '1rem' }}>{success}</p>}

						{/* Buttons */}
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<button type="button" onClick={handleReset} style={{ ...btnStyle(false), background: BLUE }}>
								Borrar
							</button>
							<button type="submit" disabled={isSubmitting} style={{ ...btnStyle(true), opacity: isSubmitting ? 0.6 : 1 }}>
								{isSubmitting ? 'Enviando...' : 'Enviar'}
							</button>
						</div>

					</form>
				</div>
			</section>
		</div>
	);
}