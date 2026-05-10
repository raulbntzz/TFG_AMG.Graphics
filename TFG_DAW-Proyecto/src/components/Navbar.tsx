import { useState, useEffect } from 'react';

export default function Navbar() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [userOpen, setUserOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [nombreUsuario, setNombreUsuario] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [currentPath, setCurrentPath] = useState('');
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		setCurrentPath(window.location.pathname);
		const token = localStorage.getItem('token');
		const usuario = localStorage.getItem('usuario');
		setIsLoggedIn(!!token);
		if (usuario) {
			const parsed = JSON.parse(usuario);
			setNombreUsuario(parsed.nombre || '');
			setIsAdmin(parsed.rol === 'admin');
		}
		const saved = localStorage.getItem('darkMode');
		if (saved === 'true') { setDarkMode(true); document.documentElement.classList.add('dark'); }
	}, []);

	const toggleDark = () => {
		const next = !darkMode;
		setDarkMode(next);
		localStorage.setItem('darkMode', String(next));
		document.documentElement.classList.toggle('dark', next);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		window.location.href = '/';
	};

	const isActive = (path: string) => currentPath === path;

	const linkStyle = (path?: string): React.CSSProperties => ({
		color: 'var(--accent)', fontFamily: 'Satoshi, sans-serif',
		fontWeight: path && isActive(path) ? '700' : '400',
		fontSize: '14px', textDecoration: 'none',
		background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
	});

	const DarkToggle = () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<button onClick={() => { if (darkMode) toggleDark(); }} title="Modo claro"
				style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', opacity: darkMode ? 0.4 : 1, transition: 'opacity 0.2s' }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)">
					<path d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 18zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM18 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0118 12zM6.166 5.106a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM15.712 15.712a.75.75 0 011.061 0l1.06 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM5.106 17.834a.75.75 0 010-1.06l1.06-1.061a.75.75 0 011.061 1.06l-1.06 1.061a.75.75 0 01-1.061 0zM15.712 8.288a.75.75 0 010-1.061l1.06-1.06a.75.75 0 011.061 1.06l-1.06 1.061a.75.75 0 01-1.061 0zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z"/>
				</svg>
			</button>
			<button onClick={() => { if (!darkMode) toggleDark(); }} title="Modo oscuro"
				style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', opacity: darkMode ? 1 : 0.4, transition: 'opacity 0.2s' }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)">
					<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
				</svg>
			</button>
		</div>
	);

	return (
		<>
			<nav style={{
				position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
				background: 'var(--navbar-bg)', height: '48px',
				display: 'flex', alignItems: 'center',
				paddingLeft: '2.5vw', paddingRight: '2.5vw',
				borderBottom: '1px solid var(--border)',
			}}>
				<a href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
					<img src={darkMode ? '/icono_oscuro.png' : '/icono_claro.png'} alt="AMG Logo" style={{ height: '32px', width: 'auto' }} />
				</a>

				{/* Desktop */}
				<div className="navbar-desktop hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
					<a href="/home" style={linkStyle('/home')}>Inicio</a>
					<a href="/galeria" style={linkStyle('/galeria')}>Galeria</a>
					<a href="/contacto" style={linkStyle('/contacto')}>Contacto</a>
					{isAdmin && <a href="/admin" style={linkStyle('/admin')}>Gestionar</a>}

					{isLoggedIn ? (
						<div style={{ position: 'relative' }}>
							<button onClick={() => setUserOpen(!userOpen)} style={{ ...linkStyle(), display: 'flex', alignItems: 'center', gap: '5px' }}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
								</svg>
								{nombreUsuario}
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px' }}>
									<path d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{userOpen && (
								<div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'var(--bg)', border: '1px solid var(--border)', padding: '4px 0', width: '160px', zIndex: 50 }}>
									<button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 16px', color: 'var(--accent)', fontFamily: 'Satoshi, sans-serif', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
										Cerrar sesión
									</button>
								</div>
							)}
						</div>
					) : (
						<a href="/login" style={linkStyle('/login')}>Login</a>
					)}
					<DarkToggle />
				</div>

				{/* Mobile right side */}
				<div className="navbar-hamburger" style={{alignItems: 'center', gap: '1rem' }}>
					<DarkToggle />
					<button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
							{mobileOpen ? (
								<><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
							) : (
								<><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>
							)}
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			<div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
				<a href="/home" style={linkStyle('/home')} onClick={() => setMobileOpen(false)}>Inicio</a>
				<a href="/galeria" style={linkStyle('/galeria')} onClick={() => setMobileOpen(false)}>Galeria</a>
				<a href="/contacto" style={linkStyle('/contacto')} onClick={() => setMobileOpen(false)}>Contacto</a>
				{isAdmin && <a href="/admin" style={linkStyle('/admin')} onClick={() => setMobileOpen(false)}>Gestionar</a>}
				{isLoggedIn ? (
					<button onClick={handleLogout} style={{ ...linkStyle(), textAlign: 'left' }}>Cerrar sesión ({nombreUsuario})</button>
				) : (
					<a href="/login" style={linkStyle('/login')} onClick={() => setMobileOpen(false)}>Login</a>
				)}
			</div>
		</>
	);
}