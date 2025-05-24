/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.1-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: database-2.cls28w4sc51e.us-east-2.rds.amazonaws.com    Database: auditorias
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `aspecto`
--

DROP TABLE IF EXISTS `aspecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspecto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_auditoria` bigint NOT NULL,
  `aspecto` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_aspectoXauditoria` (`id_auditoria`),
  CONSTRAINT `fk_aspectoXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspecto`
--

LOCK TABLES `aspecto` WRITE;
/*!40000 ALTER TABLE `aspecto` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `aspecto` VALUES
(2,38,'1'),
(3,38,'1'),
(4,12,'1'),
(5,26,''),
(6,26,''),
(7,12,'2');
/*!40000 ALTER TABLE `aspecto` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `auditado_plan`
--

DROP TABLE IF EXISTS `auditado_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditado_plan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `auditado` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_auditadoplanXplan` (`id_plan`),
  CONSTRAINT `fk_auditadoplanXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditado_plan`
--

LOCK TABLES `auditado_plan` WRITE;
/*!40000 ALTER TABLE `auditado_plan` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `auditado_plan` VALUES
(2,1,'tomas vega'),
(3,6,'sss'),
(4,2,'rft'),
(5,2,'2rft'),
(6,8,'Emmanuel'),
(8,10,''),
(9,11,'auditados'),
(10,14,'asasa'),
(11,15,'asasa'),
(12,16,'asas'),
(13,18,'sajodjoasjdojas');
/*!40000 ALTER TABLE `auditado_plan` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `fecha` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_auditoriaXplan` (`id_plan`),
  CONSTRAINT `fk_auditoriaXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria`
--

LOCK TABLES `auditoria` WRITE;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `auditoria` VALUES
(1,1,'2025-05-17 17:15:10'),
(12,2,'0000-00-00 00:00:00'),
(13,2,'0000-00-00 00:00:00'),
(14,7,'0000-00-00 00:00:00'),
(15,7,'0000-00-00 00:00:00'),
(16,11,'0000-00-00 00:00:00'),
(17,11,'0000-00-00 00:00:00'),
(18,12,'0000-00-00 00:00:00'),
(19,12,'0000-00-00 00:00:00'),
(20,13,'0000-00-00 00:00:00'),
(21,13,'0000-00-00 00:00:00'),
(22,5,'0000-00-00 00:00:00'),
(23,5,'0000-00-00 00:00:00'),
(24,9,'0000-00-00 00:00:00'),
(25,9,'0000-00-00 00:00:00'),
(26,15,'0000-00-00 00:00:00'),
(27,15,'0000-00-00 00:00:00'),
(28,6,'0000-00-00 00:00:00'),
(29,6,'0000-00-00 00:00:00'),
(30,3,'0000-00-00 00:00:00'),
(31,3,'0000-00-00 00:00:00'),
(32,14,'0000-00-00 00:00:00'),
(33,14,'0000-00-00 00:00:00'),
(34,4,'0000-00-00 00:00:00'),
(35,4,'0000-00-00 00:00:00'),
(36,10,'0000-00-00 00:00:00'),
(37,10,'0000-00-00 00:00:00'),
(38,8,'0000-00-00 00:00:00'),
(39,8,'0000-00-00 00:00:00'),
(40,16,'0000-00-00 00:00:00'),
(41,16,'0000-00-00 00:00:00'),
(42,17,'0000-00-00 00:00:00'),
(43,17,'0000-00-00 00:00:00'),
(44,18,'0000-00-00 00:00:00'),
(45,18,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `auditoriaXlista`
--

DROP TABLE IF EXISTS `auditoriaXlista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoriaXlista` (
  `id_auditoria` bigint NOT NULL,
  `id_listaverificacion` bigint NOT NULL,
  `cumple` tinyint(1) NOT NULL,
  `aplica` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_auditoria`,`id_listaverificacion`),
  KEY `fk_auditoriaXlistaXlista` (`id_listaverificacion`),
  CONSTRAINT `fk_auditoriaXlistaXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_auditoriaXlistaXlista` FOREIGN KEY (`id_listaverificacion`) REFERENCES `lista_verificacion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoriaXlista`
--

LOCK TABLES `auditoriaXlista` WRITE;
/*!40000 ALTER TABLE `auditoriaXlista` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `auditoriaXlista` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `compromiso`
--

DROP TABLE IF EXISTS `compromiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `compromiso` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_auditoria` bigint NOT NULL,
  `compromiso` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_limite` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `responsable` varchar(70) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_compromisoXauditoria` (`id_auditoria`),
  CONSTRAINT `fk_compromisoXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compromiso`
--

LOCK TABLES `compromiso` WRITE;
/*!40000 ALTER TABLE `compromiso` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `compromiso` VALUES
(1,1,'hacer algo','2025-05-23 08:48:00','a quien toque'),
(2,38,'1','2025-05-30 14:54:00','1'),
(3,12,'1','2025-05-29 13:54:00','1'),
(4,12,'2','2025-05-30 09:16:00','2');
/*!40000 ALTER TABLE `compromiso` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `debilidad`
--

DROP TABLE IF EXISTS `debilidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `debilidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_auditoria` bigint NOT NULL,
  `falta` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_debilidadXauditoria` (`id_auditoria`),
  CONSTRAINT `fk_debilidadXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debilidad`
--

LOCK TABLES `debilidad` WRITE;
/*!40000 ALTER TABLE `debilidad` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `debilidad` VALUES
(5,1,'1'),
(6,38,'1'),
(7,12,'1'),
(8,26,'se debe inculcar valores institucionales en codigo de vestimenta'),
(9,12,'Cualquier usuario puede acceder a recursos sin restricción clara.'),
(10,12,'No hay registros de capacitación o solo se imparte ocasionalmente.');
/*!40000 ALTER TABLE `debilidad` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `document` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_documentoXplan` (`id_plan`),
  CONSTRAINT `fk_documentoXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `fortaleza`
--

DROP TABLE IF EXISTS `fortaleza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `fortaleza` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_auditoria` bigint NOT NULL,
  `virtud` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fortalezaXauditoria` (`id_auditoria`),
  CONSTRAINT `fk_fortalezaXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fortaleza`
--

LOCK TABLES `fortaleza` WRITE;
/*!40000 ALTER TABLE `fortaleza` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `fortaleza` VALUES
(1,1,'Todo el personal ha recibido capacitación en los últimos 12 meses.'),
(2,1,'dsadasd'),
(3,1,'3'),
(4,1,'4'),
(5,38,'1'),
(6,12,'1'),
(7,26,''),
(8,12,'La política está disponible para todos los empleados y se revisa anualmente.'),
(9,12,'se comprueba correcta vestimenta'),
(10,12,'La política está disponible para todos los empleados y se revisa anualmente.');
/*!40000 ALTER TABLE `fortaleza` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `itinerario`
--

DROP TABLE IF EXISTS `itinerario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `actividad` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `auditado` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `auditor` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inicio` time DEFAULT NULL,
  `fin` time DEFAULT NULL,
  `lugar` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_itinerarioXplan` (`id_plan`),
  CONSTRAINT `fk_itinerarioXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerario`
--

LOCK TABLES `itinerario` WRITE;
/*!40000 ALTER TABLE `itinerario` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `itinerario` VALUES
(1,1,'contar asistentes','ortega','mateo','12:34:00','12:46:23','salon de juntas'),
(2,1,'repartir merienda','santiago','maria','12:50:00','01:00:34','salon de juntas'),
(3,1,'actividad','auditado','auditor','00:00:00','00:00:00','lugar'),
(4,6,'actividad','auditado','auditor','00:00:00','00:00:00','lugar'),
(5,7,'actividad','auditado','auditor','00:00:00','00:00:00','lugar'),
(6,2,'ac','ad','ad','00:00:00','00:00:00','lg'),
(7,8,'verificcar','ad','ad','00:00:00','00:00:00','clase'),
(8,9,'verificcar','ad','ad','00:00:00','00:00:00','clase'),
(9,10,'1','','','00:00:00','00:00:00',''),
(10,11,'actividad','auditado','auditor','00:00:00','00:00:00','lugar'),
(11,13,'d','ad','auditor','00:00:00','00:00:00','lg'),
(12,14,'asassa','asasas','asasas','00:00:00','00:00:00','sasas'),
(13,15,'sasas','asasa','asasa','00:00:00','00:00:00','asasa'),
(14,16,'asasa','asas','asasas','00:00:00','00:00:00',''),
(15,2,'algo','algoa','algo','00:00:00','00:00:00','algo'),
(16,18,'actividad2','auditado','algo','07:00:00','08:00:00','culaquie4ra');
/*!40000 ALTER TABLE `itinerario` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `lista_verificacion`
--

DROP TABLE IF EXISTS `lista_verificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_verificacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(700) COLLATE utf8mb4_general_ci NOT NULL,
  `cumplimiento` varchar(700) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `incumplimiento` varchar(700) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_verificacion`
--

LOCK TABLES `lista_verificacion` WRITE;
/*!40000 ALTER TABLE `lista_verificacion` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `lista_verificacion` VALUES
(1,'vestimenta en cumplimiento con estandares organizacionales','se comprueba correcta vestimenta','se debe inculcar valores institucionales en codigo de vestimenta'),
(7,'Se ha definido una política de seguridad de la información accesible y revisada periódicamente.','La política está disponible para todos los empleados y se revisa anualmente.','No existe una política formal o no se revisa regularmente.'),
(8,'Existe un control de acceso basado en roles y necesidades del negocio.','Los accesos están restringidos según el rol y documentados.','Cualquier usuario puede acceder a recursos sin restricción clara.'),
(9,'Se realiza capacitación en seguridad de la información para todo el personal.','Todo el personal ha recibido capacitación en los últimos 12 meses.','No hay registros de capacitación o solo se imparte ocasionalmente.'),
(10,'Se realiza gestión de activos con inventario actualizado de equipos y datos.','Existe un inventario formal actualizado y auditado.','No hay registro claro de activos o el inventario está desactualizado.'),
(11,'Los dispositivos móviles están protegidos mediante cifrado y autenticación.','Todos los dispositivos móviles tienen cifrado y bloqueo de pantalla configurado.','Algunos dispositivos no están cifrados o no requieren autenticación.'),
(12,'Se han establecido procedimientos para la gestión de incidentes de seguridad.','Existe un protocolo claro de notificación y respuesta ante incidentes.','No hay un proceso definido para tratar incidentes de seguridad.'),
(13,'Las copias de seguridad se realizan regularmente y se prueban.','Se hacen backups diarios y se validan mensualmente.','No hay pruebas de respaldo o las copias no son frecuentes.'),
(14,'Se han definido responsabilidades claras en materia de seguridad.','Cada rol tiene definidas sus obligaciones respecto a la seguridad.','No están definidas las responsabilidades o son ambiguas.'),
(15,'Se protege la red interna mediante firewalls y sistemas de detección.','La red está segmentada y protegida con herramientas activas.','No hay controles de red adecuados o están mal configurados.'),
(16,'Se realiza revisión periódica de accesos a sistemas críticos.','Los accesos se auditan trimestralmente y se revocan los innecesarios.','No se revisan accesos o se mantienen activos usuarios inactivos.');
/*!40000 ALTER TABLE `lista_verificacion` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `oportunidad`
--

DROP TABLE IF EXISTS `oportunidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `oportunidad` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_auditoria` bigint NOT NULL,
  `oportunidad` varchar(400) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_oportunidadXauditoria` (`id_auditoria`),
  CONSTRAINT `fk_oportunidadXauditoria` FOREIGN KEY (`id_auditoria`) REFERENCES `auditoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oportunidad`
--

LOCK TABLES `oportunidad` WRITE;
/*!40000 ALTER TABLE `oportunidad` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `oportunidad` VALUES
(1,1,'esta es una oportunidad de mejora'),
(3,1,'2'),
(4,38,'1'),
(5,12,'1'),
(6,12,'2');
/*!40000 ALTER TABLE `oportunidad` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `personal_auditor`
--

DROP TABLE IF EXISTS `personal_auditor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_auditor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `personal` varchar(70) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personalauditorXplan` (`id_plan`),
  CONSTRAINT `fk_personalauditorXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_auditor`
--

LOCK TABLES `personal_auditor` WRITE;
/*!40000 ALTER TABLE `personal_auditor` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `personal_auditor` VALUES
(1,1,'camilos'),
(2,1,'ochoas');
/*!40000 ALTER TABLE `personal_auditor` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alcance` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `proceso` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lider_proceso` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `auditor_lider` bigint DEFAULT NULL,
  `auditor` bigint DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_control` timestamp NULL DEFAULT NULL,
  `estado` varchar(60) COLLATE utf8mb4_general_ci DEFAULT 'programado',
  `subtipo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_planAUXtrabajador` (`auditor`),
  KEY `fk_planAULiderXtrabajador` (`auditor_lider`),
  CONSTRAINT `fk_planAULiderXtrabajador` FOREIGN KEY (`auditor_lider`) REFERENCES `trabajador` (`id`),
  CONSTRAINT `fk_planAUXtrabajador` FOREIGN KEY (`auditor`) REFERENCES `trabajador` (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `plan` VALUES
(1,'interna','revision vestimenta','revision conductual en implementacion de una presentacion acorde a los valores institucionales','RRHH','mateo arias',1,5,'2025-05-10 20:30:00',NULL,'programado','jeje jejej jejej jajaja'),
(2,'interna',' ttjh','szs','ssss','ssss',5,5,'2025-05-07 23:41:00',NULL,'programado',NULL),
(3,'interna',' ','szs','','',NULL,NULL,'0000-00-00 00:00:00',NULL,NULL,NULL),
(4,NULL,' Nombre Auditoria',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(5,NULL,' Nombre Auditoria',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(6,'interna','este deberia tener ya una aud',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(7,'interna','otro testing','revision conductual en implementacion de una presentacion acorde a los valores institucionales',NULL,NULL,7,7,NULL,NULL,'szs',NULL),
(8,'interna','revision frontend','verificar estado funcional del frontend','desarrollo','Emmanuel',NULL,NULL,'2025-05-20 08:10:00',NULL,NULL,NULL),
(9,'interna','revision frontend','verificar estado funcional del frontend','desarrollo','Emmanuel',NULL,NULL,'2025-05-20 08:10:00',NULL,'programado',NULL),
(10,'interna','1','1','desarrollo','ssss',NULL,NULL,'2026-09-17 09:49:00',NULL,NULL,NULL),
(11,'interna','nombre','alcance','procesos','lider',NULL,NULL,'2025-05-08 09:15:00',NULL,NULL,NULL),
(12,'interna',' Nombre Auditoria','revision conductual en implementacion de una presentacion acorde a los valores institucionales','sdfsd','fdfd',5,5,'2025-05-07 00:26:00',NULL,'programada',NULL),
(13,'interna',' ttjh','','','',1,1,'0000-00-00 00:00:00',NULL,'',NULL),
(14,'interna','Juanes estebamn','asasas','asas','JMarioaaaa',1,1,'2025-05-15 02:21:00',NULL,'kakakaka',NULL),
(15,'interna','Juanes estebamn','kakakakakak','sadad','DANIDANILAMARRAJs',5,1,'2025-05-08 03:34:00',NULL,'kakakaka',NULL),
(16,'interna','dadsasda','assasasa','assas','ryan castro',7,7,'2025-05-16 14:10:00',NULL,'aasasas',NULL),
(17,'interna','Lenin','sdsddsd','sdds','sdsd',1,7,'2025-05-18 08:46:00',NULL,'',NULL),
(18,'interna','Santiago','szs nada','asdsadassadasd','asdsadsad',5,1,'2025-05-08 09:24:00',NULL,'szs',NULL);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `proposito`
--

DROP TABLE IF EXISTS `proposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proposito` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `descripcion` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tk_propositoXplan` (`id_plan`),
  CONSTRAINT `tk_propositoXplan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposito`
--

LOCK TABLES `proposito` WRITE;
/*!40000 ALTER TABLE `proposito` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `proposito` VALUES
(3,6,'ssssss'),
(4,6,'2ssss'),
(5,7,'ssssss'),
(6,7,'2ssss'),
(7,2,'prpio'),
(8,8,'verificar las diferentes secciones del frontend de el comite'),
(9,8,'revisar funcionalidad de la parte visual'),
(10,8,'verificar conectividad con DB en nube'),
(11,9,'verificar las diferentes secciones del frontend de el comite'),
(12,10,'1'),
(13,11,'proposito'),
(14,14,'asasas'),
(15,15,'asdada'),
(16,2,'otro proposito'),
(17,18,'Arreglar todo');
/*!40000 ALTER TABLE `proposito` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `reunion`
--

DROP TABLE IF EXISTS `reunion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reunion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_plan` bigint NOT NULL,
  `fecha` date NOT NULL DEFAULT '2025-01-01',
  `hora` time NOT NULL,
  `lugar` varchar(60) COLLATE utf8mb4_general_ci DEFAULT ' ',
  `apertura` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_reunion_plan` (`id_plan`),
  CONSTRAINT `fk_reunion_plan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reunion`
--

LOCK TABLES `reunion` WRITE;
/*!40000 ALTER TABLE `reunion` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `reunion` VALUES
(1,1,'2025-05-10','12:00:00','sede medellin',1),
(2,3,'0000-00-00','00:00:00','lugar',0),
(4,10,'0000-00-00','00:00:00','lugar',0),
(6,7,'0000-00-00','00:00:00','lugar',0),
(7,11,'0000-00-00','00:00:00','lugar',1),
(8,13,'0000-00-10','00:00:00','lugar',0),
(9,14,'0000-00-00','00:00:00','lugar',1),
(10,15,'0000-00-00','00:00:00','lugar',1),
(11,2,'0000-00-00','00:00:00','lugar',1),
(12,16,'0000-00-00','00:00:00','lugar',0),
(13,9,'2025-05-27','10:00:00','Medellín',0),
(14,2,'0000-00-00','00:00:00','cualquier maricada',0),
(15,18,'2025-05-07','12:00:00','Medellin',0);
/*!40000 ALTER TABLE `reunion` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `sector` VALUES
(1,'rrhh3'),
(6,'hola');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `trabajador`
--

DROP TABLE IF EXISTS `trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajador` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_sector` bigint NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `celular` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `correo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1234',
  PRIMARY KEY (`id`),
  KEY `fk_trabajadorXsector` (`id_sector`),
  CONSTRAINT `fk_trabajadorXsector` FOREIGN KEY (`id_sector`) REFERENCES `sector` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajador`
--

LOCK TABLES `trabajador` WRITE;
/*!40000 ALTER TABLE `trabajador` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `trabajador` VALUES
(1,1,'mateo suarez','3333333','t@t.com','1234'),
(5,1,'juan vernaza','44444','dd','1234'),
(7,1,'1','1234567890','1@1.com','1234');
/*!40000 ALTER TABLE `trabajador` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-23 22:57:19
