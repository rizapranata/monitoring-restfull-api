/*
  Warnings:

  - You are about to alter the column `progressId` on the `images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `progresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `progresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_progressId_fkey`;

-- AlterTable
ALTER TABLE `images` MODIFY `progressId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `progresses` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `progresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
