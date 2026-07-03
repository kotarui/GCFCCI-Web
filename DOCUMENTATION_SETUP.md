# Setup & Configuration Documentation
## God's Covering Family Cell Church Inc.

---

## 📚 Table of Contents
1. Project Overview
2. Technology Stack
3. Project Structure
4. Installation & Setup
5. Running the Website
6. Environment Variables
7. Database Setup
8. Deployment
9. Troubleshooting
10. File Descriptions

---

## 1️⃣ Project Overview

### What is This Project?
A complete church website built with modern web technologies. It includes:
- **Public Website** - 13 pages for visitors
- **Admin Dashboard** - Content management interface
- **Database** - Stores all church data
- **API** - Backend server that powers everything

### Key Features:
- Responsive design (works on phone, tablet, desktop)
- Admin authentication (login required for admins)
- Real-time data updates
- Professional branding
- Easy to customize

### Who Built It?
This website was built using:
- **React** - Frontend framework
- **Express** - Backend server
- **TiDB/MySQL** - Database
- **Tailwind CSS** - Styling
- **tRPC** - API communication

---

## 2️⃣ Technology Stack

### Frontend (What Visitors See)
- **React 19** - JavaScript library for building interfaces
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - JavaScript with type safety
- **Vite** - Fast build tool
- **Wouter** - Lightweight routing

### Backend (Server)
- **Express 4** - Web server framework
- **Node.js** - JavaScript runtime
- **tRPC 11** - Type-safe API communication
- **TypeScript** - Type-safe code

### Database
- **TiDB/MySQL** - Relational database
- **Drizzle ORM** - Database query builder

### Styling & UI
- **Tailwind CSS** - Utility classes for styling
- **shadcn/ui** - Pre-built UI components
- **Lucide Icons** - Icon library

### Tools
- **pnpm** - Package manager (like npm)
- **Vitest** - Testing framework
- **Prettier** - Code formatter
- **TypeScript** - Type checking

---

## 3️⃣ Project Structure

### Main Folders:

```
gods-covering-church/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/            # All website pages
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Utility functions
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom React hooks
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static files
│   └── index.html            # HTML template
│
├── server/                    # Backend (Express)
│   ├── _core/                # Core server files
│   │   ├── index.ts          # Main server file
│   │   ├── context.ts        # User context
│   │   ├── trpc.ts           # tRPC setup
│   │   ├── oauth.ts          # Login/logout
│   │   └── ...other helpers
│   ├── db.ts                 # Database queries
│   ├── routers.ts            # API procedures
│   └── storage.ts            # File upload
│
├── drizzle/                   # Database
│   ├── schema.ts             # Database tables
│   └── migrations/           # Database changes
│
├── shared/                    # Shared code
│   ├── const.ts              # Constants
│   └── types.ts              # Shared types
│
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── drizzle.config.ts         # Drizzle config
```

### Key Files:

| File | Purpose |
|------|---------|
| `client/src/App.tsx` | Main app, routing setup |
| `client/src/pages/Home.tsx` | Homepage |
| `server/routers.ts` | All API endpoints |
| `server/db.ts` | Database queries |
| `drizzle/schema.ts` | Database tables |
| `package.json` | Dependencies |
| `.env` | Environment variables |

---

## 4️⃣ Installation & Setup

### Prerequisites:
- Node.js 18+ installed
- npm or pnpm package manager
- Git (for version control)
- A code editor (VS Code recommended)

### Step 1: Clone the Project
```bash
git clone <project-url>
cd gods-covering-church
```

### Step 2: Install Dependencies
```bash
pnpm install
```

This downloads all required packages.

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory:
```
DATABASE_URL=mysql://user:password@localhost:3306/church_db
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
```

### Step 4: Set Up Database
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

This creates the database tables.

### Step 5: Start Development Server
```bash
pnpm dev
```

The website will be available at `http://localhost:3000`

---

## 5️⃣ Running the Website

### Development Mode (for editing):
```bash
pnpm dev
```
- Website updates automatically when you save files
- Shows error messages in the browser
- Slower performance (but easier to debug)

### Production Mode (for deployment):
```bash
pnpm build
pnpm start
```
- Website is optimized for speed
- Errors are hidden from users
- Faster performance

### Testing:
```bash
pnpm test
```
Runs automated tests to check if everything works.

### Code Formatting:
```bash
pnpm format
```
Automatically formats code to be consistent.

### Type Checking:
```bash
pnpm check
```
Checks for TypeScript errors.

---

## 6️⃣ Environment Variables

**Environment Variables** = Settings that change based on where the website runs

### Required Variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | Database connection | `mysql://user:pass@localhost/db` |
| `JWT_SECRET` | Session encryption key | `your-secret-key-123` |
| `VITE_APP_ID` | OAuth app ID | `app-123-456` |
| `OAUTH_SERVER_URL` | OAuth server URL | `https://api.manus.im` |

### Optional Variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_APP_TITLE` | Website title | `God's Covering Church` |
| `VITE_APP_LOGO` | Logo URL | `https://...` |
| `NODE_ENV` | Environment | `development` or `production` |

### How to Set Variables:

**Option 1: .env file (Development)**
```
DATABASE_URL=mysql://localhost/church_db
JWT_SECRET=my-secret-key
VITE_APP_ID=app-123
```

**Option 2: System environment (Production)**
```bash
export DATABASE_URL=mysql://localhost/church_db
export JWT_SECRET=my-secret-key
```

---

## 7️⃣ Database Setup

### What is the Database?
A system that stores all church data (leaders, events, sermons, etc.)

### Database Tables:
The database has 15 tables:
1. `users` - Admin users
2. `church_settings` - Church information
3. `leaders` - Church leaders
4. `sermons` - Sermon library
5. `events` - Church events
6. `ministries` - Church ministries
7. `prayer_requests` - Prayer requests
8. `announcements` - News & announcements
9. `gallery_albums` - Photo albums
10. `gallery_items` - Photos/videos
11. `resources` - Downloadable files
12. `ladders_of_success` - Discipleship stages
13. `faqs` - Frequently asked questions
14. `visitor_registrations` - Visitor signups
15. `homepage_layout` - Homepage configuration

### Creating the Database:

**Step 1: Create Database**
```bash
mysql -u root -p
CREATE DATABASE church_db;
EXIT;
```

**Step 2: Run Migrations**
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

**Step 3: Verify Tables**
```bash
mysql -u root -p church_db
SHOW TABLES;
```

### Connecting to Database:

**Update `.env` file:**
```
DATABASE_URL=mysql://root:password@localhost:3306/church_db
```

Replace:
- `root` = your MySQL username
- `password` = your MySQL password
- `localhost` = your database server
- `church_db` = your database name

---

## 8️⃣ Deployment

### What is Deployment?
Making your website available on the internet (not just on your computer)

### Deployment Options:

#### Option 1: Manus Hosting (Recommended)
- Click "Publish" button in Manus UI
- Website is deployed automatically
- Custom domain support
- Free HTTPS

#### Option 2: Vercel
```bash
npm install -g vercel
vercel
```

#### Option 3: Railway
1. Create Railway account
2. Connect GitHub repository
3. Deploy with one click

#### Option 4: Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Pre-Deployment Checklist:
- [ ] All environment variables set
- [ ] Database is set up
- [ ] Code has no errors (`pnpm check`)
- [ ] Tests pass (`pnpm test`)
- [ ] No console errors in browser
- [ ] Admin login works
- [ ] All pages load correctly

---

## 9️⃣ Troubleshooting

### Problem: "Cannot find module"
**Solution:** Run `pnpm install` to install dependencies

### Problem: Database connection error
**Solution:** Check DATABASE_URL in .env file is correct

### Problem: Port 3000 already in use
**Solution:** Kill the process or use different port:
```bash
pnpm dev -- --port 3001
```

### Problem: TypeScript errors
**Solution:** Run `pnpm check` to see all errors, then fix them

### Problem: Website won't load
**Solution:** Check browser console for errors (F12 key)

### Problem: Admin login doesn't work
**Solution:** Make sure OAUTH_SERVER_URL is correct in .env

### Problem: Images not showing
**Solution:** Check image URLs are correct and publicly accessible

### Problem: Changes not showing
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and refresh

---

## 🔟 File Descriptions

### Frontend Files:

| File | Purpose |
|------|---------|
| `client/src/App.tsx` | Main app component, routing |
| `client/src/main.tsx` | App entry point |
| `client/src/index.css` | Global styles, Tailwind config |
| `client/src/const.ts` | Constants (URLs, config) |
| `client/src/pages/Home.tsx` | Homepage |
| `client/src/pages/Leadership.tsx` | Leadership page |
| `client/src/pages/SermonLibrary.tsx` | Sermon library |
| `client/src/pages/Events.tsx` | Events page |
| `client/src/components/DashboardLayout.tsx` | Admin layout |
| `client/src/lib/trpc.ts` | tRPC client setup |

### Backend Files:

| File | Purpose |
|------|---------|
| `server/_core/index.ts` | Main server file |
| `server/_core/context.ts` | User context (who's logged in) |
| `server/_core/trpc.ts` | tRPC setup |
| `server/_core/oauth.ts` | Login/logout logic |
| `server/db.ts` | Database queries |
| `server/routers.ts` | All API endpoints |
| `server/storage.ts` | File upload/download |

### Database Files:

| File | Purpose |
|------|---------|
| `drizzle/schema.ts` | Database table definitions |
| `drizzle/migrations/` | Database change history |
| `drizzle.config.ts` | Drizzle configuration |

### Config Files:

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies |
| `tsconfig.json` | TypeScript configuration |
| `vite.config.ts` | Vite build configuration |
| `.env` | Environment variables |
| `.gitignore` | Files to ignore in Git |

---

## 📝 Common Commands

### Development:
```bash
pnpm dev              # Start development server
pnpm dev --port 3001  # Start on different port
```

### Building:
```bash
pnpm build            # Build for production
pnpm start            # Run production build
```

### Testing & Checking:
```bash
pnpm test             # Run tests
pnpm check            # Check TypeScript errors
pnpm format           # Format code
```

### Database:
```bash
pnpm drizzle-kit generate  # Generate migrations
pnpm drizzle-kit migrate   # Apply migrations
```

---

## 🎯 Quick Start Checklist

- [ ] Install Node.js
- [ ] Clone project
- [ ] Run `pnpm install`
- [ ] Create `.env` file
- [ ] Set up database
- [ ] Run `pnpm dev`
- [ ] Visit `http://localhost:3000`
- [ ] Click "Admin" button
- [ ] Log in
- [ ] Start managing content!

---

## 🆘 Getting Help

### Check These First:
1. Read the error message carefully
2. Check `.env` file is correct
3. Make sure database is running
4. Clear browser cache
5. Restart development server

### Resources:
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **tRPC:** https://trpc.io
- **Express:** https://expressjs.com
- **TypeScript:** https://www.typescriptlang.org

---

## ✅ Summary

- **Frontend** = React code that visitors see
- **Backend** = Express server that processes requests
- **Database** = Stores all church data
- **tRPC** = API that connects frontend and backend
- **Environment Variables** = Settings that change per environment
- **Deployment** = Making website available online

### Key Commands:
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm check` - Check for errors

### File Structure:
- `client/` - Frontend code
- `server/` - Backend code
- `drizzle/` - Database code
- `package.json` - Dependencies

Good luck! 🎉
