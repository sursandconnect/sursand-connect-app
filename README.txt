SURSAND CONNECT APP v5 — OFFLINE DATA UPDATE

NEW OFFLINE SYSTEM
------------------
1. Sursand Connect pages are stored on the user's device by the service worker.
2. Google Apps Script / Spreadsheet data is also stored locally after the first successful online load.
3. On later visits the saved data is returned immediately, so pages do not have to wait for Apps Script every time.
4. While internet is available, the app silently checks Apps Script in the background and replaces the stored data with the newest version.
5. When the device comes back online, a background refresh is triggered automatically.
6. The app does not force-refresh an open form, preventing typed complaint/donation/service-request information from being lost.
7. Newly refreshed data is used on the next page opening/navigation/refresh.
8. A device must successfully open the app online at least once before Spreadsheet-backed data can work offline.

TECHNICAL NOTE
--------------
The data is kept in browser Cache Storage (on-device local storage) rather than ordinary window.localStorage.
Cache Storage is designed for PWAs/offline HTTP responses and avoids the small localStorage size limit.

UPLOAD
------
Upload every file/folder in this ZIP to the ROOT of your existing GitHub Pages repository and replace the existing files.
