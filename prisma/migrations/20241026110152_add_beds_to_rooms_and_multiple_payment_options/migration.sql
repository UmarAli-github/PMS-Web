/*
  Warnings:

  - You are about to drop the column `price` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Room` table. All the data in the column will be lost.
  - Added the required column `bedId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "price",
DROP COLUMN "roomId",
ADD COLUMN     "bedId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "capacity";

-- CreateTable
CREATE TABLE "Bed" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "bookingId" INTEGER NOT NULL,
    "card" DECIMAL(10,2) NOT NULL,
    "cash" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("bookingId")
);

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
