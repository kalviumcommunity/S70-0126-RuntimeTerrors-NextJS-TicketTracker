-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('INITIATED', 'APPROVED', 'PROCESSED', 'COMPLETED', 'DELAYED');

-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "RefundStatus" NOT NULL DEFAULT 'INITIATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundLog" (
    "id" TEXT NOT NULL,
    "refundId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefundLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefundLog" ADD CONSTRAINT "RefundLog_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
