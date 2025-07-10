CREATE DATABASE IF NOT EXISTS digital_library;

use digital_library;

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum("admin","regular") NOT NULL,
  `dni` mediumint,
  `has_certificate` bool DEFAULT true,
  `is_active` bool DEFAULT true,
  `last_login` date DEFAULT(now()),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `strikes` (
  `strike_id` int PRIMARY KEY AUTO_INCREMENT,
  `comment_id` int not null,
  `valid` bool DEFAULT false,
  `user_id` int not null,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `documents` (
  `document_id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `uploaded_by` int,
  `folder_id` int,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `folders` (
  `folder_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `news` (
  `news_id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int NOT NULL,
  `published_at` datetime
);

CREATE TABLE `comments` (
  `comment_id` int PRIMARY KEY AUTO_INCREMENT,
  `document_id` int,
  `user_id` int,
  `content` text,
  `created_at` datetime DEFAULT (now()),
  `modified_at` datetime DEFAULT (now())
);

CREATE TABLE `tags` (
  `tag_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `document_tags` (
  `document_tags_id` int PRIMARY KEY AUTO_INCREMENT,
  `document_id` int NOT NULL,
  `tag_id` int NOT NULL
);

ALTER TABLE `strikes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `documents` ADD FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `documents` ADD FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`);

ALTER TABLE `news` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `document_tags` ADD FOREIGN KEY (`document_id`) REFERENCES `documents` (`document_id`);

ALTER TABLE `document_tags` ADD FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

ALTER TABLE `strikes` ADD FOREIGN KEY(`comment_id`) REFERENCES `comments`(`comment_id`);