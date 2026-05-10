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
    src NVARCHAR(500) NOT NULL,
    categoria NVARCHAR(200) NOT NULL,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(500) NOT NULL,
    descripcion_larga NVARCHAR(MAX) NULL,
    descripcion_larga_2 NVARCHAR(MAX) NULL,
    proyecto NVARCHAR(200) NULL,
    anio NVARCHAR(10) NULL,
    imagen_intermedia NVARCHAR(500) NULL,
    caption_intermedia NVARCHAR(500) NULL,
    imagenes_detalle NVARCHAR(MAX) NULL,
    caption_detalle_1 NVARCHAR(500) NULL,
    caption_detalle_2 NVARCHAR(500) NULL
);

UPDATE usuarios
SET rol = 'admin'
WHERE id = 1;

drop table galeria;

truncate table galeria;

select * from usuarios;

select * from galeria;