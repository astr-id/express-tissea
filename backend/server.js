// Import des modules
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Couleur dans la console
const colors = require("colors");

// Connexion à MongoDB avec Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Initialisation d'Express
const app = express();

// Utilisation de CORS
app.use(cors());

// Accepter les données envoyées par formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/categories", require("./routes/categoriesRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/stops", require("./routes/stopsRoutes"));

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});