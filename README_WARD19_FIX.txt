SURSAND CONNECT v10.7.1 — WARD 19 FIX

Exact issue found:
- City Connect WhatsApp groups page was hard-coded only through Ward 18.
- Updating the spreadsheet therefore could NOT make Ward 19 appear.
- Backend getCityConnectGroups() also still looped only through 18 wards.

Fix:
- Ward 19 card added directly below Ward 18 using the existing design.
- Ward 19 WhatsApp link is read from live Apps Script cityConnect data.
- Service-worker cache version bumped so devices receive the corrected page.
