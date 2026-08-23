SURSAND CONNECT v10 — ROLE SEPARATION

SUPER ADMIN / OWNER
- Removed from the public Sursand Connect login flow.
- Uses a separate Super Admin app.
- Keeps complete control over all modules/data.
- Can create/enable/disable staff admin accounts.
- Only Super Admin can create staff admins.

STAFF ADMIN
- Logs in from the normal Sursand Connect Login screen using Admin ID, mobile or email + password.
- Admin Panel is visible in Menu only after a successful staff-admin login.
- Rights are limited to:
  1. Approve/reject Business and Service registration requests.
  2. Add/edit Events and Announcements.
  3. Add/edit Healthcare and Doctor content.
  4. Add/edit Education content.
  5. Change their own password.
- Staff cannot delete public records.
- Staff cannot access spreadsheets/modules outside those permissions.
- Staff cannot create admins.

BACKEND
1. Replace Code.gs with Code_v10.gs.txt.
2. Keep AccountAuth.gs from v9.2.
3. Create V10_Setup.gs from V10_Setup.gs.txt.
4. Run runSursandConnectV10Setup() once.
5. Redeploy Apps Script.
6. Upload this main app to the Sursand Connect repo.
7. Upload the separate Super Admin app to a different repository/site.
