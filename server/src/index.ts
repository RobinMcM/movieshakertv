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
// In production, the dist folder will be at ../client/dist relative to server/dist
const clientDistPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.use(cors({
  origin: process.env.CLIENT_URL || true, // Allow same origin when serving static files
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
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

