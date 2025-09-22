
import QRCode from "qrcode"
export const runtime = "nodejs"  // ok in either edge or node

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

  // Convert Node Buffer -> Uint8Array for Fetch Response
  const body = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)

  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  })
}

