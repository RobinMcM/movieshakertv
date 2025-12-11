"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentsRelations = exports.timelineEventsRelations = exports.projectsRelations = exports.usersRelations = exports.documents = exports.timelineEvents = exports.projects = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    passwordHash: (0, pg_core_1.text)("password_hash").notNull(),
    role: (0, pg_core_1.text)("role", { enum: ["admin", "crew"] }).default("crew").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.projects = (0, pg_core_1.pgTable)("projects", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    pitchDeckUrl: (0, pg_core_1.text)("pitch_deck_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.timelineEvents = (0, pg_core_1.pgTable)("timeline_events", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    projectId: (0, pg_core_1.integer)("project_id").references(() => exports.projects.id).notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    startDate: (0, pg_core_1.timestamp)("start_date").notNull(),
    endDate: (0, pg_core_1.timestamp)("end_date"),
    description: (0, pg_core_1.text)("description"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.documents = (0, pg_core_1.pgTable)("documents", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    projectId: (0, pg_core_1.integer)("project_id").references(() => exports.projects.id).notNull(),
    uploaderId: (0, pg_core_1.integer)("uploader_id").references(() => exports.users.id).notNull(),
    url: (0, pg_core_1.text)("url").notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    documents: many(exports.documents),
}));
exports.projectsRelations = (0, drizzle_orm_1.relations)(exports.projects, ({ many }) => ({
    timelineEvents: many(exports.timelineEvents),
    documents: many(exports.documents),
}));
exports.timelineEventsRelations = (0, drizzle_orm_1.relations)(exports.timelineEvents, ({ one }) => ({
    project: one(exports.projects, {
        fields: [exports.timelineEvents.projectId],
        references: [exports.projects.id],
    }),
}));
exports.documentsRelations = (0, drizzle_orm_1.relations)(exports.documents, ({ one }) => ({
    project: one(exports.projects, {
        fields: [exports.documents.projectId],
        references: [exports.projects.id],
    }),
    uploader: one(exports.users, {
        fields: [exports.documents.uploaderId],
        references: [exports.users.id],
    }),
}));
