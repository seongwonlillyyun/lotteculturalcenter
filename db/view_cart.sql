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
-- Temporary view structure for view `view_cart`
--

DROP TABLE IF EXISTS `view_cart`;
/*!50001 DROP VIEW IF EXISTS `view_cart`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_cart` AS SELECT 
 1 AS `order_no`,
 1 AS `order_date`,
 1 AS `cart_id`,
 1 AS `loc_id`,
 1 AS `course_img`,
 1 AS `course_name`,
 1 AS `teacher_name`,
 1 AS `course_start`,
 1 AS `course_end`,
 1 AS `start_time`,
 1 AS `end_time`,
 1 AS `cnumber`,
 1 AS `price`,
 1 AS `total_price`,
 1 AS `point`,
 1 AS `user_name`,
 1 AS `user_id`,
 1 AS `status`,
 1 AS `course_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_cart`
--

/*!50001 DROP VIEW IF EXISTS `view_cart`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_cart` AS select 0 AS `order_no`,now() AS `order_date`,`c`.`cart_id` AS `cart_id`,`l`.`loc_id` AS `loc_id`,`cs`.`course_img` AS `course_img`,`cs`.`course_name` AS `course_name`,`cs`.`teacher_name` AS `teacher_name`,left(`cs`.`course_start`,10) AS `course_start`,left(`cs`.`course_end`,10) AS `course_end`,left(`cs`.`start_time`,5) AS `start_time`,left(`cs`.`end_time`,5) AS `end_time`,`cs`.`num_of_course` AS `cnumber`,`cs`.`price` AS `price`,0 AS `total_price`,`m`.`point` AS `point`,`m`.`user_name` AS `user_name`,`m`.`user_id` AS `user_id`,`cs`.`status` AS `status`,`cs`.`course_id` AS `course_id` from (((`course` `cs` join `location` `l` on((`cs`.`loc_id` = `l`.`loc_id`))) join `cart` `c` on((`cs`.`course_id` = `c`.`course_id`))) join `member` `m` on((`c`.`user_id` = `m`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-01 14:09:42
