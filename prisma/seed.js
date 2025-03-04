require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const seedCategories = require("./seeders/seedCategories");
const seedLines = require("./seeders/seedLines");
const seedStops = require("./seeders/seedStops");
const seedLineStops = require("./seeders/seedLineStops");

const prisma = new PrismaClient();

const seedDatabase = async () => {
  try {
    console.log("\nDébut du seeding...\n");
    
    await prisma.line.deleteMany();
    console.log("Lignes supprimées.");
    
    await prisma.category.deleteMany();
    console.log("Catégories supprimées.");
    
    await prisma.lineStop.deleteMany();
    console.log("Relations Ligne-Arrêt supprimées.");

    await prisma.stop.deleteMany();
    console.log("Arrêts supprimés.");

    await seedCategories();
    await seedLines();
    await seedStops();
    await seedLineStops();

    console.log("\nBase de données peuplée avec succès !");
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

seedDatabase();
