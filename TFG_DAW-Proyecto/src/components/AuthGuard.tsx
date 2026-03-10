import { useEffect } from 'react';

export default function AuthGuard() {
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			window.location.href = '/login';
		}
	}, []);

	return null;
}
