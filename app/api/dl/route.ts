
function yymmdd(input?: string) {
  let d: Date
  if (!input) d = new Date()
  else if (/^\d{8}$/.test(input)) { // YYYYMMDD
    d = new Date(+input.slice(0,4), +input.slice(4,6)-1, +input.slice(6,8))
  } else {                           // e.g., 2026-12-31
    d = new Date(input)
  }
  const yy = String(d.getUTCFullYear()).slice(-2)
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${yy}${mm}${dd}`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const gtin = searchParams.get('gtin') // 14-digit GTIN
  const lot  = searchParams.get('lot')  // batch/lot
  const exp  = searchParams.get('exp')  // YYYY-MM-DD or YYYYMMDD
  const base = searchParams.get('base') || 'https://id.gs1.org'

  if (!gtin) return new Response('Missing gtin', { status: 400 })

  let path = `/01/${gtin}`
  if (lot) path += `/10/${encodeURIComponent(lot)}`
  if (exp) path += `/17/${yymmdd(exp)}`
  const dl = `${base}${path}`

  return Response.json({ dl })
}
