# GS1 Playground

Live: https://gs1-playground.vercel.app

## Endpoints

- `/api/health` → `{"ok":true,"ts":...}`
- `/api/dl?gtin=09506000134352&lot=ABC123&exp=2026-12-31` → `{"dl":"https://id.gs1.org/01/09506000134352/10/ABC123/17/261231"}`
- `/api/qr?text=<url>&size=512` → PNG
- `/api/qr.svg?text=<url>` → SVG (vector)

## Dev

```bash
npm i
npm run dev

```
