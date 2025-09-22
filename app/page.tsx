
"use client"
import { useState } from "react"

export default function Home() {
  const [gtin, setGtin] = useState("09506000134352")
  const [lot, setLot]   = useState("ABC123")
  const [exp, setExp]   = useState("2026-12-31")
  const [dl, setDl]     = useState<string | null>(null)
  const [err, setErr]   = useState<string | null>(null)

  async function build() {
    setErr(null); setDl(null)
    if (!gtin) { setErr("GTIN is required"); return }
    const q = new URLSearchParams({ gtin })
    if (lot) q.set("lot", lot)
    if (exp) q.set("exp", exp)
    const r = await fetch(`/api/dl?${q.toString()}`)
    if (!r.ok) { setErr(await r.text()); return }
    const { dl } = await r.json()
    setDl(dl)
  }

  const input = { border:'1px solid #ddd', borderRadius:8, padding:'10px 12px', width:'100%' } as const
  return (
    <main style={{ maxWidth:720, margin:'40px auto', padding:'0 16px' }}>
      <h1 style={{ fontSize:28, fontWeight:700, marginBottom:8 }}>GS1 Digital Link Playground</h1>
      <p style={{ opacity:.75, marginBottom:16 }}>Build a Digital Link from GTIN + optional Lot (10) + Expiry (17).</p>

      <label>GTIN (14 digits)</label>
      <input style={input} value={gtin} onChange={e=>setGtin(e.target.value)} placeholder="09506000134352" />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
        <div>
          <label>Lot / Batch (10)</label>
          <input style={input} value={lot} onChange={e=>setLot(e.target.value)} placeholder="ABC123" />
        </div>
        <div>
          <label>Expiry (17) YYYY-MM-DD or YYYYMMDD</label>
          <input style={input} value={exp} onChange={e=>setExp(e.target.value)} placeholder="2026-12-31" />
        </div>
      </div>

      <button onClick={build} style={{ marginTop:16, padding:'10px 16px', borderRadius:8, border:'1px solid #ddd' }}>
        Build Link
      </button>

      {err && <p style={{ color:'crimson', marginTop:12 }}>{err}</p>}
      {dl && (
        <div style={{ marginTop:16, padding:12, border:'1px solid #eee', borderRadius:8 }}>
          <div style={{ fontWeight:600, marginBottom:6 }}>Digital Link</div>
          <code style={{ wordBreak:'break-all' }}>{dl}</code>
        </div>
      )}
    </main>
  )
}
