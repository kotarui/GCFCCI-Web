import { eq, desc, asc, like, and, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  leaders,
  sermons,
  events,
  ministries,
  prayerRequests,
  announcements,
  galleryAlbums,
  galleryItems,
  resources,
  laddersOfSuccess,
  faqs,
  visitorRegistrations,
  churchSettings,
  homepageLayout,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ CHURCH SETTINGS ============

export async function getChurchSettings() {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(churchSettings).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateChurchSettings(data: Partial<typeof churchSettings.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await getChurchSettings();
  if (existing) {
    return await db.update(churchSettings).set(data).where(eq(churchSettings.id, existing.id));
  } else {
    return await db.insert(churchSettings).values(data as any);
  }
}

// ============ LEADERS ============

export async function getLeaders() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(leaders).orderBy(asc(leaders.displayOrder), desc(leaders.createdAt));
}

export async function getLeaderById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(leaders).where(eq(leaders.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createLeader(data: typeof leaders.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(leaders).values(data);
  return result;
}

export async function updateLeader(id: number, data: Partial<typeof leaders.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(leaders).set(data).where(eq(leaders.id, id));
}

export async function deleteLeader(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(leaders).where(eq(leaders.id, id));
}

export async function reorderLeaders(updates: Array<{ id: number; displayOrder: number }>) {
  const db = await getDb();
  if (!db) return null;
  
  for (const { id, displayOrder } of updates) {
    await db.update(leaders).set({ displayOrder }).where(eq(leaders.id, id));
  }
}

// ============ SERMONS ============

export async function getSermons(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(sermons).orderBy(desc(sermons.sermonDate), desc(sermons.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return await query;
}

export async function searchSermons(searchTerm: string, category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [like(sermons.title, `%${searchTerm}%`)];
  if (category) {
    conditions.push(eq(sermons.category, category));
  }
  
  return await db.select().from(sermons).where(and(...conditions)).orderBy(desc(sermons.sermonDate));
}

export async function getSermonById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(sermons).where(eq(sermons.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createSermon(data: typeof sermons.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(sermons).values(data);
}

export async function updateSermon(id: number, data: Partial<typeof sermons.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(sermons).set(data).where(eq(sermons.id, id));
}

export async function deleteSermon(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(sermons).where(eq(sermons.id, id));
}

// ============ EVENTS ============

export async function getEvents(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(events).orderBy(asc(events.eventDate), desc(events.createdAt));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return await query;
}

export async function getUpcomingEvents(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  
  const now = new Date();
  let query = db.select().from(events).where(gt(events.eventDate, now)).orderBy(asc(events.eventDate));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return await query;
}

export async function getEventById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createEvent(data: typeof events.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(events).values(data);
}

export async function updateEvent(id: number, data: Partial<typeof events.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(events).set(data).where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(events).where(eq(events.id, id));
}

// ============ MINISTRIES ============

export async function getMinistries() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(ministries).orderBy(asc(ministries.displayOrder), desc(ministries.createdAt));
}

export async function getMinistryById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(ministries).where(eq(ministries.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createMinistry(data: typeof ministries.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(ministries).values(data);
}

export async function updateMinistry(id: number, data: Partial<typeof ministries.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(ministries).set(data).where(eq(ministries.id, id));
}

export async function deleteMinistry(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(ministries).where(eq(ministries.id, id));
}

// ============ PRAYER REQUESTS ============

export async function createPrayerRequest(data: typeof prayerRequests.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(prayerRequests).values(data);
}

export async function getPrayerRequests() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(prayerRequests).orderBy(desc(prayerRequests.createdAt));
}

export async function updatePrayerRequest(id: number, data: Partial<typeof prayerRequests.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(prayerRequests).set(data).where(eq(prayerRequests.id, id));
}

// ============ ANNOUNCEMENTS ============

export async function getAnnouncements(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.publishedDate));
  if (limit) {
    query = query.limit(limit) as any;
  }
  return await query;
}

export async function createAnnouncement(data: typeof announcements.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(announcements).values(data);
}

export async function updateAnnouncement(id: number, data: Partial<typeof announcements.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(announcements).set(data).where(eq(announcements.id, id));
}

export async function deleteAnnouncement(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(announcements).where(eq(announcements.id, id));
}

// ============ GALLERY ============

export async function getGalleryAlbums() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(galleryAlbums).orderBy(asc(galleryAlbums.displayOrder));
}

export async function getGalleryItemsByAlbum(albumId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(galleryItems).where(eq(galleryItems.albumId, albumId)).orderBy(asc(galleryItems.displayOrder));
}

export async function createGalleryAlbum(data: typeof galleryAlbums.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(galleryAlbums).values(data);
}

export async function createGalleryItem(data: typeof galleryItems.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(galleryItems).values(data);
}

export async function deleteGalleryAlbum(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  // Delete all items in the album first
  await db.delete(galleryItems).where(eq(galleryItems.albumId, id));
  return await db.delete(galleryAlbums).where(eq(galleryAlbums.id, id));
}

export async function deleteGalleryItem(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(galleryItems).where(eq(galleryItems.id, id));
}

// ============ RESOURCES ============

export async function getResources(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(resources).orderBy(asc(resources.displayOrder));
  if (category) {
    query = query.where(eq(resources.category, category)) as any;
  }
  return await query;
}

export async function createResource(data: typeof resources.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(resources).values(data);
}

export async function updateResource(id: number, data: Partial<typeof resources.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(resources).set(data).where(eq(resources.id, id));
}

export async function deleteResource(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(resources).where(eq(resources.id, id));
}

// ============ LADDERS OF SUCCESS ============

export async function getLaddersOfSuccess() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(laddersOfSuccess).orderBy(asc(laddersOfSuccess.displayOrder));
}

export async function updateLaddersOfSuccess(stageName: string, data: Partial<typeof laddersOfSuccess.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await db.select().from(laddersOfSuccess).where(eq(laddersOfSuccess.stageName, stageName)).limit(1);
  if (existing.length > 0) {
    return await db.update(laddersOfSuccess).set(data).where(eq(laddersOfSuccess.id, existing[0].id));
  } else {
    return await db.insert(laddersOfSuccess).values({ stageName, ...data } as any);
  }
}

// ============ FAQ ============

export async function getFAQs(category?: string) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(faqs).orderBy(asc(faqs.displayOrder));
  if (category) {
    query = query.where(eq(faqs.category, category)) as any;
  }
  return await query;
}

export async function createFAQ(data: typeof faqs.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(faqs).values(data);
}

export async function updateFAQ(id: number, data: Partial<typeof faqs.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.update(faqs).set(data).where(eq(faqs.id, id));
}

export async function deleteFAQ(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.delete(faqs).where(eq(faqs.id, id));
}

// ============ VISITOR REGISTRATIONS ============

export async function createVisitorRegistration(data: typeof visitorRegistrations.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  
  return await db.insert(visitorRegistrations).values(data);
}

export async function getVisitorRegistrations() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(visitorRegistrations).orderBy(desc(visitorRegistrations.createdAt));
}

// ============ HOMEPAGE LAYOUT ============

export async function getHomepageLayout() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(homepageLayout).orderBy(asc(homepageLayout.displayOrder));
}

export async function updateHomepageLayout(sectionName: string, data: Partial<typeof homepageLayout.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await db.select().from(homepageLayout).where(eq(homepageLayout.sectionName, sectionName)).limit(1);
  if (existing.length > 0) {
    return await db.update(homepageLayout).set(data).where(eq(homepageLayout.id, existing[0].id));
  } else {
    return await db.insert(homepageLayout).values({ sectionName, ...data } as any);
  }
}
