import QRCode from "qrcode";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const size = Number(searchParams.get("size") || 512);
  if (!text) return new Response("Missing text", { status: 400 });

  // Generate PNG as a Node Buffer
  const buf = await QRCode.toBuffer(text, {
    errorCorrectionLevel: "M",
    width: size,
    margin: 1,
  });

  // Convert Buffer -> Uint8Array and cast to BodyInit for TS
  const body = new Uint8Array(
    buf.buffer,
    buf.byteOffset,
    buf.byteLength,
  ) as unknown as BodyInit;

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
