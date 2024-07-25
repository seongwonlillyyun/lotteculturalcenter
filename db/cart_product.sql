-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: junghye
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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `user_id` varchar(30) DEFAULT NULL,
  `cdate` date DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'test','2024-07-18'),(2,2,'test','2024-07-18'),(3,3,'test','2024-07-19');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `course_id` int NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `loc_id` int DEFAULT NULL,
  `csid` int DEFAULT NULL,
  `course_img` varchar(200) DEFAULT NULL,
  `course_name` varchar(100) NOT NULL,
  `course_summary` varchar(500) DEFAULT NULL,
  `course_content` varchar(5000) NOT NULL,
  `course_note` varchar(5000) DEFAULT NULL,
  `course_schedule` varchar(5000) DEFAULT NULL,
  `teacher_name` varchar(20) NOT NULL,
  `course_start` date NOT NULL,
  `course_end` date NOT NULL,
  `course_week` char(1) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `num_of_course` int NOT NULL,
  `num_of_people` int NOT NULL,
  `price` int NOT NULL,
  `apply_start` date NOT NULL,
  `apply_end` date NOT NULL,
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'접수중',1,1,'강좌이미지','패밀리 오감놀이 리틀킹콩','본 강좌는 보호자2인_자녀1인 수업입니다.','강좌내용','특이사항','강의일정','강사명','2024-06-23','2024-07-11','월','13:00:00','15:00:00',2,10,6000,'2024-06-23','2024-06-23','2024-07-18 17:47:34'),(2,'접수중',2,1,'강좌이미지','이연복의 어향동고','어향동고 맛있음','강좌내용','특이사항','강의일정','강사명','2024-06-23','2024-07-11','월','13:00:00','15:00:00',2,10,5000,'2024-06-23','2024-06-23','2024-07-18 17:47:35'),(3,'접수중',1,1,'강좌이미지','카트 테스트','카트','강좌내용','특이사항','강의일정','강사명','2024-06-23','2024-07-11','월','13:00:00','15:00:00',2,10,2000,'2024-06-23','2024-06-23','2024-07-19 17:10:03');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-25 14:31:53
