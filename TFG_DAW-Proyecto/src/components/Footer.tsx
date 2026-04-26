export default function Footer() {
	return (
		<>
			<div style={{ background: '#FFF4E6', borderTop: '1px solid #D9CFC4' }} className="h-px" />

			<footer style={{ background: '#FFF4E6' }} className="px-8 md:px-16 pt-10 pb-8">
				<h2
					className="text-5xl md:text-7xl font-black mb-12"
					style={{ fontFamily: "'LTC Broadway', 'Broadway', 'Georgia', serif", color: '#111111' }}
				>
					Tu idea, mi trazo
				</h2>
				<div className="flex flex-col md:flex-row gap-6 md:gap-32">
					<div>
						<p style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }} className="text-sm">Siempre disponible!</p>
						<p style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }} className="font-bold">adriana.m.graphic@gmail.com</p>
					</div>
					<div>
						<p style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }} className="text-sm">Encuéntrame en:</p>
						<p style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }} className="font-bold">Instagram</p>
					</div>
				</div>
				<div className="flex justify-end mt-8">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						style={{ color: '#111111', fontFamily: 'Satoshi, sans-serif' }}
						className="text-sm font-semibold hover:underline"
					>
						Scroll to top
					</button>
				</div>
			</footer>
		</>
	);
}