/* Tabla recetas */

CREATE TABLE `recetas_db`.`recetas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(265) NOT NULL,
  `ingredientes` VARCHAR(265) NOT NULL,
  `instrucciones` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`));

