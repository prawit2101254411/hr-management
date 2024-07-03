-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `AffilId` INTEGER NULL,
    `GroupsId` INTEGER NULL,
    `PosId` INTEGER NULL,
    `level` ENUM('USER', 'ADMIN', 'HR') NULL DEFAULT 'USER',
    `status` ENUM('true', 'false') NULL DEFAULT 'true',
    `u_num` INTEGER NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `birthday` DATETIME(3) NULL,
    `datestart` DATETIME(3) NULL,
    `datestop` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_birthday_key`(`birthday`),
    UNIQUE INDEX `User_datestart_key`(`datestart`),
    UNIQUE INDEX `User_datestop_key`(`datestop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Affil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Affilname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `GroupsId` INTEGER NULL,
    `Groupname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CertdsId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PostypeId` INTEGER NULL,
    `Codes` INTEGER NULL,
    `Posnames` VARCHAR(191) NULL,
    `levels` VARCHAR(191) NULL,
    `salarys` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Postype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Postypename` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `originalpos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `OrPosId` INTEGER NULL,
    `startdate` DATETIME(3) NULL,
    `stopdate` DATETIME(3) NULL,
    `origipos` VARCHAR(191) NULL,
    `oldlevel` VARCHAR(191) NULL,
    `oldsalary` INTEGER NULL,
    `newpos` VARCHAR(191) NULL,
    `newlevel` VARCHAR(191) NULL,
    `newsalary` INTEGER NULL,
    `dateUpdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `originalpos_startdate_key`(`startdate`),
    UNIQUE INDEX `originalpos_stopdate_key`(`stopdate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `SalaryId` INTEGER NULL,
    `date` DATETIME(3) NULL,
    `datetime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Revenue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RevenuesId` INTEGER NULL,
    `salarys` INTEGER NULL,
    `Posallowan` INTEGER NULL,
    `Compensation` INTEGER NULL,
    `Childtuition` INTEGER NULL,
    `Houserent` INTEGER NULL,
    `costofliving` INTEGER NULL,
    `obtainback` INTEGER NULL,
    `fullsalary` INTEGER NULL,
    `Medicalexpenses` INTEGER NULL,
    `tax` INTEGER NULL,
    `BrokenGPF` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExpensesId` INTEGER NULL,
    `incometax` INTEGER NULL,
    `CPC` INTEGER NULL,
    `Department` INTEGER NULL,
    `GPF` INTEGER NULL,
    `CPS` INTEGER NULL,
    `Student` INTEGER NULL,
    `GHBank` INTEGER NULL,
    `Krungthai` INTEGER NULL,
    `Nakho` INTEGER NULL,
    `SavingsBank` INTEGER NULL,
    `TSC` INTEGER NULL,
    `PHSC` INTEGER NULL,
    `PAOC` INTEGER NULL,
    `Rule` INTEGER NULL,
    `Welfarefund` INTEGER NULL,
    `PAOF` INTEGER NULL,
    `TeachersCoop` INTEGER NULL,
    `IslamicBank` INTEGER NULL,
    `socialsecurity` INTEGER NULL,
    `Salarydropped` INTEGER NULL,
    `WiratCoop` INTEGER NULL,
    `AFCM` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_AffilId_fkey` FOREIGN KEY (`AffilId`) REFERENCES `Affil`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_GroupsId_fkey` FOREIGN KEY (`GroupsId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_PosId_fkey` FOREIGN KEY (`PosId`) REFERENCES `Position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_CertdsId_fkey` FOREIGN KEY (`CertdsId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_PostypeId_fkey` FOREIGN KEY (`PostypeId`) REFERENCES `Postype`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `originalpos` ADD CONSTRAINT `originalpos_OrPosId_fkey` FOREIGN KEY (`OrPosId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_SalaryId_fkey` FOREIGN KEY (`SalaryId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Revenue` ADD CONSTRAINT `Revenue_RevenuesId_fkey` FOREIGN KEY (`RevenuesId`) REFERENCES `Salary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_ExpensesId_fkey` FOREIGN KEY (`ExpensesId`) REFERENCES `Salary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
