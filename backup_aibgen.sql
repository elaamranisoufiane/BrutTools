-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 21 mars 2024 à 18:11
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bgai`
--

-- --------------------------------------------------------

--
-- Structure de la table `creditsplans`
--

CREATE TABLE `creditsplans` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `credits` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `creditsplans`
--

INSERT INTO `creditsplans` (`id`, `name`, `description`, `price`, `credits`) VALUES
('prod_Ph3PFHxDx4NAaE', 'MINI', '100 Credits\n', '10.00', 100),
('prod_Ph3PJaqsqf0OMw', 'PRO', '300 credts', '20.00', 300),
('prod_Ph3QYvXkEYRBsd', 'Agency', '500  credits ', '30.00', 500);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `monthlyplans`
--

CREATE TABLE `monthlyplans` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `credits` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `monthlyplans`
--

INSERT INTO `monthlyplans` (`id`, `name`, `description`, `price`, `credits`) VALUES
('prod_Ph3JchTqKooWzt', 'Standard', '50 Credits, Tools Available for the whole month: BG Removal, BG Generation, Restore Photos, Upscale Photos, Upcoming Tools.', '6.00', 50),
('prod_Ph3OHPNh1CRI7I', 'Premium', '200 Credits, Tools Available for the whole month: BG Removal, BG Generation, Restore Photos, Upscale Photos, Upcoming Tools.', '15.00', 200);

-- --------------------------------------------------------

--
-- Structure de la table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `watermark_text` varchar(255) DEFAULT NULL,
  `watermark_position_x` int(11) DEFAULT NULL,
  `watermark_position_y` int(11) DEFAULT NULL,
  `replicate_key` varchar(255) DEFAULT NULL,
  `upscale_scale_guest` int(11) DEFAULT NULL,
  `output_image_guest` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `watermark_position_x2` int(11) DEFAULT NULL,
  `watermark_position_y2` int(11) DEFAULT NULL,
  `watermark_position_x3` int(11) DEFAULT NULL,
  `watermark_position_y3` int(11) DEFAULT NULL,
  `watermark_size` int(255) DEFAULT NULL,
  `stripe_api` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `settings`
--

INSERT INTO `settings` (`id`, `watermark_text`, `watermark_position_x`, `watermark_position_y`, `replicate_key`, `upscale_scale_guest`, `output_image_guest`, `updated_at`, `watermark_position_x2`, `watermark_position_y2`, `watermark_position_x3`, `watermark_position_y3`, `watermark_size`, `stripe_api`) VALUES
(1, 'aibgen.com', 20, 20, 'r8_UNJDzApzWsrM5cadUuKPq8Oyw2MC5l03c9lmx', 2, '0.3 * width', '2024-03-16 16:41:25', 40, 40, 80, 80, 60, 'sk_test_51OYQssG7wv77vtTGNdY4f7hkiY5zncdfTE7BqlXjpRvzLnMHn2xwU7oGW5p8vuc6qHh3nbSikHAyS1saBfdwZ2kJ00rUt9rYUK');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `coupon` varchar(255) DEFAULT NULL,
  `attempt` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `subscribre` varchar(255) DEFAULT NULL,
  `subscriptionId` varchar(255) DEFAULT NULL,
  `currentPeriodEnd` date DEFAULT NULL,
  `variantId` varchar(255) DEFAULT NULL,
  `customerId` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `canceled` tinyint(1) DEFAULT NULL,
  `replicatekey` varchar(255) DEFAULT NULL,
  `credits` int(255) DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `planName` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `coupon`, `attempt`, `created_at`, `updated_at`, `subscribre`, `subscriptionId`, `currentPeriodEnd`, `variantId`, `customerId`, `role`, `canceled`, `replicatekey`, `credits`, `verification_token`, `is_verified`, `planName`) VALUES
(217, 'admin', '$2b$10$CRWRJ8RjbfFGiXVelvD9VeV3CCjFhyOuR8/bu5mhrLbHZnlkkYvmG', 'site.web97-2@gmail.Com', '00000000', 201, '2024-01-16 22:04:01', '2024-03-12 15:58:41', '0', NULL, NULL, NULL, 'cus_PO5zYeVmRcpb3h', 'admin', NULL, 'r8_UNJDzApzWsrM5cadUuKPq8Oyw2MC5l03c9lmx', NULL, 'helloo', 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `creditsplans`
--
ALTER TABLE `creditsplans`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_image` (`id_user`);

--
-- Index pour la table `monthlyplans`
--
ALTER TABLE `monthlyplans`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5237;

--
-- AUTO_INCREMENT pour la table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_user_image` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

DELIMITER $$
--
-- Évènements
--
$$

$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
