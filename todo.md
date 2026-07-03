# God's Covering Family Cell Church Inc. - Project TODO

## Database Schema & Core Infrastructure
- [x] Design and implement database schema (leaders, sermons, events, ministries, prayer requests, announcements, gallery, resources)
- [x] Create database migration SQL and apply via webdev_execute_sql
- [x] Set up storage helpers for media uploads (images, videos, PDFs, audio)
- [x] Implement role-based access control (admin vs public user)

## Backend API Procedures (tRPC)
- [x] Create leader management procedures (list, create, update, delete, reorder)
- [x] Create sermon management procedures (list, search, create, update, delete, filter by category)
- [x] Create event management procedures (list, create, update, delete, filter by date)
- [x] Create ministry management procedures (list, create, update, delete)
- [x] Create prayer request procedures (submit, list for admin)
- [x] Create announcement procedures (list, create, update, delete)
- [x] Create gallery procedures (list albums, upload photos/videos)
- [x] Create resource procedures (list, upload PDFs)
- [x] Create homepage layout procedures (get/update layout configuration)
- [x] Create settings procedures (church info, colors, fonts, logo, banner)
- [ ] Write vitest tests for all backend procedures

## Public Frontend Pages
- [x] Homepage with hero banner, welcome message, vision/mission/purpose, upcoming events, latest sermons, daily Bible verse, prayer request button, join cell group button, join Sunday button, Google Maps, contact info
- [x] About Us page with church history, story, core values, statement of faith, what we believe
- [x] Leadership Team page with leader profiles (photo, name, position, ministry, biography, optional Bible verse)
- [x] Ladders of Success page with WIN, CONSOLIDATE, DISCIPLE, SEND stages (icon, title, description, Bible verse, image)
- [x] Ministries pages (Youth, Children, Worship, Cell Groups, Missions, Men's, Women's + unlimited custom)
- [x] Sermon Library with search, filter by category, support for video/audio/PDF
- [x] Event Management page with upcoming events, date/time/venue, optional registration
- [x] Prayer Request form page
- [x] First-Time Visitors page with welcome, service schedule, FAQ, contact form, map
- [x] Contact Us page with address, Google Maps, phone, email, Facebook, Messenger, contact form
- [x] Gallery page with photo/video albums
- [x] News & Announcements page with blog-style updates
- [x] Resources page with downloadable materials (Bible study, cell group materials, devotionals, forms, PDFs)
- [x] Navigation menu with all public pages
- [x] Footer with logo, vision statement, contact info, copyright, quick links, social media

## Admin Dashboard
- [x] Admin authentication and role-based access
- [x] Dashboard home with overview/stats
- [x] Leader management interface (add, edit, delete, reorder, upload photos)
- [x] Sermon management interface (add, edit, delete, upload video/audio/PDF)
- [x] Event management interface (add, edit, delete, upload banner)
- [x] Ministry management interface (create unlimited ministries, edit, delete)
- [x] Announcement/News management interface
- [x] Gallery management interface (create albums, upload photos/videos)
- [x] Resource management interface (upload PDFs)
- [x] Prayer request viewer (list submitted requests)
- [x] Settings panel (church logo, banner, colors, fonts, contact info, social media links)
- [ ] Homepage layout builder (add/remove/reorder sections, drag-and-drop)
- [ ] User/Admin account management
- [x] Ladders of Success editor (edit stages, icons, descriptions, Bible verses, images)

## Design & Styling
- [ ] Choose color palette (Royal Blue, Gold, White as primary)
- [ ] Set up typography and font system
- [ ] Create consistent component library with Tailwind CSS
- [ ] Design responsive layouts for mobile, tablet, desktop
- [ ] Implement dark mode support (optional)
- [ ] Ensure accessibility standards (WCAG)

## Media & External Services
- [ ] Implement image upload and storage (church logo, banners, leader photos, ministry images)
- [ ] Implement video upload and storage (sermons, gallery)
- [ ] Implement audio upload and storage (sermons)
- [ ] Implement PDF upload and storage (sermon notes, resources)
- [ ] Integrate Google Maps API for church location
- [ ] Set up social media links (Facebook, etc.)
- [ ] Implement daily Bible verse API integration

## Additional Features
- [ ] Cell Group Locator (optional)
- [ ] Online Visitor Registration (optional)
- [ ] Live Stream Page (optional)
- [ ] Church Calendar (optional)
- [ ] Testimonies Page (optional)
- [ ] Water Baptism Registration (optional)
- [ ] Volunteer/Ministry Application Form (optional)
- [ ] Search bar functionality
- [ ] Multi-language support (English and Filipino) - optional
- [ ] Dark mode toggle - optional

## Testing & Quality Assurance
- [ ] Test all public pages for responsiveness
- [ ] Test all admin dashboard features
- [ ] Test media uploads and storage
- [ ] Test form submissions (prayer requests, contact, visitor registration)
- [ ] Test search and filter functionality
- [ ] Test admin authentication and role-based access
- [ ] Cross-browser testing
- [ ] Performance optimization

## Deployment & Final Steps
- [ ] Create checkpoint before publishing
- [ ] Deploy to production
- [ ] Set up custom domain
- [ ] Configure analytics
- [ ] Create user documentation for admins
