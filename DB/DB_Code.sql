USE TFG_AMG;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE mensajes_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    asunto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    src VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    height INT DEFAULT 400
);

INSERT INTO galeria (src, title, description, height) VALUES
('/galeria/proyecto1.jpg', 'Proyecto 1', 'Diseño de interfaz moderna para aplicación móvil', 300),
('/galeria/proyecto2.jpg', 'Proyecto 2', 'Branding completo para empresa de tecnología', 500),
('/galeria/proyecto3.jpg', 'Proyecto 3', 'Ilustraciones digitales para campaña publicitaria', 250),
('/galeria/proyecto4.jpg', 'Proyecto 4', 'Diseño web responsive con animaciones', 400),
('/galeria/proyecto5.jpg', 'Proyecto 5', 'Desarrollo de identidad visual corporativa', 350);