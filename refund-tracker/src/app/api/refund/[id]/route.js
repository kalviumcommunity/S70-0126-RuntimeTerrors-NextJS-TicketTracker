import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const refund = await prisma.refund.findUnique({
      where: { id: params.id },
      include: {
        logs: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    if (!refund) {
      return NextResponse.json(
        { error: "Refund not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(refund);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch refund" },
      { status: 500 }
    );
  }
}
