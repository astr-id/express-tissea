const Category = require("../models/categoryModel");

const seedCategories = async () => {
  try {
    // Supprime toutes les catégories existantes
    await Category.deleteMany({});
    console.log("Toutes les catégories ont été supprimées.");

    // Insère les nouvelles catégories
    const categories = [
      { name: "Bus" },
      { name: "Métro" },
      { name: "Tramway" },
    ];

    const documents = await Category.insertMany(categories);
    console.log("Nouvelles catégories insérées :", documents);
  } catch (error) {
    console.error("Erreur lors de l'insertion des catégories :", error);
  }
};

module.exports = seedCategories;
