const Line = require("../models/lineModel");
const Category = require("../models/categoryModel");

const seedLines = async () => {
  try {
    await Line.deleteMany({});

    // Récupérer les catégories de transport
    const metroCategory = await Category.findOne({ name: "Métro" });
    const busCategory = await Category.findOne({ name: "Bus" });
    const tramwayCategory = await Category.findOne({ name: "Tramway" });

    // Vérifie si les catégories existent
    if (!metroCategory || !busCategory || !tramwayCategory) {
      console.error("Une ou plusieurs catégories n'ont pas été trouvées.");
      return; // Arrête le processus si une catégorie est manquante
    }

    const lines = [
      {
        name: "Ligne A",
        start_time: "05:00",
        end_time: "00:30",
        category: metroCategory._id,
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

    const documents = await Line.insertMany(lines);
    console.log("Lignes de transport insérées avec succès.", documents);

    // Vérifie directement dans la base de données
    const insertedLines = await Line.find({});
    console.log("Lignes dans la base de données : ", insertedLines);
  } catch (error) {
    console.error("Erreur lors de l'insertion des lignes :", error);
  }
};

module.exports = seedLines;
