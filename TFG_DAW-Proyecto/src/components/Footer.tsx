export default function Footer() {
	return (
		<>
			<div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', height: '1px' }} />
			<footer style={{ background: 'var(--bg)', padding: '2.5rem 7vw 2rem' }}>
				<h2 style={{ fontFamily: 'LTCBroadway, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, color: 'var(--text)', margin: '0 0 2rem 0' }}>
					Tu idea, mi trazo
				</h2>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 4rem' }}>
					<div>
						<p style={{ color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', margin: '0 0 0.2rem' }}>Siempre disponible!</p>
						<p style={{ color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontWeight: 700, margin: 0 }}>adriana.m.graphic@gmail.com</p>
					</div>
					<div>
						<p style={{ color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', margin: '0 0 0.2rem' }}>Encuéntrame en:</p>
						<p style={{ color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', fontWeight: 700, margin: 0 }}>Instagram</p>
					</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
					<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						style={{ color: 'var(--text)', fontFamily: 'Satoshi, sans-serif', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
						Scroll to top
					</button>
				</div>
			</footer>
		</>
	);
}