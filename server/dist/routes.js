"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
const schema_1 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.router = (0, express_1.Router)();
// Auth Routes
exports.router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [newUser] = await db_1.db
            .insert(schema_1.users)
            .values({
            email,
            passwordHash: hashedPassword,
        })
            .returning();
        req.login(newUser, (err) => {
            if (err)
                return res.status(500).json({ error: err.message });
            return res.json({ user: newUser });
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.router.post("/login", passport_1.default.authenticate("local"), (req, res) => {
    res.json({ user: req.user });
});
exports.router.post("/logout", (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out" });
    });
});
exports.router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    }
    else {
        res.status(401).json({ message: "Not authenticated" });
    }
});
// Basic Project Routes (Stub)
exports.router.get("/projects", async (req, res) => {
    // In production, filter by user access
    const allProjects = await db_1.db.select().from(schema_1.projects);
    res.json(allProjects);
});
exports.router.get("/projects/:id/timeline", async (req, res) => {
    const events = await db_1.db.select().from(schema_1.timelineEvents).where((0, drizzle_orm_1.eq)(schema_1.timelineEvents.projectId, parseInt(req.params.id)));
    res.json(events);
});
