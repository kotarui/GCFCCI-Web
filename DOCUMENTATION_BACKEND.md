# Backend API & Database Documentation
## God's Covering Family Cell Church Inc.

---

## 📚 Table of Contents
1. What is Backend?
2. What is a Database?
3. Database Tables Explained
4. What is an API?
5. tRPC Procedures Explained
6. How Data Flows
7. Server Code Structure

---

## 1️⃣ What is Backend?

**Backend** = The "kitchen" of your website where all the work happens

Think of it like a restaurant again:
- **Frontend** = Dining room (what customers see)
- **Backend** = Kitchen (where food is prepared)
- **Database** = Storage room (where ingredients are kept)

The backend:
- Stores data in a database
- Processes requests from the frontend
- Sends data back to the frontend
- Handles authentication (login/logout)
- Manages permissions (who can do what)

---

## 2️⃣ What is a Database?

**Database** = A organized collection of data (like a smart filing system)

### Regular Filing System:
```
File Cabinet
├── Folder: Leaders
│   ├── File: Pastor John
│   ├── File: Youth Pastor Mary
│   └── File: Worship Leader David
├── Folder: Events
│   ├── File: Sunday Service
│   └── File: Prayer Meeting
└── Folder: Sermons
    ├── File: Sermon 1
    └── File: Sermon 2
```

### Database (Same Idea, But Digital):
```
Database
├── Table: leaders
│   ├── Row 1: Pastor John (id: 1)
│   ├── Row 2: Youth Pastor Mary (id: 2)
│   └── Row 3: Worship Leader David (id: 3)
├── Table: events
│   ├── Row 1: Sunday Service (id: 1)
│   └── Row 2: Prayer Meeting (id: 2)
└── Table: sermons
    ├── Row 1: Sermon 1 (id: 1)
    └── Row 2: Sermon 2 (id: 2)
```

### Why Use a Database?
- **Organized** - Data is structured and organized
- **Fast** - Can find data quickly
- **Reliable** - Data is safely stored
- **Scalable** - Can handle lots of data
- **Searchable** - Can find specific data easily

---

## 3️⃣ Database Tables Explained

### 👤 USERS Table
**What it stores:** Login information for admins

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| openId | Text | "user123" |
| name | Text | "John Smith" |
| email | Text | "john@church.com" |
| role | Text | "admin" or "user" |
| createdAt | Date | 2026-01-15 |

**Why:** To know who is logged in and what they can do

---

### ⛪ CHURCH SETTINGS Table
**What it stores:** Global church information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| churchName | Text | "God's Covering Church" |
| logoUrl | Text | "https://..." |
| address | Text | "123 Main St" |
| phone | Text | "(555) 123-4567" |
| email | Text | "info@church.com" |
| visionStatement | Text | "Go and Make Disciples..." |

**Why:** Store church info that appears on every page

---

### 👥 LEADERS Table
**What it stores:** Church leadership team information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| name | Text | "Pastor John" |
| position | Text | "Senior Pastor" |
| ministry | Text | "Worship" |
| biography | Text | "John has been..." |
| photoUrl | Text | "https://..." |
| favoriteVerseReference | Text | "John 3:16" |
| displayOrder | Number | 1 |

**Why:** Display leader profiles on the Leadership page

---

### 📖 SERMONS Table
**What it stores:** Sermon information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| title | Text | "Faith in Action" |
| speaker | Text | "Pastor John" |
| description | Text | "In this sermon..." |
| sermonDate | Date | 2026-01-15 |
| category | Text | "Discipleship" |
| videoUrl | Text | "https://..." |
| audioUrl | Text | "https://..." |
| pdfNotesUrl | Text | "https://..." |

**Why:** Store sermon details for the Sermon Library

---

### 📅 EVENTS Table
**What it stores:** Church event information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| title | Text | "Sunday Service" |
| description | Text | "Join us for..." |
| eventDate | Date | 2026-01-20 |
| eventTime | Text | "10:00 AM" |
| venue | Text | "Main Sanctuary" |
| hasRegistration | Boolean | true |
| registrationUrl | Text | "https://..." |

**Why:** Display upcoming events on the Events page

---

### 🏛️ MINISTRIES Table
**What it stores:** Church ministry information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| name | Text | "Youth Ministry" |
| description | Text | "Serving young people..." |
| imageUrl | Text | "https://..." |
| contactEmail | Text | "youth@church.com" |
| contactPhone | Text | "(555) 123-4567" |

**Why:** Display all church ministries

---

### 🙏 PRAYER REQUESTS Table
**What it stores:** Visitor prayer requests

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| name | Text | "Jane Doe" |
| email | Text | "jane@email.com" |
| phone | Text | "(555) 987-6543" |
| request | Text | "Please pray for..." |
| isPublic | Boolean | false |
| isAnswered | Boolean | false |
| createdAt | Date | 2026-01-15 |

**Why:** Store prayer requests for admin to view

---

### 📰 ANNOUNCEMENTS Table
**What it stores:** Church news and announcements

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| title | Text | "New Bible Study" |
| content | Text | "We're starting a new..." |
| imageUrl | Text | "https://..." |
| publishedDate | Date | 2026-01-15 |
| isPublished | Boolean | true |

**Why:** Display announcements on homepage and news page

---

### 🖼️ GALLERY ALBUMS Table
**What it stores:** Photo/video album information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| name | Text | "Sunday Service Photos" |
| description | Text | "Photos from..." |
| coverImageUrl | Text | "https://..." |
| displayOrder | Number | 1 |

**Why:** Organize photos into albums

---

### 🖼️ GALLERY ITEMS Table
**What it stores:** Individual photos/videos in albums

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| albumId | Number | 1 |
| mediaUrl | Text | "https://..." |
| mediaType | Text | "image" or "video" |
| caption | Text | "Sunday worship" |

**Why:** Store individual photos/videos linked to albums

---

### 📚 RESOURCES Table
**What it stores:** Downloadable materials

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| title | Text | "Bible Study Guide" |
| description | Text | "Study guide for..." |
| category | Text | "Bible Study" |
| fileUrl | Text | "https://..." |
| fileName | Text | "study-guide.pdf" |

**Why:** Store downloadable resources

---

### 🪜 LADDERS OF SUCCESS Table
**What it stores:** Discipleship stages

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| stageName | Text | "WIN" |
| title | Text | "Winning Souls" |
| description | Text | "Reaching people..." |
| bibleVerse | Text | "John 3:16" |
| iconUrl | Text | "https://..." |
| imageUrl | Text | "https://..." |

**Why:** Display the 4 stages of discipleship

---

### ❓ FAQ Table
**What it stores:** Frequently asked questions

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| question | Text | "What time is service?" |
| answer | Text | "Service starts at 10 AM" |
| category | Text | "General" |

**Why:** Display FAQs on First-Time Visitors page

---

### 👋 VISITOR REGISTRATIONS Table
**What it stores:** First-time visitor information

| Column | Type | Example |
|--------|------|---------|
| id | Number | 1 |
| firstName | Text | "Jane" |
| lastName | Text | "Doe" |
| email | Text | "jane@email.com" |
| phone | Text | "(555) 987-6543" |
| isFirstTime | Boolean | true |
| comments | Text | "Great service!" |

**Why:** Store visitor registration information

---

## 4️⃣ What is an API?

**API** = Application Programming Interface (a way for programs to talk to each other)

Think of it like a restaurant menu:
- **Menu** = List of available dishes
- **API** = List of available functions
- **Order** = Request to the API
- **Food** = Response from the API

### Example API Request:
```
Frontend: "Hey backend, give me all upcoming events"
Backend: "Sure! Here are 3 upcoming events"
Frontend: "Thanks! I'll display them on the page"
```

### Why Use an API?
- **Security** - Backend controls what data is shared
- **Organization** - Clear way to request data
- **Efficiency** - Only get the data you need
- **Consistency** - Same format every time

---

## 5️⃣ tRPC Procedures Explained

**tRPC** = A way to call backend functions from the frontend (like a telephone)

### How tRPC Works:

```
Frontend                          Backend
   |                                |
   |---> trpc.events.list.useQuery()---> Backend gets all events
   |                                |
   |<--- Backend sends events ------<---|
   |                                |
   |---> trpc.events.create.useMutation()---> Backend creates new event
   |                                |
   |<--- Backend confirms --------<---|
```

### Types of tRPC Procedures:

#### 1. **Query** (Get data - Read only)
```javascript
// Get all events
const events = trpc.events.list.useQuery();

// Get upcoming events
const upcoming = trpc.events.upcoming.useQuery({ limit: 3 });

// Search sermons
const results = trpc.sermons.search.useQuery({ query: "faith" });
```

**When to use:** When you just want to read/get data

#### 2. **Mutation** (Change data - Create, Update, Delete)
```javascript
// Create new event
const create = trpc.events.create.useMutation();

// Update event
const update = trpc.events.update.useMutation();

// Delete event
const deleteEvent = trpc.events.delete.useMutation();

// Submit prayer request
const submit = trpc.prayerRequests.submit.useMutation();
```

**When to use:** When you want to change data

### Example: Getting Events

**Frontend Code:**
```javascript
const events = trpc.events.list.useQuery();

if (events.isLoading) {
  return <p>Loading...</p>;
}

return (
  <div>
    {events.data?.map((event) => (
      <div key={event.id}>{event.title}</div>
    ))}
  </div>
);
```

**What happens:**
1. Frontend calls `trpc.events.list.useQuery()`
2. tRPC sends request to backend
3. Backend gets all events from database
4. Backend sends events back to frontend
5. Frontend displays events
6. If user clicks refresh, it fetches again

---

## 6️⃣ How Data Flows

### Complete Flow: Viewing Events

```
1. User opens Events page
   ↓
2. React component loads
   ↓
3. Component calls: trpc.events.list.useQuery()
   ↓
4. Frontend sends request to backend
   ↓
5. Backend receives request
   ↓
6. Backend queries database: "Get all events"
   ↓
7. Database returns events
   ↓
8. Backend sends events to frontend
   ↓
9. Frontend receives events
   ↓
10. Component displays events on page
   ↓
11. User sees events!
```

### Complete Flow: Creating Event (Admin)

```
1. Admin fills out event form
   ↓
2. Admin clicks "Create Event" button
   ↓
3. React component calls: trpc.events.create.useMutation()
   ↓
4. Frontend sends event data to backend
   ↓
5. Backend receives request
   ↓
6. Backend checks: "Is user an admin?" (Yes)
   ↓
7. Backend validates data (is it correct format?)
   ↓
8. Backend saves to database
   ↓
9. Backend sends confirmation to frontend
   ↓
10. Frontend shows success message
   ↓
11. Frontend refreshes event list
   ↓
12. New event appears!
```

---

## 7️⃣ Server Code Structure

### File Structure:

```
server/
├── _core/
│   ├── index.ts              # Main server file
│   ├── context.ts            # User context (who is logged in)
│   ├── trpc.ts               # tRPC setup
│   ├── oauth.ts              # Login/logout
│   ├── llm.ts                # AI integration
│   ├── imageGeneration.ts    # Image generation
│   ├── map.ts                # Google Maps
│   └── ...other helpers
├── db.ts                      # Database queries
├── routers.ts                 # All tRPC procedures
└── storage.ts                 # File upload/download
```

### Key Files Explained:

#### **db.ts** - Database Queries
```javascript
// Get all leaders
export async function getLeaders() {
  const db = await getDb();
  return db.select().from(leaders);
}

// Create new event
export async function createEvent(data) {
  const db = await getDb();
  return db.insert(events).values(data);
}

// Update leader
export async function updateLeader(id, data) {
  const db = await getDb();
  return db.update(leaders)
    .set(data)
    .where(eq(leaders.id, id));
}

// Delete announcement
export async function deleteAnnouncement(id) {
  const db = await getDb();
  return db.delete(announcements)
    .where(eq(announcements.id, id));
}
```

**What it does:** Contains all database operations (get, create, update, delete)

#### **routers.ts** - tRPC Procedures
```javascript
export const appRouter = router({
  // Get all events
  events: router({
    list: publicProcedure.query(async () => {
      return await db.getEvents();
    }),
    
    // Create new event (admin only)
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        eventDate: z.date(),
        venue: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.createEvent(input);
      }),
  }),
});
```

**What it does:** Defines all API endpoints (procedures) that frontend can call

#### **_core/context.ts** - User Information
```javascript
// Provides user info to procedures
export async function createContext(opts: CreateContextOptions) {
  const user = await getLoggedInUser(opts.req);
  
  return {
    user,  // Current logged-in user
    req: opts.req,
    res: opts.res,
  };
}
```

**What it does:** Knows who is logged in and what they can do

---

## 🔐 Security & Permissions

### Public vs Admin Procedures

**Public Procedure** - Anyone can use
```javascript
// Anyone can view events
list: publicProcedure.query(async () => {
  return await db.getEvents();
})
```

**Admin Procedure** - Only admins can use
```javascript
// Only admins can create events
create: adminProcedure
  .input(z.object({ title: z.string() }))
  .mutation(async ({ input }) => {
    return await db.createEvent(input);
  })
```

### How It Works:
```
Frontend calls: trpc.events.create.useMutation()
   ↓
Backend receives request
   ↓
Backend checks: Is user an admin?
   ↓
If YES → Create event
If NO  → Send error "Access Denied"
```

---

## 📝 Common Database Operations

### SELECT (Get Data)
```javascript
// Get all leaders
const leaders = await db.select().from(leadersTable);

// Get specific leader
const leader = await db.select()
  .from(leadersTable)
  .where(eq(leadersTable.id, 1));

// Get with filter
const events = await db.select()
  .from(eventsTable)
  .where(gt(eventsTable.eventDate, new Date()));
```

### INSERT (Add Data)
```javascript
// Add new leader
await db.insert(leadersTable).values({
  name: "John Smith",
  position: "Pastor",
  ministry: "Worship",
});
```

### UPDATE (Change Data)
```javascript
// Update leader
await db.update(leadersTable)
  .set({ name: "John Doe" })
  .where(eq(leadersTable.id, 1));
```

### DELETE (Remove Data)
```javascript
// Delete event
await db.delete(eventsTable)
  .where(eq(eventsTable.id, 1));
```

---

## 🚀 How to Add a New Feature

### Step 1: Add Database Table
Edit `drizzle/schema.ts`:
```javascript
export const testimonies = mysqlTable("testimonies", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  story: text("story").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

### Step 2: Create Migration
```bash
pnpm drizzle-kit generate
```

### Step 3: Add Database Queries
Edit `server/db.ts`:
```javascript
export async function getTestimonies() {
  const db = await getDb();
  return db.select().from(testimonies);
}

export async function createTestimony(data) {
  const db = await getDb();
  return db.insert(testimonies).values(data);
}
```

### Step 4: Add tRPC Procedures
Edit `server/routers.ts`:
```javascript
testimonies: router({
  list: publicProcedure.query(async () => {
    return await db.getTestimonies();
  }),
  create: adminProcedure
    .input(z.object({
      name: z.string(),
      story: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await db.createTestimony(input);
    }),
}),
```

### Step 5: Use in Frontend
```javascript
const testimonies = trpc.testimonies.list.useQuery();
const create = trpc.testimonies.create.useMutation();
```

---

## 🤔 Common Questions

**Q: What's the difference between Query and Mutation?**
A: Query gets data (read-only). Mutation changes data (create/update/delete).

**Q: Why do we need authentication?**
A: To make sure only admins can change data, and visitors can only view.

**Q: What if someone tries to hack the backend?**
A: Backend checks permissions before allowing any action.

**Q: How is data stored safely?**
A: Database stores data with encryption and backups.

**Q: Can I access the database directly?**
A: No, you must use the backend API. This keeps data safe.

---

## ✅ Summary

- **Backend** = Server that processes requests
- **Database** = Organized storage of data
- **Tables** = Collections of related data
- **API** = Way for frontend to request data
- **tRPC** = Easy way to call backend functions
- **Query** = Get data
- **Mutation** = Change data
- **Admin Procedure** = Only admins can use
- **Public Procedure** = Anyone can use

The backend is like a restaurant kitchen:
- Frontend orders (requests)
- Backend prepares (processes)
- Database stores (ingredients)
- Frontend receives (serves to customer)

Good luck! 🎉
