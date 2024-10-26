/*
  Warnings:

  - Added the required column `status` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('BED_UNAVAILABLE', 'BOOKED', 'PRESENT', 'NO_SHOW', 'DIRECT_BOOKING');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "status" "BookingStatus" NOT NULL;
