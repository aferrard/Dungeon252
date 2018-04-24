-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dungeon252_data
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dungeon252_data
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dungeon252_data` DEFAULT CHARACTER SET utf8 ;
USE `dungeon252_data` ;

-- -----------------------------------------------------
-- Table `dungeon252_data`.`weapons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`weapons` (
  `weapon_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `attribute` TEXT NOT NULL,
  `weight` INT NOT NULL,
  `strength` INT NOT NULL,
  PRIMARY KEY (`weapon_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`items` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `attribute` TEXT NOT NULL,
  `weight` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`item_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`magiks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`magiks` (
  `magik_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `effect` INT NOT NULL,
  `goodagainst` TEXT NOT NULL,
  PRIMARY KEY (`magik_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `health` INT NOT NULL,
  `money` INT NOT NULL,
  `strength` INT NOT NULL,
  `weight` INT NOT NULL,
  `score` INT NOT NULL,
  `winner` INT NOT NULL,
  `weapons_weapon_id` INT UNSIGNED NOT NULL,
  `items_item_id` INT UNSIGNED NOT NULL,
  `magiks_magik_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `weapons_weapon_id`, `items_item_id`, `magiks_magik_id`),
  INDEX `fk_users_weapons_idx` (`weapons_weapon_id` ASC),
  INDEX `fk_users_items1_idx` (`items_item_id` ASC),
  INDEX `fk_users_magiks1_idx` (`magiks_magik_id` ASC),
  CONSTRAINT `fk_users_weapons`
    FOREIGN KEY (`weapons_weapon_id`)
    REFERENCES `dungeon252_data`.`weapons` (`weapon_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_items1`
    FOREIGN KEY (`items_item_id`)
    REFERENCES `dungeon252_data`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_magiks1`
    FOREIGN KEY (`magiks_magik_id`)
    REFERENCES `dungeon252_data`.`magiks` (`magik_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`rooms` (
  `room_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `image` TEXT NOT NULL,
  `event` TEXT NOT NULL,
  PRIMARY KEY (`room_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`choices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`choices` (
  `choice_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `choice` TEXT NOT NULL,
  `rooms_room_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`choice_id`, `rooms_room_id`),
  INDEX `fk_choices_rooms1_idx` (`rooms_room_id` ASC),
  CONSTRAINT `fk_choices_rooms1`
    FOREIGN KEY (`rooms_room_id`)
    REFERENCES `dungeon252_data`.`rooms` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dungeon252_data`.`outcomes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dungeon252_data`.`outcomes` (
  `outcome_path` VARCHAR(1) NOT NULL,
  `outcome` TEXT NOT NULL,
  `choices_choice_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`outcome_path`, `choices_choice_id`),
  INDEX `fk_outcomes_choices1_idx` (`choices_choice_id` ASC),
  CONSTRAINT `fk_outcomes_choices1`
    FOREIGN KEY (`choices_choice_id`)
    REFERENCES `dungeon252_data`.`choices` (`choice_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

