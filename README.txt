SURSAND CONNECT v9

ADMIN SESSION
- Admin login stays active while moving through the app until the backend session expires or Admin logs out.
- Admin Panel appears in the app Menu ONLY while an authenticated admin session exists.
- Public users never see the Admin Panel option.

ACCOUNT
- Login/Signup password fields have Show/Hide.
- Logged-in citizens can change their password.
- Profile picture upload is available.
- User profile data continues to autofill matching public forms.

ADMIN PANEL
- 25 spreadsheet-backed modules are available from one control centre.
- Add, Edit, Approve, Reject and Delete actions.
- Approve All / Reject All supports selected rows or all loaded rows.
- Every modifying action uses a confirmation popup.
- Admin can change the admin password from the panel.
- App Users and Local Advertisements are manageable from Admin Panel.
- App Settings are available from Admin Panel.
- Content changes are made from Admin Panel without manually opening Sheets.

HOME POPUP
- On app opening, the newest unseen Event or Announcement is shown once per update.
- If there is no unseen Event/Announcement, an active Local Advertisement is shown.
- Popup has a close button and automatically closes after 5 seconds.

CLEANUP
- Removed S Chat references and user-facing "will be added later" placeholder text.

BACKEND FILES
- Code_v9.gs.txt: full replacement for Code.gs.
- AccountAuth.gs.txt: full replacement for AccountAuth.gs.
- V9_Setup.gs.txt: add as a small temporary setup script and run setupSursandConnectV9() once.

IMPORTANT
Do backend replacement/setup/redeployment BEFORE uploading v9 frontend.
