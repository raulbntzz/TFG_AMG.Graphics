import { useEffect, useState } from 'react';

interface Usuario {
	id?: number;
	nombre: string;
	email: string;
	rol?: string;
}

interface AuthState {
	token: string | null;
	usuario: Usuario | null;
	isAdmin: boolean;
}

export function useAuth(): AuthState {
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		usuario: null,
		isAdmin: false,
	});

	useEffect(() => {
		const token = localStorage.getItem('token');
		const usuarioStr = localStorage.getItem('usuario');
		
		if (token && usuarioStr) {
			const usuario = JSON.parse(usuarioStr);
			setAuthState({
				token,
				usuario,
				isAdmin: usuario.rol === 'admin',
			});
		}
	}, []);

	return authState;
}
