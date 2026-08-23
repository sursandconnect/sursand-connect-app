SURSAND CONNECT APP v8.2

CHANGES
-------
1. Header Account Button
- Login button appears immediately to the right of the Notifications icon.
- After citizen login/signup it automatically becomes a circular profile icon with the user's initials.
- Tapping it opens My Account.
- Admin Panel still remains hidden from public menus.

2. Automatic Form Filling
After citizen login, Sursand Connect stores the returned public profile on the device.
The app automatically fills matching fields in forms:
- Name
- Mobile / Phone / WhatsApp number
- Email
- Ward
- Address
- Landmark
It also watches forms/modals added later by page scripts and fills them when they appear.
It NEVER auto-fills passwords, uploaded files, issue descriptions or other private request-specific fields.

3. Expanded User Profile
Signup/profile now includes:
- Name
- Mobile
- Email
- Ward
- Address
- Landmark

4. Hero Buttons
- Shop Now = GREEN
- Book Services = YELLOW
- Complaints = RED
- All three remain equal size with WHITE borders.

BACKEND
-------
AccountAuth.gs.txt has been updated for Address + Landmark.
Use this v8.2 AccountAuth.gs version (not the older v8/v8.1 copy).

Do not upload the app until the AccountAuth backend setup is completed.
