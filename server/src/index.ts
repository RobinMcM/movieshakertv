import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { setupAuth } from "./auth";
import { router } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Vue app
// Path resolution: from server/dist/index.js, go up two levels to root, then into client/dist
const clientDistPath = path.resolve(__dirname, "../../client/dist");
console.log("Serving static files from:", clientDistPath);
app.use(express.static(clientDistPath));

// CORS: In production, we're serving from same origin, so allow all or specific origin
app.use(cors({
  origin: process.env.CLIENT_URL || (process.env.NODE_ENV === "production" ? true : "http://localhost:5173"),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

setupAuth(app);

app.use("/api", router);

// The "catchall" handler: for any request that doesn't match an API route, send back Vue's index.html file.
// Use app.use() with a function instead of app.get() with wildcard for Express 5 compatibility
app.use((req, res, next) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api")) {
    return next(); // Let the API router handle it (or return 404 if not found)
  }
  // For all other routes, serve the Vue app's index.html
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

