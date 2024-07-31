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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `user_id` varchar(30) NOT NULL,
  `user_pw` varchar(80) NOT NULL,
  `user_name` varchar(10) NOT NULL,
  `phone` char(13) NOT NULL,
  `emailId` varchar(20) NOT NULL,
  `emailDomain` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  `zipcode` char(5) DEFAULT NULL,
  `birth` date NOT NULL,
  `point` int DEFAULT (0),
  `join_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('gong','$2a$07$TD6HuwD18/p1URdk9jqpj.fdGJycwm0QQSefuCcuav3NLdxfPUEzW','공유','010-9877-5678','yoo','naver.com','부산본점','경기 수원시 영통구 광교마을로 156 A동 1403호','16510','1979-07-17',0,'2024-07-25 15:07:03'),('hong','$2a$07$or31T7eoJFSDAQxYO/sJL.hlY6r7Xik8VKefAwUKd0IKyXsRzFv0K','홍길동','010-1234-7866','hong','gmail.com','대구점',' ','','1943-01-11',0,'2024-07-26 16:01:49'),('mija','$2a$07$Ue5gLPUz4pGr1nNnKGfpJ.DwBncIDO1n/jJ.OtskWShDppKvFlkfy','사미자','010-4441-1234','mija4','gmail.com','부산본점','부산 해운대구 동백로 67 101호','48100','1936-03-23',4200,'2024-07-30 12:23:30'),('test','$2a$07$CQh49jH1W3W9OUkhOV8oDuVLE8rRpI7Wavqgj8jj03evvbgUGm2kS','이미자','010-1234-5678','mijalee','gmail.com','건대스타시티점','서울 중랑구 구리포천고속도로 3 101호','02263','1955-06-05',2000,'2024-07-25 12:15:46');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `order_no` int DEFAULT NULL,
  `order_date` date NOT NULL,
  `loc_id` int NOT NULL,
  `course_img` varchar(200) DEFAULT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `teacher_name` varchar(20) NOT NULL,
  `course_start` date NOT NULL,
  `course_end` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `cnumber` int NOT NULL,
  `price` int NOT NULL,
  `total_price` int DEFAULT NULL,
  `point` int DEFAULT NULL,
  `user_name` varchar(10) DEFAULT NULL,
  `user_id` varchar(30) DEFAULT NULL,
  `status` varchar(10) DEFAULT (_utf8mb4'결제완료'),
  `cancel_date` datetime DEFAULT NULL,
  `cancel_info` varchar(100) DEFAULT NULL,
  `isReviewed` tinyint(1) DEFAULT (false),
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=425 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,20240730,'2024-07-30',2,NULL,'집밥만들기','백종원','2024-08-01','2024-08-02','16:00:00','17:30:00',2,22000,NULL,NULL,'이미자','test','결제취소','2024-07-30 14:01:45','컴플레인',0),(2,20240730,'2024-07-30',3,NULL,'일식 만들기','정호영 쉐프','2024-08-11','2024-08-22','13:00:00','17:30:00',5,45000,NULL,NULL,'이미자','test','결제완료',NULL,NULL,0),(114,20240730,'2024-07-30',4,NULL,'테니스 중급','이형택','2024-08-01','2024-08-29','09:00:00','12:30:00',18,1982000,NULL,NULL,'이미자','test','결제완료',NULL,NULL,0),(178,NULL,'2024-07-30',1,NULL,'요가 고급','이효리','2024-08-01','2024-08-01','06:00:00','07:30:00',1,12000,NULL,NULL,'공유','test','결제취소','2024-07-30 12:19:48','이사',0),(215,NULL,'2024-07-30',6,NULL,'테니스 고급','조코비치','2024-08-27','2024-08-29','09:00:00','12:30:00',3,545000,NULL,NULL,'이미자','test','결제완료',NULL,NULL,1),(424,NULL,'2024-07-30',3,NULL,'테니스 초급','이형택','2024-08-01','2024-08-29','13:00:00','17:30:00',20,932000,NULL,NULL,'이미자','test','결제완료',NULL,NULL,1);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hrdb2019'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 15:15:14
