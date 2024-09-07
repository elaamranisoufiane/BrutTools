-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: aibgen
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.23.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `creditsplans`
--

DROP TABLE IF EXISTS `creditsplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditsplans` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `credits` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditsplans`
--

LOCK TABLES `creditsplans` WRITE;
/*!40000 ALTER TABLE `creditsplans` DISABLE KEYS */;
INSERT INTO `creditsplans` VALUES ('prod_Ph3PFHxDx4NAaE','MINI','100 Credits\n',10.00,100),('prod_Ph3PJaqsqf0OMw','PRO','300 Credits',20.00,300),('prod_Ph3QYvXkEYRBsd','Agency','500  Credits',30.00,500);
/*!40000 ALTER TABLE `creditsplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_image` (`id_user`),
  CONSTRAINT `fk_user_image` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5636 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (5635,'/uploads/image-1714315519555.png',NULL,'2024-04-28 14:45:20');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthlyplans`
--

DROP TABLE IF EXISTS `monthlyplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthlyplans` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `credits` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthlyplans`
--

LOCK TABLES `monthlyplans` WRITE;
/*!40000 ALTER TABLE `monthlyplans` DISABLE KEYS */;
INSERT INTO `monthlyplans` VALUES ('prod_Ph3JchTqKooWzt','Standard','50 Credits, Tools Available for the whole month: BG Removal, BG Generation, Restore Photos, Upscale Photos, Upcoming Tools.',6.00,50),('prod_Ph3OHPNh1CRI7I','Premium','200 Credits, Tools Available for the whole month: BG Removal, BG Generation, Restore Photos, Upscale Photos, Upcoming Tools.',15.00,200);
/*!40000 ALTER TABLE `monthlyplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `watermark_text` varchar(255) DEFAULT NULL,
  `watermark_position_x` int DEFAULT NULL,
  `watermark_position_y` int DEFAULT NULL,
  `replicate_key` varchar(255) DEFAULT NULL,
  `upscale_scale_guest` int DEFAULT NULL,
  `output_image_guest` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `watermark_position_x2` int DEFAULT NULL,
  `watermark_position_y2` int DEFAULT NULL,
  `watermark_position_x3` int DEFAULT NULL,
  `watermark_position_y3` int DEFAULT NULL,
  `watermark_size` int DEFAULT NULL,
  `stripe_api` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'Pixelcate',0,0,'r8_UNJDzApzWsrM5cadUuKPq8Oyw2MC5l03c9lmx',2,'0.3 * width','2024-04-03 16:09:59',0,0,80,90,100,'sk_test_51OYQssG7wv77vtTGNdY4f7hkiY5zncdfTE7BqlXjpRvzLnMHn2xwU7oGW5p8vuc6qHh3nbSikHAyS1saBfdwZ2kJ00rUt9rYUK');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `coupon` varchar(255) DEFAULT NULL,
  `attempt` int DEFAULT NULL,
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
  `credits` int DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `planName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (217,'admin','$2b$10$CRWRJ8RjbfFGiXVelvD9VeV3CCjFhyOuR8/bu5mhrLbHZnlkkYvmG','site.web97-2@gmail.Com','00000000',228,'2024-01-16 22:04:01','2024-03-12 15:58:41','0',NULL,NULL,NULL,'cus_PO5zYeVmRcpb3h','admin',NULL,'r8_UNJDzApzWsrM5cadUuKPq8Oyw2MC5l03c9lmx',NULL,'helloo',1,NULL),(312,'javatp01@gmail.com','$2b$10$7MRZfewQO1OLVODUvWcDWevQf845dwpJMA1mRPWPzf0k7c6C47vSq','javatp01@gmail.com',NULL,0,'2024-03-22 02:31:10',NULL,'1','sub_1OwxuBG7wv77vtTGn9XJbsSW','2024-05-22','price_1Orh5kG7wv77vtTGfZZt5Zc0','cus_PmWwUM12c2nqql',NULL,0,NULL,50,'9b574e058faff68de4d288b12d355dcd',1,'Standard');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29 15:47:01
