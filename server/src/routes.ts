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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal server error during authentication" });
    }
    if (!user) {
      return res.status(401).json({ error: info?.message || "Incorrect email or password." });
    }
    // Use req.login (lowercase) which is the Express method, not req.logIn
    req.login(user, (loginErr: any) => {
      if (loginErr) {
        console.error("Login session error:", loginErr);
        return res.status(500).json({ error: "Failed to establish session" });
      }
      return res.json({ user: req.user });
    });
  })(req, res, next);
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

