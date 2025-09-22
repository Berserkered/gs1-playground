
import QRCode from "qrcode"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get("text")
  const size = Number(searchParams.get("size") || 512)
  if (!text) return new Response("Missing text", { status: 400 })
  const png = await QRCode.toBuffer(text, { errorCorrectionLevel: "M", width: size, margin: 1 })
  return new Response(png, { headers: { "Content-Type": "image/png", "Cache-Control": "no-store" } })
}
