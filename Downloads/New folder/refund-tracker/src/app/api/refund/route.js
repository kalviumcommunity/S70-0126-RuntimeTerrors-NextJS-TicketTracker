export async function GET() {
  return Response.json({
    status: "ok",
    message: "Refund API working (no DB)",
  });
}

export async function POST(req) {
  const body = await req.json();

  return Response.json({
    refundId: "RF-" + Date.now(),
    status: "INITIATED",
    data: body,
  });
}