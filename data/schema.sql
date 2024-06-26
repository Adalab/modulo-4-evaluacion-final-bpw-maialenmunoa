/* Tabla recetas */
CREATE TABLE `recetas_db`.`recetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(265) NOT NULL,
  `ingredientes` varchar(265) NOT NULL,
  `instrucciones` longtext NOT NULL,
  `imagen` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)


/* Usuarios */
CREATE TABLE `usuarios_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(265) NOT NULL,
  `nombre` VARCHAR(265) NOT NULL,
  `password` VARCHAR(265) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);