import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertNewsletterSubscriptionSchema,
  insertContactMessageSchema,
  insertProgramSchema,
  insertBlogPostSchema,
  insertProjectSchema,
  insertStaffSchema,
  insertSiteConfigSchema
} from "@shared/schema";
import { fromError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files statically
  app.use("/uploads", express.static(uploadDir));

  // File upload endpoint
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, subscription });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(400).json({ message: error.message || "Failed to subscribe" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to send message" });
    }
  });

  app.get("/api/contact-messages", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch messages" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch blog posts" });
    }
  });

  app.get("/api/programs", async (_req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch programs" });
    }
  });

  app.get("/api/stories", async (_req, res) => {
    try {
      const stories = await storage.getAllStories();
      res.json(stories);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch stories" });
    }
  });

  // Programs CRUD
  app.post("/api/programs", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validatedData);
      res.json(program);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create program" });
    }
  });

  app.patch("/api/programs/:id", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const program = await storage.updateProgram(req.params.id, validatedData);
      res.json(program);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update program" });
    }
  });

  app.delete("/api/programs/:id", async (req, res) => {
    try {
      await storage.deleteProgram(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete program" });
    }
  });

  // Blog CRUD
  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create blog post" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      res.json(post);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete blog post" });
    }
  });

  // Contact Delete
  app.delete("/api/contact/:id", async (req, res) => {
    try {
      await storage.deleteContactMessage(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete message" });
    }
  });

  // Site Config
  app.get("/api/site-config", async (_req, res) => {
    try {
      const config = await storage.getSiteConfig();
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch site config" });
    }
  });

  app.patch("/api/site-config", async (req, res) => {
    try {
      const validatedData = insertSiteConfigSchema.partial().parse(req.body);
      const config = await storage.updateSiteConfig(validatedData);
      res.json(config);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update site config" });
    }
  });

  // Projects CRUD
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      res.json(project);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete project" });
    }
  });

  // Staff CRUD
  app.get("/api/staff", async (_req, res) => {
    try {
      const staff = await storage.getAllStaff();
      res.json(staff);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch staff" });
    }
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const validatedData = insertStaffSchema.parse(req.body);
      const staff = await storage.createStaff(validatedData);
      res.json(staff);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to create staff member" });
    }
  });

  app.patch("/api/staff/:id", async (req, res) => {
    try {
      const validatedData = insertStaffSchema.partial().parse(req.body);
      const staff = await storage.updateStaff(req.params.id, validatedData);
      res.json(staff);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: error.message || "Failed to update staff member" });
    }
  });

  app.delete("/api/staff/:id", async (req, res) => {
    try {
      await storage.deleteStaff(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete staff member" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
