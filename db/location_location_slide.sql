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
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `loc_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `addr` varchar(200) NOT NULL,
  `addr_detail` varchar(200) NOT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'서울점','잠실점','서울 송파구 올림픽로 240','롯데백화점 잠실점 12층','02-411-5785',37.5113,127.098,'2024-07-02 17:34:00'),(2,'서울점','본점','서울 중구 소공동 1','롯데백화점 지하1층','02-726-4151~2',37.5648,126.981,'2024-07-02 17:34:35'),(3,'서울점','강남점','서울 강남구 선릉로62길 28','롯데백화점 강남점 문화센터 데스크 : 3층','02-531-2100',37.4976,127.055,'2024-07-02 17:35:17'),(4,'서울점','건대스타시티점','서울 광진구 능동로 92','롯데백화점 건대스타시티점 스타시티몰 3층','02-2218-2760~1',37.539,127.071,'2024-07-02 17:35:55'),(5,'수도권점','인천','인천 미추홀구 연남로 35','롯데백화점 인천점 5층 문화센터','032-242-2930~1',37.4425,126.702,'2024-07-02 17:38:03'),(6,'수도권점','동탄점','경기 화성시 동탄역로 160','롯데백화점 동탄점 B2F','031-8036-2403~4',37.2007,127.098,'2024-07-02 17:38:41'),(7,'수도권점','구리점','경기 구리시 경춘로 261','롯데백화점 구리점 9층 문화센터','031-550-7700',37.6027,127.144,'2024-07-02 17:39:35'),(8,'수도권점','분당점','경기 성남시 분당구 황새울로200번길 45','롯데백화점 분당점 7층','031-738-2700',37.3784,127.114,'2024-07-02 17:40:15'),(9,'지방점','부산본점','부산 부산진구 가야대로 772','롯데백화점 부산본점 11층','051-810-2351~2',35.1568,129.056,'2024-07-02 17:40:58'),(10,'지방점','광복점','부산 중구 중앙대로 2','롯데백화점 광복점 아쿠아몰 10층','051-678-2351~3',35.098,129.037,'2024-07-02 17:41:31'),(11,'지방점','광주점','광주 동구 독립로 268','롯데백화점 광주점 11층','062-221-1811~2',35.1546,126.912,'2024-07-02 17:42:02'),(12,'지방점','대구점','대구 북구 태평로 161','롯데백화점 대구점 10층','053-660-1132~3',35.8759,128.596,'2024-07-02 17:42:34');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_slide`
--

DROP TABLE IF EXISTS `location_slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_slide` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `loc_id` int NOT NULL,
  `img_path` varchar(200) NOT NULL,
  PRIMARY KEY (`img_id`),
  KEY `fk_location_slide_loc_id` (`loc_id`),
  CONSTRAINT `fk_location_slide_loc_id` FOREIGN KEY (`loc_id`) REFERENCES `location` (`loc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_slide`
--

LOCK TABLES `location_slide` WRITE;
/*!40000 ALTER TABLE `location_slide` DISABLE KEYS */;
INSERT INTO `location_slide` VALUES (1,1,'uploads\\location\\1720376260131_jamsil_001.jpg'),(2,1,'uploads\\location\\1720102361049_jamsil_002.jpg'),(3,1,'uploads\\location\\1720884984279_jamsil_003.jpg'),(4,1,'uploads\\location\\1720578616963_jamsil_004.jpg'),(5,1,'uploads\\location\\1720159114833_jamsil_005.jpg'),(6,2,'uploads\\location\\1720177519670_ori_001.jpg'),(7,2,'uploads\\location\\1720335371759_ori_002.jpg'),(8,2,'uploads\\location\\1720048651485_ori_004.jpg'),(9,2,'uploads\\location\\1720544507999_ori_005.jpg'),(10,2,'uploads\\location\\1719927641247_ori_003.jpg'),(11,3,'uploads\\location\\1719956508303_gangname_001.jpg'),(12,3,'uploads\\location\\1720722593955_gangname_002.jpg'),(13,3,'uploads\\location\\1720152906244_gangname_003.jpg'),(14,3,'uploads\\location\\1720627730496_gangname_004.jpg'),(15,3,'uploads\\location\\1720516015393_gangname_005.jpg'),(16,4,'uploads\\location\\1720798056744_starcity_001.jpg'),(17,4,'uploads\\location\\1720525264894_starcity_002.jpg'),(18,4,'uploads\\location\\1720671297567_starcity_003.jpg'),(19,4,'uploads\\location\\1720023092948_starcity_004.jpg'),(20,4,'uploads\\location\\1720621566158_starcity_005.jpg'),(21,5,'uploads\\location\\1720151600813_incheon_001.jpg'),(22,5,'uploads\\location\\1720889464932_incheon_002.jpg'),(23,5,'uploads\\location\\1719997607951_incheon_003.jpg'),(24,5,'uploads\\location\\1720107095017_incheon_004.jpg'),(25,5,'uploads\\location\\1720332025472_incheon_005.jpg'),(26,6,'uploads\\location\\1720419275587_dongtan_001.jpg'),(27,6,'uploads\\location\\1720703821404_dongtan_002.jpg'),(28,6,'uploads\\location\\1720362486125_dongtan_003.jpg'),(29,6,'uploads\\location\\1720424888024_dongtan_004.jpg'),(30,6,'uploads\\location\\1720550159718_dongtan_005.jpg'),(31,7,'uploads\\location\\1719926942936_guri_001.jpg'),(32,7,'uploads\\location\\1720419800037_guri_002.jpg'),(33,7,'uploads\\location\\1720068886940_guri_003.jpg'),(34,7,'uploads\\location\\1720622760060_guri_004.jpg'),(35,7,'uploads\\location\\1720400504693_guri_005.jpg'),(36,8,'uploads\\location\\1720233430133_bundang_002.jpg'),(37,8,'uploads\\location\\1720250528787_bundang_004.jpg'),(38,8,'uploads\\location\\1720300181599_bundang_005.jpg'),(39,8,'uploads\\location\\1720121549894_bundang_001.jpg'),(40,8,'uploads\\location\\1720448576724_bundang_003.jpg'),(41,9,'uploads\\location\\1720595528622_busan_001.jpg'),(42,9,'uploads\\location\\1719923108254_busan_002.jpg'),(43,9,'uploads\\location\\1720584125897_busan_003.jpg'),(44,9,'uploads\\location\\1719970193723_busan_004.jpg'),(45,9,'uploads\\location\\1720379177701_busan_005.jpg'),(46,10,'uploads\\location\\1720212832345_gwangbok_001.jpg'),(47,10,'uploads\\location\\1720161680147_gwangbok_002.jpg'),(48,10,'uploads\\location\\1720277267133_gwangbok_003.jpg'),(49,10,'uploads\\location\\1720902496562_gwangbok_004.jpg'),(50,10,'uploads\\location\\1720586008439_gwangbok_005.jpg'),(51,11,'uploads\\location\\1720750645972_gwangju_001.jpg'),(52,11,'uploads\\location\\1720790334932_gwangju_002.jpg'),(53,11,'uploads\\location\\1720695843857_gwangju_003.jpg'),(54,11,'uploads\\location\\1720019495199_gwangju_004.jpg'),(55,11,'uploads\\location\\1720030404235_gwangju_005.jpg'),(56,12,'uploads\\location\\1720192948409_daegu_001.jpg'),(57,12,'uploads\\location\\1720180153652_daegu_002.jpg'),(58,12,'uploads\\location\\1720544202089_daegu_003.jpg'),(59,12,'uploads\\location\\1720875506689_daegu_004.jpg'),(60,12,'uploads\\location\\1719919355838_daegu_005.jpg');
/*!40000 ALTER TABLE `location_slide` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-02 17:43:42
