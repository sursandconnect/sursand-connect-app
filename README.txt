SURSAND CONNECT APP v10.2

CHANGE MAKERS
- Join form is hidden by default.
- Large "Become a Change Maker" button appears near the top.
- Tapping it opens and scrolls to the form.
- Profile image remains mandatory and supports upload/camera.
- Approved Change Maker cards show Image, Name, Area of Interest and Ward.

WARD ADMINS
- Main app Staff Admin is now presented as Ward Admin.
- Admin profile's assigned Ward is shown.
- Frontend filters rows to the assigned ward and attaches that ward to new content.
- FINAL Apps Script backend enforcement is intentionally deferred and documented in WARD_ADMIN_BACKEND_REQUIREMENTS.txt so backend changes can be consolidated later.

HOME POPUP
- Popup appears only if an actual Welcome, Event, Announcement, Notification or Advertisement is available.
- Popup is centered and approximately half-screen size.
- Change Maker Welcome: auto closes after 6 seconds.
- Advertisement: auto closes after 6 seconds.
- Events/Announcements/Public Notifications: remain until user presses ×.
- Multiple active advertisements rotate one at a time on each reload/revisit.
- Removed "Local Advertisement" label text from ad popup.

NOTIFICATIONS
- Tapping a notification now opens a full-information modal.
- If a related page/URL exists, the modal includes "Open Related Page".

No Apps Script replacement is required right now for these frontend changes.
Ward-level security must be added in the final consolidated backend update.
