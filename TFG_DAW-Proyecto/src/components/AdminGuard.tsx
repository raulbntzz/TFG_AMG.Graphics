import { useEffect, useState } from 'react';

export default function AdminGuard() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const usuario = localStorage.getItem('usuario');
		if (usuario) {
			try {
				const parsed = JSON.parse(usuario);
				if (parsed.rol !== 'admin') {
					window.location.href = '/';
				}
			} catch {
				window.location.href = '/';
			}
		} else {
			window.location.href = '/';
		}
		setIsLoading(false);
	}, []);

	if (isLoading) return null;
	return null;
}
