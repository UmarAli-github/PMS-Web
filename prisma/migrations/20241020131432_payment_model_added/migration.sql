-- CreateTable
CREATE TABLE "Payment" (
    "bookingId" INTEGER NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "card" DECIMAL(10,2) NOT NULL,
    "cash" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("bookingId")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
