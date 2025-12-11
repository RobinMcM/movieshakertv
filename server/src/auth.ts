import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export function setupAuth(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Demo gatekeeper - simple hardcoded credentials for demo purposes
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Demo credentials - bypass database
        if (email === "ms@mail.com" && password === "movie") {
          return done(null, {
            id: 1,
            email: "ms@mail.com",
            role: "admin"
          });
        }
        
        return done(null, false, { message: "Incorrect email or password." });
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Demo gatekeeper - return hardcoded user for demo
  passport.deserializeUser(async (id: number, done) => {
    // For demo, just return the test user
    done(null, {
      id: 1,
      email: "ms@mail.com",
      role: "admin"
    });
  });
}

