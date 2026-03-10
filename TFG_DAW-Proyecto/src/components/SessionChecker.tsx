import { useEffect } from 'react';

export default function SessionChecker() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    if (token && usuario) {
      // Sesión iniciada -> ir a home
      window.location.href = '/home';
    } else {
      // No hay sesión -> ir a login
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <i className="fa-solid fa-circle-notch fa-spin text-4xl text-indigo-600 mb-4"></i>
      <p className="text-gray-600 font-medium">Verificando sesión...</p>
    </div>
  );
}
