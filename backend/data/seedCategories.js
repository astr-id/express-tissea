const Category = require("../models/Category");

const seedCategories = async () => {
  try {
    const count = await Category.countDocuments(); // Utilisation de `await` pour récupérer le nombre de documents
    if (count === 0) {
      // Si la collection est vide, on insère les catégories
      const categories = [
        { name: "Bus" },
        { name: "Métro" },
        { name: "Tramway" },
      ];

      const documents = await Category.insertMany(categories); // Utilisation de `await` ici
      console.log("Catégories insérées :", documents);
    } else {
      console.log("Les catégories existent déjà dans la base de données.");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion des catégories", error);
  }
};

module.exports = seedCategories;
