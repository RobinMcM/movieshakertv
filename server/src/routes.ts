import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users, projects, timelineEvents, documents } from "./db/schema";
import { eq } from "drizzle-orm";

export const router = Router();

// Auth Routes
// Demo gatekeeper - registration disabled for demo
router.post("/register", async (req, res) => {
  res.status(403).json({ error: "Registration disabled for demo. Use ms@mail.com / movie to login." });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Basic Project Routes (Stub)
router.get("/projects", async (req, res) => {
    // In production, filter by user access
    const allProjects = await db.select().from(projects);
    res.json(allProjects);
});

router.get("/projects/:id/timeline", async (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    
    // Validate that the ID is a valid integer
    if (isNaN(projectId) || projectId <= 0) {
        return res.status(400).json({ error: "Invalid project ID. Must be a positive integer." });
    }
    
    try {
        const events = await db.select().from(timelineEvents).where(eq(timelineEvents.projectId, projectId));
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

