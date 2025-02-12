// backend/data/populateDb.js

require("dotenv").config();

const connectDB = require("../config/db"); 
const seedCategories = require("./seedCategories");
const seedLines = require("./seedLines");
const seedStops = require("./seedStops");
const seedLineStops = require("./seedLineStops");


const populateDb = async () => {
  try {
    await connectDB(); 
    await seedCategories(); 
    await seedLines(); 
    await seedStops(); 
    await seedLineStops(); 
    console.log("Base de données implémenté avec succès.");
    process.exit(); 
  } catch (error) {
    console.error("Erreur lors du peuplement de la base de données", error);
    process.exit(1); 
  }
};

populateDb();
