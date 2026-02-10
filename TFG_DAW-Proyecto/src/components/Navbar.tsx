import { useState } from 'react';

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 z-50">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					
					<a href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-black">
						<img src="/icono_negro.png" alt="AMG Logo" className="h-8 w-8 md:h-10 md:w-10" />
						AMG Graphics
					</a>
					
					<div className="hidden md:flex items-center space-x-8">
						<a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-house"></i> Inicio</a>
						
						<div className="relative">
							<button 
								onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
								className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
							>
								<i className="fa-solid fa-images"></i>  Galería
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{desktopDropdownOpen && (
								<div className="absolute bg-white shadow-lg rounded-md mt-2 py-2 w-48 z-50">
									<a href="/galeria/opcion1" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Opción 1</a>
									<a href="/galeria/opcion2" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Opción 2</a>
									<a href="/galeria/opcion3" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Opción 3</a>
								</div>
							)}
						</div>
						
						<a href="/contacto" className="text-gray-700 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-envelope"></i>  Contacto</a>
					
                        <a href="/login" className="text-gray-700 hover:text-indigo-600 transition-colors"><i className="fa-solid fa-arrow-right-to-bracket"></i>  Login</a>
                    </div>

					<button 
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden text-gray-700 focus:outline-none"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden pb-4">
						<a href="/" className="block py-2 text-gray-700 hover:text-indigo-600"><i className="fa-solid fa-house"></i>    Inicio</a>
						<div>
							<button 
								onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
								className="w-full text-left py-2 text-gray-700 hover:text-indigo-600 flex items-center gap-1"
							>
								<i className="fa-solid fa-images"></i>Galería
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{mobileDropdownOpen && (
								<div className="pl-4">
									<a href="/galeria/opcion1" className="block py-2 text-gray-600 hover:text-indigo-600">Opción 1</a>
									<a href="/galeria/opcion2" className="block py-2 text-gray-600 hover:text-indigo-600">Opción 2</a>
									<a href="/galeria/opcion3" className="block py-2 text-gray-600 hover:text-indigo-600">Opción 3</a>
								</div>
							)}
						</div>
						<a href="/contacto" className="block py-2 text-gray-700 hover:text-indigo-600"><i className="fa-solid fa-envelope"></i> Contacto</a>

                        <a href="/login" className="block py-2 text-gray-700 hover:text-indigo-600"><i className="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
					</div>
				)}
			</div>
		</nav>
	);
}
