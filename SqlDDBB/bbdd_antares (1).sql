-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2024 a las 11:02:52
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
-- Estructura de tabla para la tabla `especialidades_medicas`
--

CREATE TABLE `especialidades_medicas` (
  `id_especialidad_medica` int(11) NOT NULL,
  `nombre_especialidad_med` varchar(200) NOT NULL,
  `descripcion_especialidad_med` text NOT NULL,
  `fecha_alta_especialidad_med` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades_medicas`
--

INSERT INTO `especialidades_medicas` (`id_especialidad_medica`, `nombre_especialidad_med`, `descripcion_especialidad_med`, `fecha_alta_especialidad_med`) VALUES
(1, 'Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio', '2024-10-20 05:43:16');

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
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_usuario` int(11) NOT NULL,
  `codigo_medico` int(11) NOT NULL,
  `biografia_medico` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_especialidades`
--

CREATE TABLE `medicos_especialidades` (
  `id_medico_especialidad` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_especialidad_medica` int(11) DEFAULT NULL,
  `fecha_experiencia` date NOT NULL
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
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion_rol` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` text NOT NULL,
  `apellido_usuario` text NOT NULL,
  `correo_electronico` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `documento_identidad` int(11) NOT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `sexo_usuario` varchar(100) DEFAULT NULL,
  `fecha_alta_sistema` datetime DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  ADD PRIMARY KEY (`id_especialidad_medica`);

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
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD PRIMARY KEY (`id_medico_especialidad`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_especialidad_medica` (`id_especialidad_medica`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_historia_clinica` (`id_historia_clinica`);

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
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  MODIFY `id_especialidad_medica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  MODIFY `id_medico_especialidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `historias_clinicas_ibfk_1` FOREIGN KEY (`id_habito`) REFERENCES `habitos_salud` (`id_habito`),
  ADD CONSTRAINT `historias_clinicas_ibfk_2` FOREIGN KEY (`id_grupo_sanguineo`) REFERENCES `grupos_sanguineos` (`id_grupo_sanguineo`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD CONSTRAINT `medicos_especialidades_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `medicos` (`id_usuario`),
  ADD CONSTRAINT `medicos_especialidades_ibfk_2` FOREIGN KEY (`id_especialidad_medica`) REFERENCES `especialidades_medicas` (`id_especialidad_medica`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`id_historia_clinica`) REFERENCES `historias_clinicas` (`id_historia_clinica`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
