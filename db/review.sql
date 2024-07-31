-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hrdb2019
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `star` int NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `view` int NOT NULL DEFAULT '0',
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`rid`),
  KEY `fk_review_orderId` (`orderId`),
  CONSTRAINT `fk_review_orderId` FOREIGN KEY (`orderId`) REFERENCES `payment` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,50,5,'asdf','asdf',8,'2024-07-23 12:08:05'),(2,47,3,'수강후기 테스트','수강후기 테스트\n수강후기 테스트\n수강후기 테스트 수강후기 테스트\n수강후기 테스트\n수강후기 테스트',0,'2024-07-23 12:17:49'),(3,1,2,'test1 / 잠실점 / 수강 후기 테스트','test1 / 잠실점 / 수강 후기 테스트\n\ntest1 / 잠실점 / 수강 후기 테스트\ntest1 / 잠실점 / 수강 후기 테스트\ntest1 / 잠실점 / 수강 후기 테스트\n\n\ntest1 / 잠실점 / 수강 후기 테스트\ntest1 / 잠실점 / 수강 후기 테스트',0,'2024-07-24 10:47:28'),(4,15,1,'test2 / 분당점 / 수강후기 테스트','test2 / 분당점 / 수강후기 테스트\n\ntest2 / 분당점 / 수강후기 테스트\ntest2 / 분당점 / 수강후기 테스트\ntest2 / 분당점 / 수강후기 테스트\n\ntest2 / 분당점 / 수강후기 테스트\ntest2 / 분당점 / 수강후기 테스트\n\ntest2 / 분당점 / 수강후기 테스트',0,'2024-07-24 10:49:10'),(5,41,5,'asd','adsf',0,'2024-07-30 11:08:02');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 14:24:30
