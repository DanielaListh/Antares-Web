-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2024 a las 08:40:24
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
-- Base de datos: `antares_bbdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultorios`
--

CREATE TABLE `consultorios` (
  `id_consultorio` int(11) NOT NULL,
  `numero_consultorio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades_medicas`
--

CREATE TABLE `especialidades_medicas` (
  `id_especialidad_medica` int(11) NOT NULL,
  `nombre_especialidad_medica` varchar(250) NOT NULL,
  `descripcion_especialidad_medica` varchar(400) NOT NULL,
  `fecha_alta_especialidad` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades_medicas`
--

INSERT INTO `especialidades_medicas` (`id_especialidad_medica`, `nombre_especialidad_medica`, `descripcion_especialidad_medica`, `fecha_alta_especialidad`) VALUES
(1, 'Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio', '2024-10-09 03:15:00'),
(2, 'Cirugía Cardiovascular', 'Intervenciones quirúrgicas en el corazón y los vasos sanguíneos', '2024-10-09 03:15:38'),
(3, 'Gastroenterología', 'Diagnóstico y tratamiento de enfermedades del sistema digestivo', '2024-10-09 03:16:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_medico`
--

CREATE TABLE `personal_medico` (
  `id_medico` int(11) NOT NULL,
  `fecha_inicio_experiencia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  ADD PRIMARY KEY (`id_consultorio`);

--
-- Indices de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  ADD PRIMARY KEY (`id_especialidad_medica`);

--
-- Indices de la tabla `personal_medico`
--
ALTER TABLE `personal_medico`
  ADD PRIMARY KEY (`id_medico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  MODIFY `id_consultorio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidades_medicas`
--
ALTER TABLE `especialidades_medicas`
  MODIFY `id_especialidad_medica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `personal_medico`
--
ALTER TABLE `personal_medico`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
