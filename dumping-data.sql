-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 21 Jun 2019 pada 01.43
-- Versi server: 10.3.15-MariaDB
-- Versi PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(1, 'sports', '2019-06-20 00:00:00', '2019-06-20 16:32:53'),
(2, 'funny', '2019-06-20 01:00:00', '2019-06-20 01:00:00'),
(3, 'works', '2019-06-20 16:00:42', '2019-06-20 16:00:42');

-- --------------------------------------------------------

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id`, `title`, `note`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'a', 'b', 2, '2019-06-20 17:44:55', '2019-06-20 21:37:31'),
(2, 'Catatan ini kedua', 'kedua test', 2, '2019-06-20 17:45:43', '2019-06-20 17:45:43'),
(3, 'Catatan ini ktiga', 'isi catatan kegita test', 3, '2019-06-20 22:10:43', '2019-06-20 22:10:43'),
(4, 'What is Lorem Ipsum', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it', 1, '2019-06-20 22:51:21', '2019-06-20 22:51:21'),
(5, 'to make a type specimen book', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing ', 2, '2019-06-20 22:51:53', '2019-06-20 22:51:53'),
(6, 'software like Aldus PageMaker', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed', 2, '2019-06-20 22:55:00', '2019-06-20 22:55:00'),
(7, 'software like Aldus PageMaker', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed', 3, '2019-06-20 22:57:43', '2019-06-20 22:57:43'),
(8, 'to using \'Content here, content here\', making it look like readable', 'English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search ', 1, '2019-06-20 22:59:00', '2019-06-20 22:59:00'),
(9, 'Where can I get some', 'search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', 2, '2019-06-20 22:59:25', '2019-06-20 22:59:25'),
(10, 'Where does it come from', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', 2, '2019-06-20 22:59:45', '2019-06-20 22:59:45'),
(11, 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia', 'looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source', 1, '2019-06-20 23:00:07', '2019-06-20 23:00:07'),
(12, 'update title', 'english upadte where from many', 2, '2019-06-20 23:00:38', '2019-06-20 23:04:47');

-- --------------------------------------------------------
