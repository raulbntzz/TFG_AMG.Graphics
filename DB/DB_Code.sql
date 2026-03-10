CREATE DATABASE TFG_AMG;
USE TFG_AMG;

CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    rol VARCHAR(50) DEFAULT 'usuario',
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    password VARCHAR(255)
);

CREATE TABLE mensajes_contacto (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    asunto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT GETDATE()
);

CREATE TABLE galeria (
    id INT IDENTITY(1,1) PRIMARY KEY,
    src VARCHAR(500) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    height INT DEFAULT 400
);

INSERT INTO galeria (src, categoria, title, description, height) VALUES
('/galeria/proyecto1.jpg', 'UI/UX', 'Proyecto 1', 'Diseño de interfaz moderna para aplicación móvil', 300),
('/galeria/proyecto2.jpg', 'Branding', 'Proyecto 2', 'Branding completo para empresa de tecnología', 500),
('/galeria/proyecto3.jpg', 'Ilustración', 'Proyecto 3', 'Ilustraciones digitales para campaña publicitaria', 250),
('/galeria/proyecto4.jpg', 'Web', 'Proyecto 4', 'Diseño web responsive con animaciones', 400),
('/galeria/proyecto5.jpg', 'Branding', 'Proyecto 5', 'Desarrollo de identidad visual corporativa', 350);

UPDATE usuarios
SET rol = 'admin'
WHERE id = 1;

drop table usuarios;

truncate table usuarios;

select * from usuarios;

select * from galeria;