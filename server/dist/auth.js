"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAuth = setupAuth;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./db");
const schema_1 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
function setupAuth(app) {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const [user] = await db_1.db
                .select()
                .from(schema_1.users)
                .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
                .limit(1);
            if (!user) {
                return done(null, false, { message: "Incorrect email." });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(async (id, done) => {
        try {
            const [user] = await db_1.db
                .select()
                .from(schema_1.users)
                .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
                .limit(1);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
}
