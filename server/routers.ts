import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ CHURCH SETTINGS ============
  settings: router({
    get: publicProcedure.query(async () => {
      return await db.getChurchSettings();
    }),
    update: adminProcedure
      .input(z.object({
        churchName: z.string().optional(),
        logoUrl: z.string().optional(),
        bannerImageUrl: z.string().optional(),
        primaryColor: z.string().optional(),
        accentColor: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        facebookUrl: z.string().optional(),
        visionStatement: z.string().optional(),
        missionStatement: z.string().optional(),
        purposeStatement: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateChurchSettings(input);
      }),
  }),

  // ============ LEADERS ============
  leaders: router({
    list: publicProcedure.query(async () => {
      return await db.getLeaders();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getLeaderById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        position: z.string(),
        ministry: z.string().optional(),
        biography: z.string().optional(),
        photoUrl: z.string().optional(),
        favoriteVerseReference: z.string().optional(),
        favoriteVerseText: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createLeader(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        position: z.string().optional(),
        ministry: z.string().optional(),
        biography: z.string().optional(),
        photoUrl: z.string().optional(),
        favoriteVerseReference: z.string().optional(),
        favoriteVerseText: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateLeader(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteLeader(input.id);
      }),
    reorder: adminProcedure
      .input(z.object({
        updates: z.array(z.object({ id: z.number(), displayOrder: z.number() }))
      }))
      .mutation(async ({ input }) => {
        return await db.reorderLeaders(input.updates);
      }),
  }),

  // ============ SERMONS ============
  sermons: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getSermons(input.limit);
      }),
    search: publicProcedure
      .input(z.object({ 
        searchTerm: z.string(),
        category: z.string().optional()
      }))
      .query(async ({ input }) => {
        return await db.searchSermons(input.searchTerm, input.category);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getSermonById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        speaker: z.string(),
        description: z.string().optional(),
        sermonDate: z.date(),
        category: z.string().optional(),
        bibleReferences: z.string().optional(),
        videoUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        pdfNotesUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createSermon(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        speaker: z.string().optional(),
        description: z.string().optional(),
        sermonDate: z.date().optional(),
        category: z.string().optional(),
        bibleReferences: z.string().optional(),
        videoUrl: z.string().optional(),
        audioUrl: z.string().optional(),
        pdfNotesUrl: z.string().optional(),
        thumbnailUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateSermon(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteSermon(input.id);
      }),
  }),

  // ============ EVENTS ============
  events: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getEvents(input.limit);
      }),
    upcoming: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getUpcomingEvents(input.limit);
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getEventById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        bannerImageUrl: z.string().optional(),
        eventDate: z.date(),
        eventTime: z.string().optional(),
        venue: z.string().optional(),
        hasRegistration: z.boolean().optional(),
        registrationUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createEvent(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        bannerImageUrl: z.string().optional(),
        eventDate: z.date().optional(),
        eventTime: z.string().optional(),
        venue: z.string().optional(),
        hasRegistration: z.boolean().optional(),
        registrationUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateEvent(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteEvent(input.id);
      }),
  }),

  // ============ MINISTRIES ============
  ministries: router({
    list: publicProcedure.query(async () => {
      return await db.getMinistries();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getMinistryById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createMinistry(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        contactEmail: z.string().optional(),
        contactPhone: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateMinistry(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteMinistry(input.id);
      }),
  }),

  // ============ PRAYER REQUESTS ============
  prayerRequests: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        request: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPrayerRequest(input as any);
      }),
    list: adminProcedure.query(async () => {
      return await db.getPrayerRequests();
    }),
    markAnswered: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.updatePrayerRequest(input.id, { isAnswered: true });
      }),
  }),

  // ============ ANNOUNCEMENTS ============
  announcements: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return await db.getAnnouncements(input.limit);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        content: z.string(),
        imageUrl: z.string().optional(),
        isPublished: z.boolean().optional(),
        publishedDate: z.date(),
      }))
      .mutation(async ({ input }) => {
        return await db.createAnnouncement(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        isPublished: z.boolean().optional(),
        publishedDate: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateAnnouncement(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteAnnouncement(input.id);
      }),
  }),

  // ============ GALLERY ============
  gallery: router({
    albums: publicProcedure.query(async () => {
      return await db.getGalleryAlbums();
    }),
    items: publicProcedure
      .input(z.object({ albumId: z.number() }))
      .query(async ({ input }) => {
        return await db.getGalleryItemsByAlbum(input.albumId);
      }),
    createAlbum: adminProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        coverImageUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createGalleryAlbum(input as any);
      }),
    addItem: adminProcedure
      .input(z.object({
        albumId: z.number(),
        mediaUrl: z.string(),
        mediaType: z.enum(["image", "video"]),
        caption: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createGalleryItem(input as any);
      }),
    deleteAlbum: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteGalleryAlbum(input.id);
      }),
    deleteItem: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteGalleryItem(input.id);
      }),
  }),

  // ============ RESOURCES ============
  resources: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        return await db.getResources(input.category);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        fileUrl: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.createResource(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        fileUrl: z.string().optional(),
        fileName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateResource(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteResource(input.id);
      }),
  }),

  // ============ LADDERS OF SUCCESS ============
  laddersOfSuccess: router({
    list: publicProcedure.query(async () => {
      return await db.getLaddersOfSuccess();
    }),
    update: adminProcedure
      .input(z.object({
        stageName: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        bibleVerse: z.string().optional(),
        bibleVerseText: z.string().optional(),
        iconUrl: z.string().optional(),
        imageUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateLaddersOfSuccess(input.stageName, input);
      }),
  }),

  // ============ FAQ ============
  faqs: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        return await db.getFAQs(input.category);
      }),
    create: adminProcedure
      .input(z.object({
        question: z.string(),
        answer: z.string(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createFAQ(input as any);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        question: z.string().optional(),
        answer: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateFAQ(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteFAQ(input.id);
      }),
  }),

  // ============ VISITOR REGISTRATIONS ============
  visitorRegistrations: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        isFirstTime: z.boolean().optional(),
        comments: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createVisitorRegistration(input as any);
      }),
    list: adminProcedure.query(async () => {
      return await db.getVisitorRegistrations();
    }),
  }),

  // ============ HOMEPAGE LAYOUT ============
  homepageLayout: router({
    get: publicProcedure.query(async () => {
      return await db.getHomepageLayout();
    }),
    update: adminProcedure
      .input(z.object({
        sectionName: z.string(),
        isVisible: z.boolean().optional(),
        displayOrder: z.number().optional(),
        configuration: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateHomepageLayout(input.sectionName, input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
