import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Church Settings - stores global configuration
 */
export const churchSettings = mysqlTable("church_settings", {
  id: int("id").autoincrement().primaryKey(),
  churchName: varchar("churchName", { length: 255 }).notNull().default("God's Covering Family Cell Church Inc."),
  logoUrl: text("logoUrl"),
  bannerImageUrl: text("bannerImageUrl"),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#003DA5"), // Royal Blue
  accentColor: varchar("accentColor", { length: 7 }).default("#FFD700"), // Gold
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  facebookUrl: text("facebookUrl"),
  visionStatement: text("visionStatement"),
  missionStatement: text("missionStatement"),
  purposeStatement: text("purposeStatement"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChurchSettings = typeof churchSettings.$inferSelect;
export type InsertChurchSettings = typeof churchSettings.$inferInsert;

/**
 * Leaders - church leadership team
 */
export const leaders = mysqlTable("leaders", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(), // e.g., Senior Pastor, Youth Pastor
  ministry: varchar("ministry", { length: 255 }), // e.g., Worship, Youth
  biography: text("biography"),
  photoUrl: text("photoUrl"),
  favoriteVerseReference: varchar("favoriteVerseReference", { length: 255 }), // e.g., John 3:16
  favoriteVerseText: text("favoriteVerseText"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leader = typeof leaders.$inferSelect;
export type InsertLeader = typeof leaders.$inferInsert;

/**
 * Sermons - sermon library
 */
export const sermons = mysqlTable("sermons", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  speaker: varchar("speaker", { length: 255 }).notNull(),
  description: text("description"),
  sermonDate: timestamp("sermonDate").notNull(),
  category: varchar("category", { length: 255 }), // e.g., Discipleship, Worship
  bibleReferences: text("bibleReferences"), // JSON array of references
  videoUrl: text("videoUrl"), // URL to video file
  audioUrl: text("audioUrl"), // URL to audio file
  pdfNotesUrl: text("pdfNotesUrl"), // URL to PDF notes
  thumbnailUrl: text("thumbnailUrl"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = typeof sermons.$inferInsert;

/**
 * Events - church events
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  bannerImageUrl: text("bannerImageUrl"),
  eventDate: timestamp("eventDate").notNull(),
  eventTime: varchar("eventTime", { length: 10 }), // HH:MM format
  venue: varchar("venue", { length: 255 }),
  hasRegistration: boolean("hasRegistration").default(false),
  registrationUrl: text("registrationUrl"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Ministries - church ministries
 */
export const ministries = mysqlTable("ministries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Ministry = typeof ministries.$inferSelect;
export type InsertMinistry = typeof ministries.$inferInsert;

/**
 * Prayer Requests - visitor prayer requests
 */
export const prayerRequests = mysqlTable("prayer_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  request: text("request").notNull(),
  isPublic: boolean("isPublic").default(false),
  isAnswered: boolean("isAnswered").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type InsertPrayerRequest = typeof prayerRequests.$inferInsert;

/**
 * Announcements - church news and announcements
 */
export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  isPublished: boolean("isPublished").default(true),
  publishedDate: timestamp("publishedDate").notNull(),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

/**
 * Gallery Albums - photo and video albums
 */
export const galleryAlbums = mysqlTable("gallery_albums", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  coverImageUrl: text("coverImageUrl"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryAlbum = typeof galleryAlbums.$inferSelect;
export type InsertGalleryAlbum = typeof galleryAlbums.$inferInsert;

/**
 * Gallery Items - individual photos/videos in albums
 */
export const galleryItems = mysqlTable("gallery_items", {
  id: int("id").autoincrement().primaryKey(),
  albumId: int("albumId").notNull(),
  mediaUrl: text("mediaUrl").notNull(),
  mediaType: mysqlEnum("mediaType", ["image", "video"]).notNull(),
  caption: text("caption"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

/**
 * Resources - downloadable materials
 */
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 255 }), // e.g., Bible Study, Cell Group Materials, Devotionals
  fileUrl: text("fileUrl").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

/**
 * Ladders of Success - discipleship stages
 */
export const laddersOfSuccess = mysqlTable("ladders_of_success", {
  id: int("id").autoincrement().primaryKey(),
  stageName: varchar("stageName", { length: 50 }).notNull(), // WIN, CONSOLIDATE, DISCIPLE, SEND
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  bibleVerse: varchar("bibleVerse", { length: 255 }),
  bibleVerseText: text("bibleVerseText"),
  iconUrl: text("iconUrl"),
  imageUrl: text("imageUrl"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LaddersOfSuccess = typeof laddersOfSuccess.$inferSelect;
export type InsertLaddersOfSuccess = typeof laddersOfSuccess.$inferInsert;

/**
 * Homepage Layout - configurable homepage sections
 */
export const homepageLayout = mysqlTable("homepage_layout", {
  id: int("id").autoincrement().primaryKey(),
  sectionName: varchar("sectionName", { length: 255 }).notNull(), // e.g., hero, about, events, sermons
  isVisible: boolean("isVisible").default(true),
  displayOrder: int("displayOrder").default(0),
  configuration: json("configuration"), // JSON object with section-specific settings
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HomepageLayout = typeof homepageLayout.$inferSelect;
export type InsertHomepageLayout = typeof homepageLayout.$inferInsert;

/**
 * FAQ - Frequently Asked Questions
 */
export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 255 }), // e.g., First-Time Visitors, General
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = typeof faqs.$inferInsert;

/**
 * Visitor Registrations - online visitor registration
 */
export const visitorRegistrations = mysqlTable("visitor_registrations", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  isFirstTime: boolean("isFirstTime").default(true),
  comments: text("comments"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VisitorRegistration = typeof visitorRegistrations.$inferSelect;
export type InsertVisitorRegistration = typeof visitorRegistrations.$inferInsert;
