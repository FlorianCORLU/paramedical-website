import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();

// CORS pour permettre l'accès au frontend (ex: localhost:5173 pour Vite)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// EJS pour les vues
app.set("view engine", "ejs");
app.set("views", "./views");

// Log simple des requêtes
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Fichiers statiques (images, css compilé...)
app.use(express.static("./public"));

// Middleware pour parser les requêtes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session utilisateur
app.use(
  session({
    secret: process.env.PG_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

// Routes de l'app
app.use(router);

// 404 Not found
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "Ressource not found", code: "NOT_FOUND_ERROR" });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré : http://localhost:${PORT}`);
});
