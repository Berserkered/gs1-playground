
import QRCode from "qrcode"

// (optional) force Node runtime; not required, but fine
export const runtime = "nodejs"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get("text")
  const size = Number(searchParams.get("size") || 512)
  if (!text) return new Response("Missing text", { status: 400 })

  const buf = await QRCode.toBuffer(text, {
    errorCorrectionLevel: "M",
    width: size,
    margin: 1,
  })

  // Convert Buffer -> ArrayBuffer for Fetch Response
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  const blob = new Blob([ab], { type: "image/png" })

  return new Response(blob, {
    headers: { "Cache-Control": "no-store" },
  })
}

