-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2024 a las 18:57:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bbdd_antares`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(100) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `id_direccion` int(11) NOT NULL,
  `nombre_calle` varchar(100) NOT NULL,
  `altura_calle` int(11) NOT NULL,
  `numero_departamento` int(11) DEFAULT NULL,
  `numero_piso` int(11) DEFAULT NULL,
  `codigo_postal` varchar(100) DEFAULT NULL,
  `descripcion_direccion` varchar(255) DEFAULT NULL,
  `id_localidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades_medicas`
--

CREATE TABLE `especialidades_medicas` (
  `id_especialidad_medica` int(11) NOT NULL,
  `nombre_especialidad_med` varchar(200) NOT NULL,
  `descripcion_especialidad_med` text NOT NULL,
  `fecha_alta_especialidad_med` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagen_especialidad_med` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades_medicas`
--

INSERT INTO `especialidades_medicas` (`id_especialidad_medica`, `nombre_especialidad_med`, `descripcion_especialidad_med`, `fecha_alta_especialidad_med`, `imagen_especialidad_med`) VALUES
(1, 'Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio', '2024-10-20 05:43:16', NULL),
(2, 'Cirugía Cardiovascular', 'Intervenciones quirúrgicas en el corazón y los vasos sanguíneos.', '2024-10-20 15:17:28', NULL),
(4, 'Pediatria', 'Ayuda a la salud de los niños', '2024-11-05 23:25:00', './uploads/Captura de pantalla 2024-10-31 010554.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `nombre_estado`) VALUES
(1, 'Barinas'),
(2, 'Mérida'),
(5, 'Amazonas'),
(6, 'Anzoátegui'),
(7, 'Apure'),
(8, 'Aragua'),
(9, 'Bolívar'),
(10, 'Carabobo'),
(11, 'Cojedes'),
(12, 'Delta Amacuro'),
(13, 'Distrito Capital'),
(14, 'Falcón'),
(15, 'Guárico'),
(16, 'Lara'),
(17, 'Miranda'),
(18, 'Monagas'),
(19, 'Nueva Esparta'),
(20, 'Portuguesa'),
(21, 'Sucre'),
(22, 'Táchira'),
(23, 'Trujillo'),
(24, 'Vargas'),
(25, 'Yaracuy'),
(26, 'Zulia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `form_contactos`
--

CREATE TABLE `form_contactos` (
  `id_contacto` int(11) NOT NULL,
  `nombre_cont` varchar(100) NOT NULL,
  `email_cont` varchar(100) NOT NULL,
  `telefono_cont` varchar(20) DEFAULT NULL,
  `mensaje_contacto` text DEFAULT NULL,
  `fecha_registro_contacto` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int(11) NOT NULL,
  `nombre_genero` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `nombre_genero`) VALUES
(1, 'Femenino'),
(2, 'Masculino'),
(3, 'No Binario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_sanguineos`
--

CREATE TABLE `grupos_sanguineos` (
  `id_grupo_sanguineo` int(11) NOT NULL,
  `tipo_grupo_sanguineo` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitos_salud`
--

CREATE TABLE `habitos_salud` (
  `id_habito` int(11) NOT NULL,
  `fumador` tinyint(1) NOT NULL,
  `alcohol` tinyint(1) NOT NULL,
  `ejercicio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias_clinicas`
--

CREATE TABLE `historias_clinicas` (
  `id_historia_clinica` int(11) NOT NULL,
  `id_habito` int(11) DEFAULT NULL,
  `peso` double NOT NULL,
  `estatura` double NOT NULL,
  `id_grupo_sanguineo` int(11) DEFAULT NULL,
  `antecedentes_medicos` text DEFAULT NULL,
  `antecedentes_familiares` text DEFAULT NULL,
  `enfermedades_actuales` text DEFAULT NULL,
  `intervenciones_quirujicas` text DEFAULT NULL,
  `tratamientos_previos` text DEFAULT NULL,
  `medicacion_actual` text DEFAULT NULL,
  `fecha_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `id_localidad` int(11) NOT NULL,
  `nombre_localidad` varchar(100) NOT NULL,
  `id_ciudad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_usuario` int(11) NOT NULL,
  `codigo_medico` varchar(255) NOT NULL,
  `biografia_medico` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_usuario`, `codigo_medico`, `biografia_medico`) VALUES
(25, 'MED123457', 'La Dra. Maria Fernandez es una especialista en gastroenterologia con más de 10 años de experiencia.'),
(26, 'MED1234457', 'La Dra. Keren Cururo es una especialista en psicologia con más de 10 años de experiencia.'),
(27, 'none', 'none'),
(28, 'none', 'none'),
(31, 'none', 'none'),
(32, 'none', 'none'),
(36, 'none', 'none');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_especialidades`
--

CREATE TABLE `medicos_especialidades` (
  `id_medico_especialidad` int(11) NOT NULL,
  `id_especialidad_medica` int(11) NOT NULL,
  `fecha_experiencia` date NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_usuario` int(11) DEFAULT NULL,
  `id_historia_clinica` int(11) DEFAULT NULL,
  `nombre_contacto_emerg` varchar(150) DEFAULT NULL,
  `telefono_contacto_emerg` varchar(20) DEFAULT NULL,
  `seguro_medico` text DEFAULT NULL,
  `domicilio_paciente` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `apellido_usuario` varchar(160) NOT NULL,
  `documento_id` int(11) NOT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `id_direccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id_registro` int(11) NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `password` varchar(150) NOT NULL,
  `auth` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`id_registro`, `correo_electronico`, `password`, `auth`) VALUES
(1, 'persona.ficticia@example.com', '783021', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion_rol` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion_rol`) VALUES
(1, 'paciente', 'los pacientes pueden registrarse en el sistema, dar de alta turnos y editar su perfil medico y sus datos personales '),
(2, 'medico', 'los medicos pueden registrarse en el sistema, dar consultas, obtener puntuaciones de los pacientes y editar sus datos personales.'),
(3, 'admin', 'los administradores se encargan de modificar informacion en la web, los servicios que se ofrecen, los metodos de pago, entre otras operaciones'),
(5, 'enfermeros', 'Los enfermeros combinan habilidades técnicas, conocimiento médico y empatía para mejorar la calidad de vida de sus pacientes, desempeñando un papel esencial en la atención sanitaria.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_alta_sistema` datetime NOT NULL DEFAULT current_timestamp(),
  `id_rol` int(11) DEFAULT NULL,
  `imagen_perfil_usuario` varchar(255) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `es_borrado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `correo_electronico`, `password`, `fecha_nacimiento`, `fecha_alta_sistema`, `id_rol`, `imagen_perfil_usuario`, `id_genero`, `es_borrado`) VALUES
(17, 'juana', 'Adriana@hotmail.com', '$2a$08$8z60QAPEEDV.ehZ2AEdl3eksYe1XyKb9y2ylfa05/zGOlW83ck8qC', '1997-11-17', '2024-10-28 04:04:08', 2, './uploads/face3.jpg', 0, 0),
(23, 'keren', 'Adrdawdiana@hotmail.com', '$2a$08$FpreGN5jvHA7o9LkaRiOGuHfbDZ7HfIkzs8jfi8BS2/ekyZfKpjLG', '1997-11-17', '2024-10-30 19:04:36', 2, './uploads/Captura de pantalla 2024-10-30 140924.png', 0, 0),
(25, 'keren333', 'keren3@hotmail.com', '$2a$08$k116KNCBMHB2yI0/AHXN3eSAxrMpcTaWJwja9CrxFjAaDb2vk32ga', '1997-11-18', '2024-10-30 19:26:08', 2, './uploads/Captura de pantalla 2024-10-30 141218.png', 0, 0),
(26, 'keren334', 'keren3@hotmail.com', '$2a$08$lLHi9pCfmeQXAKRE.aV9g.Qq0ubnqNJ2xM9pUueRsb8XV5wK4XsVy', '1997-11-18', '2024-10-30 19:37:06', 2, './uploads/white roses.jpeg', 0, 0),
(27, 'keren334', 'keren3@hotmail.com', '$2a$08$iBPqfvpI.yqPFFytBjc.7uUo.4EeecJd.09JWwB8JTDwmhHqG6WRe', '1997-11-18', '2024-10-30 19:54:51', 2, './uploads/white roses.jpeg', 0, 0),
(28, 'keren334auuu', 'keren3auuu@hotmail.com', '$2a$08$MK0b7n0Q72x1uxcOOqJjIOlmGri9x6UI5A9fB2a91eaxrySnrNFrK', '1997-11-18', '2024-10-30 19:57:17', 2, './uploads/Captura de pantalla 2024-10-29 181047.png', 0, 0),
(31, 'keren334auuua33', 'keren34auuu@hotmail.com', '$2a$08$JLvDXvn046/szjsiXOijm.hY2ZQlBmiaDxef5M5XBCMirKynLu2x.', '1997-11-14', '2024-10-31 16:02:19', 2, './uploads/Admiral-Infographic700x700px-07.jpg', 2, 0),
(32, 'kerenaaaaaaa334auuua33', 'keren34auuu@hotmail.com', '$2a$08$xM5mA5YJ.me.WxFcIKtrG.My/sw0FYKzhFg3xiqlW/1m81LR3tHjG', '1997-11-14', '2024-10-31 16:03:48', 2, './uploads/Admiral-Infographic700x700px-07.jpg', 2, 0),
(33, 'macarena', 'keren34auuu@hotmail.com', '$2a$08$IsZnyJwQU7yZozpI9IfIse8zVt10D4LZ3qHyK50wD.iHxz49OfBgC', '1997-11-14', '2024-10-31 16:04:05', 1, './uploads/Admiral-Infographic700x700px-07.jpg', 2, 0),
(34, 'macarena', 'maca34auuu@hotmail.com', '$2a$08$yk74DYEiWbBAvB3Xl1w.F.yM/NTE4aPfKkim2bDaB/AUGc0.Nk6pO', '1997-11-14', '2024-10-31 18:02:56', 1, './uploads/white roses.jpeg', 1, 0),
(36, 'prueba2', 'Adriana@hotmail.com', '$2a$08$b7yvM1TcWb7oE77p68tNf.LBvPDzNOvCjfaaFKDsoHD9HEbtzQjWq', '1997-10-16', '2024-11-06 12:09:41', NULL, './uploads/Captura de pantalla 2024-11-05 225952.png', 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `id_localidad` (`id_localidad`);

--
-- Indices de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  ADD PRIMARY KEY (`id_especialidad_medica`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `form_contactos`
--
ALTER TABLE `form_contactos`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  ADD PRIMARY KEY (`id_grupo_sanguineo`);

--
-- Indices de la tabla `habitos_salud`
--
ALTER TABLE `habitos_salud`
  ADD PRIMARY KEY (`id_habito`);

--
-- Indices de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD PRIMARY KEY (`id_historia_clinica`),
  ADD KEY `id_habito` (`id_habito`),
  ADD KEY `id_grupo_sanguineo` (`id_grupo_sanguineo`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id_localidad`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD PRIMARY KEY (`id_medico_especialidad`),
  ADD KEY `id_especialidad_medica` (`id_especialidad_medica`),
  ADD KEY `medicos_especialidades_ibfk_1` (`id_usuario`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_historia_clinica` (`id_historia_clinica`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_direccion` (`id_direccion`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id_registro`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `fk_genero` (`id_genero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  MODIFY `id_especialidad_medica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `form_contactos`
--
ALTER TABLE `form_contactos`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  MODIFY `id_grupo_sanguineo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habitos_salud`
--
ALTER TABLE `habitos_salud`
  MODIFY `id_habito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  MODIFY `id_historia_clinica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `id_localidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  MODIFY `id_medico_especialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`);

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`);

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `historias_clinicas_ibfk_1` FOREIGN KEY (`id_habito`) REFERENCES `habitos_salud` (`id_habito`),
  ADD CONSTRAINT `historias_clinicas_ibfk_2` FOREIGN KEY (`id_grupo_sanguineo`) REFERENCES `grupos_sanguineos` (`id_grupo_sanguineo`);

--
-- Filtros para la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD CONSTRAINT `localidades_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD CONSTRAINT `medicos_especialidades_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `medicos` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `medicos_especialidades_ibfk_2` FOREIGN KEY (`id_especialidad_medica`) REFERENCES `especialidades_medicas` (`id_especialidad_medica`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`id_historia_clinica`) REFERENCES `historias_clinicas` (`id_historia_clinica`);

--
-- Filtros para la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD CONSTRAINT `perfiles_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `perfiles_ibfk_2` FOREIGN KEY (`id_direccion`) REFERENCES `direcciones` (`id_direccion`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_genero` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`),
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
