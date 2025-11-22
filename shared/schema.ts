import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const programs = pgTable("programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
});

export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  image: text("image").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  readTime: integer("read_time").notNull(),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const staff = pgTable("staff", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  email: text("email"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* -------------------- NEW DYNAMIC CONTENT -------------------- */

export const heroSlides = pgTable("hero_slides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  image: text("image").notNull(),
  programPath: text("program_path").notNull(),
  order: integer("order").notNull().default(0),
});

export const impactStats = pgTable("impact_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
  order: integer("order").notNull().default(0),
});

export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  category: text("category").notNull(), // Funding, Implementation, Community
  website: text("website"),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  // Stats fields
  duration: text("duration").notNull(),
  beneficiaries: text("beneficiaries").notNull(),
  partners: text("partners").notNull(),
  outcomes: text("outcomes").notNull(),
});

/* -------------------- DONATIONS -------------------- */

export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: integer("amount").notNull(),
  donorName: text("donor_name"),
  donorEmail: text("donor_email").notNull(),
  // program here is stored as text, but we restrict allowed values in the Zod schema
  program: text("program").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* -------------------- INSERT SCHEMAS -------------------- */

export const insertProgramSchema = createInsertSchema(programs).omit({ id: true });
export const insertStorySchema = createInsertSchema(stories).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishedAt: true });
export const insertStaffSchema = createInsertSchema(staff).omit({ id: true });
export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions)
  .omit({ id: true, subscribedAt: true })
  .extend({
    email: z.string().email("Please enter a valid email address"),
  });
export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

export const insertDonationSchema = createInsertSchema(donations)
  .omit({ id: true, createdAt: true })
  .extend({
    amount: z.number().min(1, "Donation amount must be at least ₹1"),
    donorEmail: z.string().email("Please enter a valid email address"),
    donorName: z.string().optional(),
    program: z.enum(["general", "education", "nutrition", "healthcare"]),
  });

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true });
export const insertImpactStatSchema = createInsertSchema(impactStats).omit({ id: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });

/* -------------------- TYPES -------------------- */

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Story = typeof stories.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = z.infer<typeof insertStaffSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;

export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;

export type ImpactStat = typeof impactStats.$inferSelect;
export type InsertImpactStat = z.infer<typeof insertImpactStatSchema>;

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
