import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { ticketId, operator, amount } = body;

    if (!ticketId || !operator || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const refund = await prisma.refund.create({
      data: {
        ticketId,
        operator,
        amount,
        logs: {
          create: {
            action: "Refund initiated",
          },
        },
      },
      include: {
        logs: true,
      },
    });

    return NextResponse.json(refund, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create refund" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const refunds = await prisma.refund.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(refunds);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch refunds" },
      { status: 500 }
    );
  }
}
