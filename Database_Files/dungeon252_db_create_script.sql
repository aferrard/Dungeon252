-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dungeon252
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dungeon252
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dungeon252` DEFAULT CHARACTER SET utf8 ;
USE `dungeon252` ;

-- -----------------------------------------------------
-- Table `dungeon252`.`weapons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`weapons` (
  `weapon_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `attribute` TEXT NOT NULL,
  `weight` INT NOT NULL,
  `strength` INT NOT NULL,
  PRIMARY KEY (`weapon_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`items` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `attribute` TEXT NOT NULL,
  `weight` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`magiks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`magiks` (
  `magik_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `attribute` TEXT NOT NULL,
  PRIMARY KEY (`magik_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `health` VARCHAR(45) NOT NULL,
  `money` VARCHAR(45) NOT NULL,
  `weapons_weapon_id` INT UNSIGNED NOT NULL,
  `items_item_id` INT UNSIGNED NOT NULL,
  `magiks_magik_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `weapons_weapon_id`, `items_item_id`, `magiks_magik_id`),
  INDEX `fk_users_weapons_idx` (`weapons_weapon_id` ASC),
  INDEX `fk_users_items1_idx` (`items_item_id` ASC),
  INDEX `fk_users_magiks1_idx` (`magiks_magik_id` ASC),
  CONSTRAINT `fk_users_weapons`
    FOREIGN KEY (`weapons_weapon_id`)
    REFERENCES `dungeon252`.`weapons` (`weapon_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_items1`
    FOREIGN KEY (`items_item_id`)
    REFERENCES `dungeon252`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_magiks1`
    FOREIGN KEY (`magiks_magik_id`)
    REFERENCES `dungeon252`.`magiks` (`magik_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`rooms` (
  `room_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(45) NULL,
  `event` TEXT NOT NULL,
  PRIMARY KEY (`room_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`options` (
  `option_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `option` TEXT NOT NULL,
  `rooms_room_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`option_id`, `rooms_room_id`),
  INDEX `fk_options_rooms1_idx` (`rooms_room_id` ASC),
  CONSTRAINT `fk_options_rooms1`
    FOREIGN KEY (`rooms_room_id`)
    REFERENCES `dungeon252`.`rooms` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252`.`outcomes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252`.`outcomes` (
  `options_option_id` INT UNSIGNED NOT NULL,
  `options_rooms_room_id` INT UNSIGNED NOT NULL,
  `outcome` TEXT NOT NULL,
  PRIMARY KEY (`options_option_id`, `options_rooms_room_id`),
  CONSTRAINT `fk_outcomes_options1`
    FOREIGN KEY (`options_option_id` , `options_rooms_room_id`)
    REFERENCES `dungeon252`.`options` (`option_id` , `rooms_room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

