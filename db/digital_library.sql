-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2025 a las 23:01:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `digital_library`
--
create database if not exists digital_library;
use digital_library;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `document_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `modified_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `document_id`, `user_id`, `content`, `created_at`, `modified_at`) VALUES
(1, 1, 23, 'Muy buen material, gracias.', current_timestamp, current_timestamp),
(2, 1, 23, '¿Tienen la versión actualizada?', current_timestamp, current_timestamp),
(3, 2, 23, 'Esto me ayudó para el examen.', current_timestamp, current_timestamp);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course`
--

CREATE TABLE `course` (
  `id_course` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `course`
--

INSERT INTO `course` (`id_course`, `name`, `created_at`) VALUES
(1, 'Profesorado de Educación Especial', current_timestamp),
(2, 'Profesorado de Educación Inicial', current_timestamp),
(3, 'Profesorado de la Educación Secundaria en Ciencias Políticas', current_timestamp),
(4, 'Profesorado de la Educación Secundaria en Psicología', current_timestamp),
(5, 'Tecnicatura Superior en Acompañamiento Terapéutico', current_timestamp),
(6, 'Tecnicatura Superior en Administración de Pymes', current_timestamp),
(7, 'Tecnicatura Superior en Administración Pública', current_timestamp),
(8, 'Tecnicatura Superior en Análisis de Sistemas', current_timestamp),
(9, 'Tecnicatura Superior en Publicidad', current_timestamp),
(10, 'Tecnicatura Superior en Trabajo Social', current_timestamp);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `documents`
--

INSERT INTO `documents` (`document_id`, `title`, `content`, `image`, `uploaded_by`, `folder_id`, `created_at`) VALUES
(1, 'Manual de Programación', 'Contenido del manual...', NULL, 23, 2, current_timestamp),
(2, 'Apuntes de SQL', 'Aquí van los apuntes...', NULL, 23, 2, current_timestamp),
(3, 'Examen Final 2024', 'Preguntas y consignas...', NULL, 23, 3, current_timestamp);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document_tags`
--

CREATE TABLE `document_tags` (
  `document_tags_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
);

--
-- Volcado de datos para la tabla `document_tags`
--

INSERT INTO `document_tags` (`document_tags_id`, `document_id`, `tag_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `parent_id` int(11) DEFAULT NULL,
  `type` enum('Course','Year') DEFAULT NULL,
  `year_level` int(11) DEFAULT NULL
);

--
-- Volcado de datos para la tabla `folders`
--

INSERT INTO `folders` (`folder_id`, `name`, `created_at`, `parent_id`, `type`, `year_level`) VALUES
(1, 'Carpeta Principal', current_timestamp, NULL, '', NULL),
(2, 'Apuntes de Programación', current_timestamp, NULL, '', NULL),
(3, 'Exámenes', current_timestamp, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `published_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`news_id`, `title`, `content`, `image_url`, `author_id`, `published_at`) VALUES
(1, 'Convocatoria a Taller', 'Inscripciones abiertas al taller de React.', NULL, 23, current_timestamp),
(2, 'Charla de ciberseguridad', 'Aprende a cómo navegar seguramente en Internet', NULL, 24, current_timestamp),
(3, 'Fecha de elecciones estudiantiles', 'El día de la fecha se celebrarán las votaciones...', NULL, 24, current_timestamp);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `strikes`
--

CREATE TABLE `strikes` (
  `strike_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `valid` tinyint(1) DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `strikes`
--

INSERT INTO `strikes` (`strike_id`, `comment_id`, `valid`, `user_id`, `created_at`) VALUES
(1, 2, 1, 23, '2025-09-04 21:47:33'),
(2, 3, 0, 23, '2025-09-04 21:47:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
);

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`tag_id`, `name`) VALUES
(1, 'Educación'),
(2, 'Examen'),
(3, 'Programación'),
(4, 'SQL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','regular') NOT NULL,
  `course` varchar(255) NOT NULL,
  `dni` int(10) UNSIGNED DEFAULT NULL,
  `has_certificate` tinyint(1) DEFAULT 1,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` date DEFAULT current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
);

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `course`, `dni`, `has_certificate`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Usuario Dummy', 'dummy@mail.com', '123456', 'admin', 'Ninguno', 8388607, 1, 0, '2025-09-04', current_timestamp, current_timestamp),
(2, 'facundo manuel di blasio', 'facu@mail.com', '$2b$10$lKU/61dImpytOeGGfu.qlOLNRgEeP9TjXVNgVQG1NylqmL1Fdmu3K', 'admin', '', 8388607, 1, 1, '2025-09-04', current_timestamp, current_timestamp);


-- --------------------------------------------------------


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comments_ibfk_1` (`document_id`),
  ADD KEY `comments_ibfk_2` (`user_id`);

--
-- Indices de la tabla `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id_course`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `documents_ibfk_1` (`uploaded_by`),
  ADD KEY `documents_ibfk_2` (`folder_id`);

--
-- Indices de la tabla `document_tags`
--
ALTER TABLE `document_tags`
  ADD PRIMARY KEY (`document_tags_id`),
  ADD KEY `document_tags_ibfk_1` (`document_id`),
  ADD KEY `document_tags_ibfk_2` (`tag_id`);

--
-- Indices de la tabla `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `fk_folders_course` (`parent_id`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `news_ibfk_1` (`author_id`);

--
-- Indices de la tabla `strikes`
--
ALTER TABLE `strikes`
  ADD PRIMARY KEY (`strike_id`),
  ADD KEY `strikes_ibfk_1` (`comment_id`),
  ADD KEY `strikes_ibfk_2` (`user_id`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);


-- --------------------------------------------------------


--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `course`
--
ALTER TABLE `course`
  MODIFY `id_course` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `document_tags`
--
ALTER TABLE `document_tags`
  MODIFY `document_tags_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `strikes`
--
ALTER TABLE `strikes`
  MODIFY `strike_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`);

--
-- Filtros para la tabla `document_tags`
--
ALTER TABLE `document_tags`
  ADD CONSTRAINT `document_tags_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `fk_folders_course` FOREIGN KEY (`parent_id`) REFERENCES `course` (`id_course`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_folders_parent` FOREIGN KEY (`parent_id`) REFERENCES `folders` (`folder_id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `strikes`
--
ALTER TABLE `strikes`
  ADD CONSTRAINT `strikes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`),
  ADD CONSTRAINT `strikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;