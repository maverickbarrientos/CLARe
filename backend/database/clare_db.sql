-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: clare_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cancellation_requests`
--

DROP TABLE IF EXISTS `cancellation_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancellation_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `reservation_id` int NOT NULL,
  `cancellation_reason` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT NULL,
  `admin_note` text,
  `handled_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `'reservation_fk1'_idx` (`reservation_id`),
  KEY `'user_fk1'_idx` (`user_id`),
  CONSTRAINT `'reservation_fk1'` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `'user_fk1'` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancellation_requests`
--

LOCK TABLES `cancellation_requests` WRITE;
/*!40000 ALTER TABLE `cancellation_requests` DISABLE KEYS */;
INSERT INTO `cancellation_requests` VALUES (6,21,47,'test cancel','2026-03-21 05:23:53','rejected','No','2026-03-21 05:34:44');
/*!40000 ALTER TABLE `cancellation_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `computer_labs`
--

DROP TABLE IF EXISTS `computer_labs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `computer_labs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lab_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `computer_labs`
--

LOCK TABLES `computer_labs` WRITE;
/*!40000 ALTER TABLE `computer_labs` DISABLE KEYS */;
INSERT INTO `computer_labs` VALUES (1,'Computer Lab 92','Sikan Plor',67),(5,'CL8','ML501',69),(7,'Computer Lab 5','BED, building, 2nd floor',55),(8,'Computer  lab 3','BED,2nd floor',60),(9,'Computer  lab 5','BED,2nd floor',40);
/*!40000 ALTER TABLE `computer_labs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lab_class`
--

DROP TABLE IF EXISTS `lab_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lab_class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lab_id` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `teacher` varchar(255) DEFAULT NULL,
  `day` enum('monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lab_class_ibfk_1_idx` (`lab_id`),
  CONSTRAINT `lab_class_ibfk_1` FOREIGN KEY (`lab_id`) REFERENCES `computer_labs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_class`
--

LOCK TABLES `lab_class` WRITE;
/*!40000 ALTER TABLE `lab_class` DISABLE KEYS */;
INSERT INTO `lab_class` VALUES (8,9,'ITE 400','BSIT 2-8','CITE','KURT ELLLE','thursday','10:30:00','12:30:00'),(9,9,'ITE 393','BSIT 2-1','CITE','LAMPA','thursday','13:30:00','16:30:00');
/*!40000 ALTER TABLE `lab_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr_codes`
--

DROP TABLE IF EXISTS `qr_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr_codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int DEFAULT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `qr_value` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `status` enum('valid','invalid','expired') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservation_id_UNIQUE` (`reservation_id`),
  CONSTRAINT `qr_code_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_codes`
--

LOCK TABLES `qr_codes` WRITE;
/*!40000 ALTER TABLE `qr_codes` DISABLE KEYS */;
INSERT INTO `qr_codes` VALUES (53,41,'69bc61025c7cd75eb85e5a40','34edd62d-9c6f-495c-8b52-c646def7c03c','https://ik.imagekit.io/vcgnutkh9/34edd62d-9c6f-495c-8b52-c646def7c03c_mUubgC-AX.png','2026-03-19 21:03:35','2026-03-25 05:33:00','valid'),(59,47,'69bdb4fc5c7cd75eb8bc2fcd','83a4125b-21cb-4ad0-9b80-dcf2a669b6aa','https://ik.imagekit.io/vcgnutkh9/83a4125b-21cb-4ad0-9b80-dcf2a669b6aa_K-pET-I50.png','2026-03-20 21:14:09','2026-03-24 10:30:00','invalid'),(60,48,'69bdf3d25c7cd75eb8329a47','5788b733-7f96-45d9-8847-cf46c88721ed','https://ik.imagekit.io/vcgnutkh9/5788b733-7f96-45d9-8847-cf46c88721ed_sW7q_ak37.png','2026-03-21 01:42:13','2026-03-29 10:11:00','invalid');
/*!40000 ALTER TABLE `qr_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `lab_id` int DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reservation_description` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` enum('pending','reserved','rejected','in_use','cancelled','cancellation_requested','completed') DEFAULT NULL,
  `reject_reason` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `lab_id` (`lab_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`lab_id`) REFERENCES `computer_labs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (7,12,1,'Maverick Jade Barrientos','CAHS','maverickjadebarrientos@gmail.com','Code Craft','2026-09-15 14:25:40','2026-09-15 14:25:40','reserved',NULL),(13,12,1,'Maverick Barrientos','CAHS','maverick@gmail.com','123','2026-04-01 23:33:00','2026-04-02 23:34:00','in_use',NULL),(23,12,1,'ahaha','CITE','aaaa','jahahhaa','2026-04-04 01:20:00','2026-04-04 01:21:00','in_use',NULL),(41,12,5,'aaaaaaa','hh','drenzsabordo@gmail.com','aaaaaaa','2026-03-25 05:03:00','2026-03-25 05:03:00','reserved',NULL),(43,12,5,'Brix Betamor','CAHS','maveqt00@gmail.com','aaaaaaaaaaaaaaaaaaaaaaaaa','2026-03-27 06:29:00','2026-03-20 19:14:00','completed',''),(47,21,5,'Maverick Jade Barrientos','CITE','maba.barrientos.ui@phinmaed.com','ma meeting kami','2026-03-24 10:00:00','2026-03-24 11:00:00','in_use',NULL),(48,12,7,'Maverick Jade Barrientos','CITE','maveqt00@gmail.com','ASASASA','2026-03-29 09:41:00','2026-03-29 11:41:00','in_use',NULL);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `hashed_password` varchar(1024) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'jamesreid@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$fGjOGpXQLCjo3KtoK6PoOw$dLo0KO8Qn3PNH38oH+J1+bPek7fRH2kAIJzMvc1LJ60',1,1,0),(13,'maverickjade@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$c/g1MtuErHffmeocSlcM5Q$0DHWrMNC6CgpDyrbeE0G9NJl6aO+vilVInyZiXKAGI8',1,1,0),(16,'maverickjadee@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$vr8OUr9RpBg+3MP7Iv6HOQ$Qsivhe/GbEdVUB505jqn3arMZ9wqx+1G4wOmRw2oMac',1,0,0),(17,'drenzsabordo@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$5F+75wi+PFIRlKu0kstF7Q$DWN+KPW9PAWeY8wdJ4JvKKgSkU6Rcnj+IixHSLSOrCM',1,0,0),(18,'geoffgarzon@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$rSqDa40u6jNvZR7YAmJZeA$LYu6VXETV0g9QDbuR0SgPqWiinA96LJ2+La8d4Np2/w',1,0,0),(20,'maverick@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$SbYV3328mj8+p6woONXG6A$Ef9kFre5sq8Cx9UONUG8uatmhVQ4ku5wS1UyR32wrLE',1,1,0),(21,'maba.barrientos.ui@phinmaed.com','$argon2id$v=19$m=65536,t=3,p=4$Zz8xmJegmvTi5zWxkxABLg$sVv05pexCK6+9yS0bN1mQZ0dXZJ3galvTesP7ksFV/I',1,0,0),(22,'sample@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$kyFJsS2PeT9lDpkXQj0qVA$Z33+S03FiiJDicfqPIpm5TrEupK+5hjevu2U105n4R8',1,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_information`
--

DROP TABLE IF EXISTS `users_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_information_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_information`
--

LOCK TABLES `users_information` WRITE;
/*!40000 ALTER TABLE `users_information` DISABLE KEYS */;
INSERT INTO `users_information` VALUES (7,12,'James ','Reid','CAS'),(8,13,'Maverick Jade','Barrientos','CITE'),(9,16,'Maverick ','Barrientos','CITE'),(10,17,'D-Renz','Sabordo','CITE'),(11,18,'Geoff','Garzon','CITE'),(12,NULL,'Maverick','Barrientos','BSIT'),(13,20,'Maverick','Barrientos','BSIT'),(14,21,'Maverick Jade','Barrientos','CITE'),(15,22,'sample','sample ','CITE');
/*!40000 ALTER TABLE `users_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-22 23:58:53
