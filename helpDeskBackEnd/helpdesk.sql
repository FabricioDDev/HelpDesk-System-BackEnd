-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-09-2023 a las 00:33:50
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `helpdesk`
--
CREATE DATABASE IF NOT EXISTS `helpdesk` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `helpdesk`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accountstates`
--
-- Creación: 06-09-2023 a las 00:21:12
--

CREATE TABLE `accountstates` (
  `accountStateId` int(2) NOT NULL,
  `accountStateName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- RELACIONES PARA LA TABLA `accountstates`:
--

--
-- Volcado de datos para la tabla `accountstates`
--

INSERT INTO `accountstates` (`accountStateId`, `accountStateName`) VALUES
(1, 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loginfalis`
--
-- Creación: 06-09-2023 a las 00:03:53
--

CREATE TABLE `loginfalis` (
  `loginFailId` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `failedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- RELACIONES PARA LA TABLA `loginfalis`:
--   `userId`
--       `users` -> `userId`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--
-- Creación: 31-08-2023 a las 20:17:35
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- RELACIONES PARA LA TABLA `roles`:
--

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Adminastrator');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
-- Creación: 06-09-2023 a las 00:03:09
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roleId` int(11) NOT NULL,
  `accountStateId` int(2) NOT NULL DEFAULT 1,
  `userLocked` tinyint(1) NOT NULL DEFAULT 0,
  `createdDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- RELACIONES PARA LA TABLA `users`:
--   `accountStateId`
--       `accountstates` -> `accountStateId`
--   `roleId`
--       `roles` -> `roleId`
--

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `name`, `lastName`, `userName`, `email`, `password`, `roleId`, `accountStateId`, `userLocked`, `createdDate`) VALUES
(1, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', 1, 1, 1, '2023-09-05 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accountstates`
--
ALTER TABLE `accountstates`
  ADD PRIMARY KEY (`accountStateId`);

--
-- Indices de la tabla `loginfalis`
--
ALTER TABLE `loginfalis`
  ADD PRIMARY KEY (`loginFailId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`,`accountStateId`),
  ADD KEY `userAccountStateRelation` (`accountStateId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accountstates`
--
ALTER TABLE `accountstates`
  MODIFY `accountStateId` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `loginfalis`
--
ALTER TABLE `loginfalis`
  MODIFY `loginFailId` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `loginfalis`
--
ALTER TABLE `loginfalis`
  ADD CONSTRAINT `user_fails` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `userAccountStateRelation` FOREIGN KEY (`accountStateId`) REFERENCES `accountstates` (`accountStateId`),
  ADD CONSTRAINT `userRoleRelation` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
