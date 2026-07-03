# Frontend Pages & Components Documentation
## God's Covering Family Cell Church Inc.

---

## 📚 Table of Contents
1. What is Frontend?
2. How Pages Work
3. Key Concepts
4. All Public Pages Explained
5. Components Used

---

## 1️⃣ What is Frontend?

**Frontend** = Everything visitors see and interact with on your website

Think of it like a restaurant:
- **Frontend** = The dining room where customers sit and eat
- **Backend** = The kitchen where food is prepared
- **Database** = The storage room with ingredients

The frontend is written in **React** (a JavaScript library that makes interactive websites).

---

## 2️⃣ How Pages Work

### Basic Flow:
```
1. Visitor opens website → Browser loads React code
2. React code runs → Fetches data from backend
3. Backend sends data → React displays it on page
4. Visitor clicks button → React updates the page
```

### Example: Homepage
When you visit the homepage:
1. React loads the Home.tsx file
2. It asks the backend: "Give me upcoming events, sermons, announcements"
3. Backend sends the data
4. React displays it beautifully on the page

---

## 3️⃣ Key Concepts for Beginners

### What is React?
- A JavaScript library that makes websites interactive
- Instead of reloading the entire page, React updates only what changed
- Makes websites feel fast and smooth

### What is a Component?
- A reusable piece of the website (like a LEGO brick)
- Example: Button, Card, Navigation Menu
- You can use the same component many times

### What is State?
- Information that can change (like a variable)
- Example: "Is the menu open?" (true/false)
- When state changes, React updates the page

### What is a Hook?
- A special React function that lets components "remember" things
- `useQuery()` = Get data from backend
- `useMutation()` = Send data to backend
- `useState()` = Remember information

### What is tRPC?
- A way to talk to the backend from the frontend
- Instead of complex API calls, you just call functions
- Example: `trpc.events.list.useQuery()` = Get all events

---

## 4️⃣ All Public Pages Explained

### 🏠 HOME PAGE (Home.tsx)
**What it shows:**
- Navigation menu at the top
- Hero banner with welcome message
- Vision, Mission, Purpose cards
- Upcoming events (3 latest)
- Latest sermons (3 latest)
- Announcements
- Footer with contact info

**How it works:**
```javascript
// Get data from backend
const settings = trpc.settings.get.useQuery();        // Church info
const upcomingEvents = trpc.events.upcoming.useQuery(); // Events
const latestSermons = trpc.sermons.list.useQuery();    // Sermons
const announcements = trpc.announcements.list.useQuery(); // News
```

**Key Features:**
- Shows loading spinner while fetching data
- Displays "No data" message if nothing available
- Navigation buttons to other pages
- Admin button (only shows if you're logged in as admin)

---

### 👥 LEADERSHIP PAGE (Leadership.tsx)
**What it shows:**
- List of all church leaders
- Each leader's photo, name, position, ministry, biography
- Optional Bible verse for each leader

**How it works:**
```javascript
// Get all leaders from database
const leaders = trpc.leaders.list.useQuery();
```

**Key Features:**
- Displays leader cards in a grid
- Shows "No leaders available" if list is empty
- Loading spinner while fetching

---

### ℹ️ ABOUT US PAGE (About.tsx)
**What it shows:**
- Church history and story
- Core values
- Statement of faith
- What we believe

**How it works:**
- Displays static content (text that doesn't change often)
- Can be edited by admin in Settings

---

### 🪜 LADDERS OF SUCCESS PAGE (LaddersOfSuccess.tsx)
**What it shows:**
- Four stages: WIN, CONSOLIDATE, DISCIPLE, SEND
- Each stage has: icon, title, description, Bible verse, image

**How it works:**
```javascript
// Get all Ladders of Success stages
const ladders = trpc.laddersOfSuccess.list.useQuery();
```

**Key Features:**
- Displays stages in a grid
- Each stage is a card with icon and description
- Shows Bible verse for each stage

---

### 🏛️ MINISTRIES PAGE (Ministries.tsx)
**What it shows:**
- List of all church ministries
- Each ministry has: name, description, image, contact info

**How it works:**
```javascript
// Get all ministries
const ministries = trpc.ministries.list.useQuery();
```

**Key Features:**
- Click on a ministry to see details
- Shows ministry contact information
- Displays ministry image if available

---

### 📖 SERMON LIBRARY PAGE (SermonLibrary.tsx)
**What it shows:**
- List of all sermons
- Search box to find sermons
- Filter by category
- Each sermon shows: title, speaker, date, video/audio/PDF buttons

**How it works:**
```javascript
// Get sermons with optional search
const sermons = trpc.sermons.search.useQuery({ query: searchTerm });
```

**Key Features:**
- Search functionality (type to find sermons)
- Filter by category
- Watch video, listen to audio, or download notes
- Shows sermon date and speaker

---

### 📅 EVENTS PAGE (Events.tsx)
**What it shows:**
- List of upcoming events
- Each event shows: title, date, time, venue, banner image
- Optional registration button

**How it works:**
```javascript
// Get upcoming events
const events = trpc.events.upcoming.useQuery();
```

**Key Features:**
- Shows event details clearly
- Registration button (if event has registration enabled)
- Event banner image
- Date and time information

---

### 🙏 PRAYER REQUEST PAGE (PrayerRequest.tsx)
**What it shows:**
- Form for visitors to submit prayer requests
- Fields: name, email, phone, prayer request, public/private option

**How it works:**
```javascript
// Submit prayer request
const submit = trpc.prayerRequests.submit.useMutation();
```

**Key Features:**
- Simple form with validation
- Option to make request public or private
- Confirmation message after submission
- Admin can see all requests in dashboard

---

### 👋 FIRST-TIME VISITORS PAGE (FirstTimeVisitors.tsx)
**What it shows:**
- Welcome message for new visitors
- Service schedule
- FAQ section
- Contact form
- Google Maps showing church location

**How it works:**
```javascript
// Get FAQs
const faqs = trpc.faqs.list.useQuery();

// Submit visitor registration
const register = trpc.visitorRegistrations.submit.useMutation();
```

**Key Features:**
- Welcoming message
- Frequently asked questions
- Visitor registration form
- Map showing church location

---

### 📍 CONTACT US PAGE (ContactUs.tsx)
**What it shows:**
- Church contact information
- Google Maps
- Contact form
- Social media links

**How it works:**
```javascript
// Get church settings (address, phone, email)
const settings = trpc.settings.get.useQuery();

// Submit contact form
const submit = trpc.contactForms.submit.useMutation();
```

**Key Features:**
- Shows church address, phone, email
- Interactive Google Map
- Contact form for messages
- Social media links (Facebook, etc.)

---

### 🖼️ GALLERY PAGE (Gallery.tsx)
**What it shows:**
- Photo and video albums
- Click album to see photos/videos inside
- Lightbox view for full-size images

**How it works:**
```javascript
// Get all albums
const albums = trpc.gallery.albums.useQuery();

// Get items in an album
const items = trpc.gallery.items.useQuery({ albumId });
```

**Key Features:**
- Organized by albums
- Click to view full-size images
- Lightbox gallery view
- Shows album cover image

---

### 📰 NEWS & ANNOUNCEMENTS PAGE (News.tsx)
**What it shows:**
- Blog-style list of announcements
- Each announcement has: title, content, image, date
- Newest announcements first

**How it works:**
```javascript
// Get all announcements
const announcements = trpc.announcements.list.useQuery();
```

**Key Features:**
- Shows announcement title and preview
- Click to read full announcement
- Announcement date
- Announcement image if available

---

### 📚 RESOURCES PAGE (Resources.tsx)
**What it shows:**
- Downloadable materials
- Categories: Bible Study, Cell Group Materials, Devotionals, Forms, PDFs
- Download buttons for each resource

**How it works:**
```javascript
// Get all resources
const resources = trpc.resources.list.useQuery();
```

**Key Features:**
- Organized by category
- Download links for PDFs
- Resource description
- Shows file size if available

---

## 5️⃣ Components Used (Reusable Pieces)

### Button Component
```javascript
<Button onClick={() => navigate("/page")}>Click Me</Button>
<Button variant="outline">Outline Button</Button>
<Button size="sm">Small Button</Button>
```

### Card Component
```javascript
<Card className="p-4">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Navigation
```javascript
<Button onClick={() => navigate("/about")}>About</Button>
```

### Loading Spinner
```javascript
{isLoading ? (
  <Loader2 className="animate-spin" />
) : (
  // Show content when loaded
)}
```

### Conditional Display
```javascript
{data?.length ? (
  // Show if data exists
) : (
  // Show if no data
)}
```

---

## 🔄 Data Flow Example: Homepage

```
1. Page loads
   ↓
2. React runs useQuery() hooks to fetch data
   ↓
3. Shows loading spinner
   ↓
4. Backend sends data (events, sermons, announcements)
   ↓
5. React displays the data beautifully
   ↓
6. Visitor sees the homepage with all content
   ↓
7. Visitor clicks a button → React navigates to another page
```

---

## 📝 File Structure

```
client/src/pages/
├── Home.tsx                    # Homepage
├── About.tsx                   # About Us
├── Leadership.tsx              # Leadership Team
├── LaddersOfSuccess.tsx        # Discipleship Stages
├── Ministries.tsx              # Ministries List
├── MinistryDetail.tsx          # Single Ministry
├── SermonLibrary.tsx           # Sermon Search & List
├── Events.tsx                  # Events List
├── PrayerRequest.tsx           # Prayer Request Form
├── FirstTimeVisitors.tsx       # Visitor Welcome
├── ContactUs.tsx               # Contact Form & Map
├── Gallery.tsx                 # Photo/Video Gallery
├── News.tsx                    # Announcements
├── Resources.tsx               # Downloadable Resources
└── NotFound.tsx                # 404 Page

client/src/components/
├── ui/                         # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
└── DashboardLayout.tsx         # Admin layout
```

---

## 🎨 Styling

All pages use **Tailwind CSS** - a utility-first CSS framework

Examples:
```javascript
className="text-3xl font-bold mb-8"
// = text size 3xl, bold font, margin-bottom 8

className="grid md:grid-cols-3 gap-6"
// = Grid layout, 3 columns on medium+ screens, gap of 6

className="bg-blue-900 text-white py-24"
// = Blue background, white text, padding-y 24
```

---

## 🚀 How to Modify a Page

### Example: Change Homepage Title

**File:** `client/src/pages/Home.tsx`

Find this line:
```javascript
<h2 className="text-5xl font-bold mb-4">Welcome to God's Covering Family Cell Church Inc.</h2>
```

Change to:
```javascript
<h2 className="text-5xl font-bold mb-4">Welcome to Our Church Community</h2>
```

Save the file → Website updates automatically!

---

## ✅ Summary

- **Frontend** = What visitors see
- **React** = JavaScript library that makes it interactive
- **Components** = Reusable pieces (Button, Card, etc.)
- **Hooks** = Functions that let components remember things
- **tRPC** = Easy way to get data from backend
- **Tailwind CSS** = Easy way to style pages

Each page follows the same pattern:
1. Import components and hooks
2. Fetch data using `useQuery()`
3. Show loading spinner while fetching
4. Display data when ready
5. Show "no data" message if empty

---

## 🤔 Common Questions

**Q: How do I add a new page?**
A: Create a new .tsx file in `client/src/pages/`, add it to `App.tsx` routing, and create the content.

**Q: How do I change colors?**
A: Edit `client/src/index.css` to change the color variables.

**Q: How do I add a new button?**
A: Use the Button component: `<Button>Click Me</Button>`

**Q: How do I fetch data?**
A: Use `trpc.feature.list.useQuery()` to get data from backend.

**Q: How do I submit a form?**
A: Use `trpc.feature.submit.useMutation()` to send data to backend.

---

## 📞 Need Help?

Each page is self-contained and follows the same pattern. If you understand one page, you can understand them all!

Key things to remember:
- Pages are React components (functions that return JSX)
- Data comes from backend using tRPC hooks
- UI is built with reusable components
- Styling uses Tailwind CSS classes
- Navigation uses the `navigate()` function

Good luck! 🎉
