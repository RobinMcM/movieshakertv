import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import { setupAuth } from "./auth";
import { router } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
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

// Root route to guide user
app.get("/", (req, res) => {
  res.send("MovieShaker.TV API Server is running. Please access the frontend at <a href='http://localhost:5173'>http://localhost:5173</a>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

