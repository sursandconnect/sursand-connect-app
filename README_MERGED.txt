SURSAND CONNECT MERGED RECOVERY BUILD

Purpose:
Restore the user's known-good Home page without losing the many later page/module changes.

Source strategy:
- index.html (Home): preserved byte-for-byte from the user's uploaded v10.5 ZIP.
- Other pages/modules: restored from the later feature-complete v10.7 package.
- Representatives + City Connect: use the verified Ward-19 versions based on the user's v10.5 design.
- Service-worker cache version bumped so browsers refresh this corrected merge.

This avoids rolling the entire app back to v10.5 just to restore Home.

Later module/page changes restored include the newer versions of:
About, Account/Login, Agriculture, Business Registration, Businesses, Change Makers,
Charity, Complaints, Contact, Education, Emergency, Events, Government Offices,
Government Services, Healthcare, Important Contacts, Important Places, Jobs,
Local Map, Notifications, Services, Settings, Transport, Useful Websites, Weather,
and other non-Home page changes from the later build.

Home itself is not modified.
