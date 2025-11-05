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
SET time_zone = "+00:00";


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
-- Estructura de tabla para la tabla `careers`
--

CREATE TABLE `careers` (
  `career_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `careers`
--

INSERT INTO `careers` (`career_id`, `name`, `created_at`) VALUES
(1, 'Profesorado de la educación secundaria en Psicología', '2025-09-10 18:07:33'),
(2, 'Profesorado de Educación Especial', '2025-09-10 18:07:33'),
(3, 'Profesorado de Educación Inical', '2025-09-10 18:07:33'),
(4, 'Profesorado de la educación secundaria en Ciencias Políticas', '2025-09-10 18:07:33'),
(5, 'Tecnicatura Superior en Análisis de Sistemas', '2025-09-10 18:07:33'),
(6, 'Tecnicatura Superior en Publicidad', '2025-09-10 18:07:33'),
(7, 'Tecnicatura Superior en Acompañamiento Terapéutico', '2025-09-10 18:07:33'),
(8, 'Tecnicatura Superior en Administración Pública', '2025-09-10 18:07:33'),
(9, 'Tecnicatura Superior en Administración de Pymes', '2025-09-10 18:07:33'),
(10, 'Tecnicatura Superior en Trabajo Social', '2025-09-10 18:07:33');


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (
  `comment_id`,
  `document_id`,
  `user_id`,
  `content`,
  `created_at`,
  `modified_at`
)
VALUES
(1, 1, 23, 'Muy buen material, gracias.', '2025-09-04 21:47:33', '2025-09-04 21:47:33'),
(2, 1, 23, '¿Tienen la versión actualizada?', '2025-09-04 21:47:33', '2025-09-04 21:47:33'),
(3, 2, 23, 'Esto me ayudó para el examen.', '2025-09-04 21:47:33', '2025-09-04 21:47:33');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documents`
--

INSERT INTO `documents` (
  `document_id`,
  `title`,
  `content`,
  `image`,
  `uploaded_by`,
  `folder_id`,
  `created_at`
)
VALUES
(1, 'Manual de Programación', 'Contenido del manual...', NULL, 23, 2, '2025-09-04 21:47:33'),
(2, 'Apuntes de SQL', 'Aquí van los apuntes...', NULL, 23, 2, '2025-09-04 21:47:33'),
(3, 'Examen Final 2024', 'Preguntas y consignas...', NULL, 23, 3, '2025-09-04 21:47:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document_tags`
--

CREATE TABLE `document_tags` (
  `document_tags_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `document_tags`
--

INSERT INTO `document_tags` (
  `document_tags_id`,
  `document_id`,
  `tag_id`
)
VALUES
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
  `type` enum('career','Year') DEFAULT NULL,
  `year_level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `folders`
--

INSERT INTO `folders` (
  `folder_id`,
  `name`,
  `created_at`,
  `parent_id`,
  `type`,
  `year_level`
)
VALUES
(1, 'Carpeta Principal', '2025-09-04 21:47:33', NULL, '', NULL),
(2, 'Apuntes de Programación', '2025-09-04 21:47:33', NULL, '', NULL),
(3, 'Exámenes', '2025-09-04 21:47:33', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `published_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `news`
--

INSERT INTO `news` (`news_id`, `title`, `content`, `image`, `author_id`, `published_at`) VALUES
(2, 'Convocatoria a Taller', 'Inscripciones abiertas al taller de React.', NULL, 23, '2025-09-04 21:47:33'),
(5, 'Charla de ciberseguridad', 'Aprende a cómo navegar seguramente en Internet', NULL, 24, '2025-09-12 11:14:02'),
(6, 'Fecha de elecciones estudiantiles', 'El día de la fecha se celebrarán las votaciones...', NULL, 24, '2025-09-12 17:29:34');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `strikes`
--

INSERT INTO `strikes` (
  `strike_id`,
  `comment_id`,
  `valid`,
  `user_id`,
  `created_at`
)
VALUES
(1, 2, 1, 23, '2025-09-04 21:47:33'),
(2, 3, 0, 23, '2025-09-04 21:47:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (
  `tag_id`,
  `name`
)
VALUES
(3, 'Educación'),
(4, 'Examen'),
(1, 'Programación'),
(2, 'SQL');

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
  `career` varchar(255) NOT NULL,
  `dni` int(10) UNSIGNED DEFAULT NULL,
  `has_certificate` tinyint(1) DEFAULT 1,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` date DEFAULT current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (
  `user_id`,
  `name`,
  `email`,
  `password`,
  `role`,
  `career`,
  `dni`,
  `has_certificate`,
  `is_active`,
  `last_login`,
  `created_at`,
  `updated_at`
)
VALUES
(23, 'Usuario Dummy', 'dummy@mail.com', '123456', 'admin', 'Ninguno', 8388607, 1, 0, '2025-09-04', '2025-09-04 21:47:33', '2025-09-04 21:47:33'),
(24, 'facundo manuel di blasio', 'facu@mail.com', '$2b$10$lKU/61dImpytOeGGfu.qlOLNRgEeP9TjXVNgVQG1NylqmL1Fdmu3K', 'admin', '', 8388607, 1, 1, '2025-09-04', '2025-09-05 00:49:26', '2025-09-05 00:49:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comments_ibfk_1` (`document_id`)  N DELETE CASCADE,
  ADD KEY `comments_ibfk_2` (`user_id`) ON DELETE CASCADE;

--
-- Indices de la tabla `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id_career`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `documents_ibfk_1` (`uploaded_by`) ON DELETE CASCADE,
  ADD KEY `documents_ibfk_2` (`folder_id`) ON DELETE CASCADE;

--
-- Indices de la tabla `document_tags`
--
ALTER TABLE `document_tags`
  ADD PRIMARY KEY (`document_tags_id`),
  ADD KEY `document_tags_ibfk_1` (`document_id`) ON DELETE CASCADE,
  ADD KEY `document_tags_ibfk_2` (`tag_id`) ON DELETE CASCADE;

--
-- Indices de la tabla `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `fk_folders_career` (`parent_id`) ON DELETE CASCADE;

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`),
  ADD KEY `news_ibfk_1` (`author_id`) ON DELETE CASCADE;

--
-- Indices de la tabla `strikes`
--
ALTER TABLE `strikes`
  ADD PRIMARY KEY (`strike_id`),
  ADD KEY `strikes_ibfk_1` (`comment_id`) ON DELETE CASCADE,
  ADD KEY `strikes_ibfk_2` (`user_id`) ON DELETE CASCADE;

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

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `careers`
--
ALTER TABLE `course`
  MODIFY `id_course` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  ADD CONSTRAINT `document_tags_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`),
  ADD CONSTRAINT `document_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

--
-- Filtros para la tabla `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `fk_folders_career` FOREIGN KEY (`parent_id`) REFERENCES `careers` (`id_career`) ON DELETE SET NULL,
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
