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
INSERT INTO `member` VALUES ('gong','$2a$07$TD6HuwD18/p1URdk9jqpj.fdGJycwm0QQSefuCcuav3NLdxfPUEzW','공유','010-9877-5678','yoo','naver.com','부산본점','경기 수원시 영통구 광교마을로 156 A동 1403호','16510','1979-07-17',0,'2024-07-25 15:07:03'),('hong','$2a$07$or31T7eoJFSDAQxYO/sJL.hlY6r7Xik8VKefAwUKd0IKyXsRzFv0K','홍길동','010-1234-7866','hong','gmail.com','대구점',' ','','1943-01-11',0,'2024-07-26 16:01:49'),('test','$2a$07$CQh49jH1W3W9OUkhOV8oDuVLE8rRpI7Wavqgj8jj03evvbgUGm2kS','이미자','010-1234-5678','mijalee','gmail.com','강남점','서울 중랑구 구리포천고속도로 3 101호','02263','1955-06-05',2000,'2024-07-25 12:15:46');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 11:09:39

select * from member;
update member set point = 4200 where user_id ='mija';

update member set address = '강원도', phone = '010-1234-5541'
where user_id ='hong';
