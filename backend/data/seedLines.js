const Line = require("../models/Line");
const Category = require("../models/Category"); // Assurez-vous d'importer le modèle Category

const seedLines = async () => {
  try {
    const count = await Line.countDocuments();
    if (count === 0) {
      // Récupérer les catégories
      const metroCategory = await Category.findOne({ name: "Métro" });
      const busCategory = await Category.findOne({ name: "Bus" });
      const tramwayCategory = await Category.findOne({ name: "Tramway" });

      const lines = [
        {
          name: "Ligne A",
          start_time: "05:00",
          end_time: "00:30",
          category: metroCategory._id, // Utiliser l'ID de la catégorie
        },
        {
          name: "Ligne B",
          start_time: "05:00",
          end_time: "00:30",
          category: metroCategory._id,
        },
        {
          name: "Ligne 70",
          start_time: "05:30",
          end_time: "23:30",
          category: busCategory._id,
        },
        {
          name: "Ligne L2",
          start_time: "06:00",
          end_time: "21:30",
          category: busCategory._id,
        },
        {
          name: "Ligne T1",
          start_time: "05:30",
          end_time: "00:30",
          category: tramwayCategory._id,
        },
        {
          name: "Ligne T2",
          start_time: "05:30",
          end_time: "00:30",
          category: tramwayCategory._id,
        },
        {
          name: "Ligne 1",
          start_time: "06:00",
          end_time: "21:00",
          category: busCategory._id,
        },
        {
          name: "Ligne 14",
          start_time: "06:00",
          end_time: "21:00",
          category: busCategory._id,
        },
      ];

      await Line.insertMany(lines);
      console.log("Lignes de transport insérées avec succès.");
    } else {
      console.log("Les lignes de transport existent déjà.");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion des lignes :", error);
  }
};

module.exports = seedLines;
