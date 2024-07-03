-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2024 at 09:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbhrmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `affil`
--

CREATE TABLE `affil` (
  `id` int(11) NOT NULL,
  `Affilname` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `affil`
--

INSERT INTO `affil` (`id`, `Affilname`) VALUES
(1, 'องค์การบริหารสวนตำบลบ้านโคก สำนักการศึกษามัธยมศึกษาเขต1');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `salaryId` int(11) NOT NULL,
  `incometax` double DEFAULT NULL,
  `GPF` double DEFAULT NULL,
  `CPS` double DEFAULT NULL,
  `Student` double DEFAULT NULL,
  `GHBank` double DEFAULT NULL,
  `Krungthai` double DEFAULT NULL,
  `Nakho` double DEFAULT NULL,
  `SavingsBank` double DEFAULT NULL,
  `PHSC` double DEFAULT NULL,
  `PAOC` double DEFAULT NULL,
  `Welfarefund` double DEFAULT NULL,
  `PAOF` double DEFAULT NULL,
  `TeachersCoop` double DEFAULT NULL,
  `IslamicBank` double DEFAULT NULL,
  `socialsecurity` double DEFAULT NULL,
  `Salarydropped` double DEFAULT NULL,
  `WiratCoop` double DEFAULT NULL,
  `AFCM` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `salaryId`, `incometax`, `GPF`, `CPS`, `Student`, `GHBank`, `Krungthai`, `Nakho`, `SavingsBank`, `PHSC`, `PAOC`, `Welfarefund`, `PAOF`, `TeachersCoop`, `IslamicBank`, `socialsecurity`, `Salarydropped`, `WiratCoop`, `AFCM`) VALUES
(1, 1, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 500),
(2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `AffilId` int(11) DEFAULT NULL,
  `Groupname` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `AffilId`, `Groupname`) VALUES
(1, 1, 'ตำบลบ้านโคก อำเภอเมือง จังหวัดมุกดาหาร');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `userId`) VALUES
(1, 2),
(2, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `newpositionuser`
--

CREATE TABLE `newpositionuser` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `newposition` varchar(191) DEFAULT NULL,
  `newlevel` varchar(191) DEFAULT NULL,
  `newsalary` int(11) DEFAULT NULL,
  `dateUpdate` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `newpositionuser`
--

INSERT INTO `newpositionuser` (`id`, `userId`, `newposition`, `newlevel`, `newsalary`, `dateUpdate`) VALUES
(1, 2, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-22 13:29:15'),
(2, 3, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-23 14:23:44'),
(3, 4, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-23 14:23:44');

-- --------------------------------------------------------

--
-- Table structure for table `originalpos`
--

CREATE TABLE `originalpos` (
  `id` int(11) NOT NULL,
  `NewpositionUserId` int(11) DEFAULT NULL,
  `Startdate` varchar(191) DEFAULT NULL,
  `stopdate` varchar(191) DEFAULT NULL,
  `origipos` varchar(191) DEFAULT NULL,
  `oldlevel` varchar(191) DEFAULT NULL,
  `oldsalary` int(11) DEFAULT NULL,
  `dateUpdate` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `originalpos`
--

INSERT INTO `originalpos` (`id`, `NewpositionUserId`, `Startdate`, `stopdate`, `origipos`, `oldlevel`, `oldsalary`, `dateUpdate`) VALUES
(1, 1, NULL, NULL, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-22 09:48:45'),
(2, 1, NULL, NULL, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-22 13:29:15'),
(3, 2, NULL, NULL, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-23 14:23:44'),
(4, 3, NULL, NULL, 'งานราชการ', 'ชำนวญ', 15000, '2024-01-23 14:23:44');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `GroupId` int(11) DEFAULT NULL,
  `PostypeId` int(11) DEFAULT NULL,
  `Codes` int(11) DEFAULT NULL,
  `Posnames` varchar(191) DEFAULT NULL,
  `levels` varchar(191) DEFAULT NULL,
  `salarys` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `GroupId`, `PostypeId`, `Codes`, `Posnames`, `levels`, `salarys`) VALUES
(1, 1, NULL, 6300010, 'งานราชการ', 'ชำนวญ', 15000);

-- --------------------------------------------------------

--
-- Table structure for table `postype`
--

CREATE TABLE `postype` (
  `id` int(11) NOT NULL,
  `Postypename` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requestsalarycertificate`
--

CREATE TABLE `requestsalarycertificate` (
  `id` int(11) NOT NULL,
  `Logsid` int(11) DEFAULT NULL,
  `coment` varchar(500) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requestsalarycertificate`
--

INSERT INTO `requestsalarycertificate` (`id`, `Logsid`, `coment`, `date`) VALUES
(1, 1, 'หนังสือรับรองเงินเดือน', '2024-01-22 09:53:18'),
(2, 1, 'หนังสือรับรองเงินเดือน', '2024-01-22 09:53:18'),
(3, 1, 'หนังสือรับรองเงินเดือน', '2024-01-22 09:53:18'),
(4, 1, 'หนังสือรับรองเงินเดือน', '2024-01-23 15:46:19');

-- --------------------------------------------------------

--
-- Table structure for table `revenue`
--

CREATE TABLE `revenue` (
  `id` int(11) NOT NULL,
  `salaryId` int(11) NOT NULL,
  `salarys` double DEFAULT NULL,
  `Posallowan` double DEFAULT NULL,
  `Compensation` double DEFAULT NULL,
  `Childtuition` double DEFAULT NULL,
  `Houserent` double DEFAULT NULL,
  `costofliving` double DEFAULT NULL,
  `obtainback` double DEFAULT NULL,
  `fullsalary` double DEFAULT NULL,
  `Medicalexpenses` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `BrokenGPF` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `revenue`
--

INSERT INTO `revenue` (`id`, `salaryId`, `salarys`, `Posallowan`, `Compensation`, `Childtuition`, `Houserent`, `costofliving`, `obtainback`, `fullsalary`, `Medicalexpenses`, `tax`, `BrokenGPF`) VALUES
(1, 1, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` datetime(3) DEFAULT NULL,
  `datetime` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `userId`, `date`, `datetime`) VALUES
(1, 2, NULL, '2024-01-22 02:50:06.912'),
(2, 3, NULL, '2024-01-22 06:27:04.871'),
(3, 4, NULL, '2024-01-22 06:38:36.513');

-- --------------------------------------------------------

--
-- Table structure for table `salarycertificate`
--

CREATE TABLE `salarycertificate` (
  `id` int(11) NOT NULL,
  `Logsid` int(11) DEFAULT NULL,
  `Content` varchar(500) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salarycertificate`
--

INSERT INTO `salarycertificate` (`id`, `Logsid`, `Content`, `date`) VALUES
(1, 1, 'สลิปเงินเดือน', '2024-01-22 09:52:00'),
(2, 1, 'สลิปเงินเดือน', '2024-01-22 09:52:00'),
(3, 1, 'สลิปเงินเดือน', '2024-01-22 09:52:00'),
(4, 1, 'สลิปเงินเดือน', '2024-01-22 09:52:00'),
(5, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(6, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(7, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(8, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(9, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(10, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(11, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(12, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(13, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(14, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(15, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(16, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(17, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(18, 1, 'สลิปเงินเดือน', '2024-01-22 10:03:34'),
(19, 1, 'สลิปเงินเดือน', '2024-01-23 15:46:19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `AffilId` int(11) DEFAULT NULL,
  `GroupsId` int(11) DEFAULT NULL,
  `PositionId` int(11) DEFAULT NULL,
  `level` enum('USER','ADMIN','HR') DEFAULT 'USER',
  `status` enum('true','false') DEFAULT 'true',
  `u_num` varchar(191) DEFAULT NULL,
  `Avatar` varchar(1000) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `fname` varchar(191) DEFAULT NULL,
  `lname` varchar(191) DEFAULT NULL,
  `sex` enum('MAN','WOMAN') DEFAULT 'MAN',
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `birthday` varchar(191) DEFAULT NULL,
  `datestart` datetime(3) DEFAULT NULL,
  `datestop` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `AffilId`, `GroupsId`, `PositionId`, `level`, `status`, `u_num`, `Avatar`, `username`, `password`, `fname`, `lname`, `sex`, `email`, `phone`, `birthday`, `datestart`, `datestop`) VALUES
(1, 1, 1, 1, 'HR', 'true', '33333-55-554-765', 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/327415934_1220064182274031_8272732074862194187_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=eZcEFb_1KTsAX-lvAym&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAbE3-fRe_a7aHwkZuhrtJjAwRQOHuO7i_yMTKS_SRMpw&oe=65A09D16', 'sss@sss.sss', 'ssss', 'ประวิทย์', 'พรรณา', 'MAN', NULL, '054-344-4334', '2001-01-21', NULL, NULL),
(2, 1, 1, 1, 'USER', 'true', '', 'https://storage.googleapis.com/fastwork-static/14e21c62-7147-4408-ac83-0445ba3c493b.jpg', 'test@test.test', 'test', 'อนิศรา', 'สารมานิช', 'WOMAN', NULL, '066-666-6666', '1111-11-11', NULL, NULL),
(3, 1, 1, 1, 'USER', 'false', NULL, NULL, 'test1@test1.test1', 'test1', 'Sandsd', 'Witassd', 'MAN', NULL, '062-536-6686', '2222-02-22', NULL, NULL),
(4, 1, 1, 1, 'USER', 'false', NULL, NULL, 'nnn@nnn.nnn', 'nnnn', 'nnnn', 'nnnn', 'WOMAN', NULL, '777-777-7777', '2001-01-21', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affil`
--
ALTER TABLE `affil`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Contact_userId_key` (`userId`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Expenses_salaryId_key` (`salaryId`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Group_AffilId_fkey` (`AffilId`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Logs_userId_key` (`userId`);

--
-- Indexes for table `newpositionuser`
--
ALTER TABLE `newpositionuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NewpositionUser_userId_key` (`userId`);

--
-- Indexes for table `originalpos`
--
ALTER TABLE `originalpos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `originalpos_NewpositionUserId_fkey` (`NewpositionUserId`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Position_GroupId_fkey` (`GroupId`),
  ADD KEY `Position_PostypeId_fkey` (`PostypeId`);

--
-- Indexes for table `postype`
--
ALTER TABLE `postype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requestsalarycertificate`
--
ALTER TABLE `requestsalarycertificate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Requestsalarycertificate_Logsid_fkey` (`Logsid`);

--
-- Indexes for table `revenue`
--
ALTER TABLE `revenue`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Revenue_salaryId_key` (`salaryId`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Salary_userId_key` (`userId`);

--
-- Indexes for table `salarycertificate`
--
ALTER TABLE `salarycertificate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SalaryCertificate_Logsid_fkey` (`Logsid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_datestart_key` (`datestart`),
  ADD UNIQUE KEY `User_datestop_key` (`datestop`),
  ADD KEY `User_AffilId_fkey` (`AffilId`),
  ADD KEY `User_GroupsId_fkey` (`GroupsId`),
  ADD KEY `User_PositionId_fkey` (`PositionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `affil`
--
ALTER TABLE `affil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `newpositionuser`
--
ALTER TABLE `newpositionuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `originalpos`
--
ALTER TABLE `originalpos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `postype`
--
ALTER TABLE `postype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requestsalarycertificate`
--
ALTER TABLE `requestsalarycertificate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `revenue`
--
ALTER TABLE `revenue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `salarycertificate`
--
ALTER TABLE `salarycertificate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `Contact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `Expenses_salaryId_fkey` FOREIGN KEY (`salaryId`) REFERENCES `salary` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `Group_AffilId_fkey` FOREIGN KEY (`AffilId`) REFERENCES `affil` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `newpositionuser`
--
ALTER TABLE `newpositionuser`
  ADD CONSTRAINT `NewpositionUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `originalpos`
--
ALTER TABLE `originalpos`
  ADD CONSTRAINT `originalpos_NewpositionUserId_fkey` FOREIGN KEY (`NewpositionUserId`) REFERENCES `newpositionuser` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `position`
--
ALTER TABLE `position`
  ADD CONSTRAINT `Position_GroupId_fkey` FOREIGN KEY (`GroupId`) REFERENCES `group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Position_PostypeId_fkey` FOREIGN KEY (`PostypeId`) REFERENCES `postype` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `requestsalarycertificate`
--
ALTER TABLE `requestsalarycertificate`
  ADD CONSTRAINT `Requestsalarycertificate_Logsid_fkey` FOREIGN KEY (`Logsid`) REFERENCES `logs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `revenue`
--
ALTER TABLE `revenue`
  ADD CONSTRAINT `Revenue_salaryId_fkey` FOREIGN KEY (`salaryId`) REFERENCES `salary` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `Salary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `salarycertificate`
--
ALTER TABLE `salarycertificate`
  ADD CONSTRAINT `SalaryCertificate_Logsid_fkey` FOREIGN KEY (`Logsid`) REFERENCES `logs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_AffilId_fkey` FOREIGN KEY (`AffilId`) REFERENCES `affil` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_GroupsId_fkey` FOREIGN KEY (`GroupsId`) REFERENCES `group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_PositionId_fkey` FOREIGN KEY (`PositionId`) REFERENCES `position` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
