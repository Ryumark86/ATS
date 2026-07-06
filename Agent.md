# ATS Project - Agent Summary

## Goal
Build a single-page application (SPA) for generating Análisis de Trabajo Seguro (ATS) documents (FR-SST-002) with PDF output sent to Telegram.

## Constraints & Preferences
- Telecomunicaciones industry (SITOC); companion to existing "Clock In" app.
- Three-block form: (1) 20 Pasos de la Tarea (SI/N/A), (2) 11 Controles Propuestos (SI/NO) grouped by subtitle + Firma Responsable, (3) Condiciones Inseguras (checkboxes).
- Single firm signature ("Firma del Responsable / Líder de Cuadrila") at end of Bloque 2.
- Output: PDF file `{codigoSitio}_{nombreEncargado}_{fecha}.pdf`, sent to Telegram.
- Telegram Bot Token: `8619707683:AAFXMNsULLJuOvAmwEZm1iuLgshotv4MPRs`; Chat ID: `-5117938351`.
- Digital signatures via Canvas (mouse + touch); no photos.
- Offline queue with automatic retry on reconnect; localStorage history.

## Progress
### Done
- Created project directory `C:\Users\Usuario\Documents\opencode\ATS\`.
- Created `index.html` (176 lines): responsive form + preview screen + CDN scripts (html2canvas + jsPDF).
- Created `styles.css` (735 lines): mobile-first design, radio pills, report preview styles, `@media print` rules.
- Created `app.js` (855 lines): IIFE pattern; form logic; EPCC-style signature pad (`offsetX/Y` for mouse, `getBoundingClientRect` for touch); visible-preview-based PDF generation; Telegram send; history; pending queue.
- Created `Agent.md` with full documentation; `preguntas_bloques_ats.md` as reference.
- Pushed final code to `https://github.com/Ryumark86/ATS`.

### In Progress
- End-to-end testing needed: serve locally (`python -m http.server 8000`), fill form, click "Previsualizar ATS", verify preview, click "Enviar a Telegram", verify PDF received in Telegram group.
- Need to download `html2canvas.min.js` and `jspdf.umd.min.js` as local fallbacks.

## Key Decisions
- **Replaced html2pdf.js with `window.print()` + `@media print` CSS** for user-facing PDF generation (inspired by EPCC project). html2canvas + jsPDF retained only for programmatic Telegram blob generation.
- **Signature uses `e.offsetX/Y` for mouse** (no scaling needed since canvas.width is set dynamically to match CSS width) and `getBoundingClientRect()` only for touch events, matching EPCC's working implementation.
- **Report preview is shown as a visible screen** (not hidden/off-screen) so that both the browser's print engine and html2canvas can capture it reliably.
- **Script priority**: CDN first, then local fallback via `document.write`, to avoid Tracking Prevention blocking CDN storage.
- **Pending queue retry uses a temp div** with `opacity:0.01` (not `display:none`) for html2canvas capture.
- **Blank signature canvases** return empty string from `getFirmaDataURL()` (checked via pixel alpha channel), so the report shows "Sin firma" for unsigned fields.

## File Structure
```
ATS/
├── index.html          # Main HTML: form + preview screen + CDN scripts
├── styles.css          # All styles: form, preview, @media print
├── app.js              # All logic: form building, signatures, preview, PDF, Telegram, history, pending
├── Agent.md            # This file
├── preguntas_bloques_ats.md  # Reference questions document
├── logo-sitoc.png      # Company logo
├── html2canvas.min.js  # Local fallback (not yet downloaded)
└── jspdf.umd.min.js    # Local fallback (not yet downloaded)
```

## Next Steps
1. Test end-to-end: `python -m http.server 8000` in project directory → open `http://localhost:8000/` → fill form → submit → verify preview → send to Telegram.
2. Download local fallback files (`html2canvas.min.js`, `jspdf.umd.min.js`) to ensure offline functionality.
3. Enable GitHub Pages for `https://github.com/Ryumark86/ATS` for hosted testing.
4. If PDF is blank in Telegram, check:
   - Console for html2canvas/jsPDF loading errors.
   - That the preview screen is visible before capture (html2canvas cannot capture `display:none` elements).
   - That the Telegram Bot Token and Chat ID environment variable references are correct (not hardcoded in the original code's location).
5. If retryPending fails, verify temp div with `opacity:0.01` is visible enough for html2canvas.

## Critical Context
- EPCC project at `C:\Users\Usuario\Documents\Formatos-SITOC\EPCC\index.html` is the proven reference: uses `window.print()` + `@media print` CSS, signature pad with `offsetX/Y` for mouse and `getBoundingClientRect()` for touch.
- html2canvas + jsPDF are separate scripts (smaller, more targeted than html2pdf bundle).
- The repo is at `https://github.com/Ryumark86/ATS`. Serve with `python -m http.server 8000`.
- All off-screen/clone positioning was removed. The report preview is now a visible DOM element.
