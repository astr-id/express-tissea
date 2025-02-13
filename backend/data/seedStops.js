const Stop = require("../models/stopModel");

const seedStops = async () => {
  try {
    await Stop.deleteMany();
    const stops = [
      // Arrêts de tram T1
      { name: "Palais de Justice", latitude: 43.6045, longitude: 1.444 },
      { name: "Ile du Ramier", latitude: 43.61, longitude: 1.45 },
      { name: "Fer à Cheval", latitude: 43.6105, longitude: 1.455 },
      {
        name: "Avenue de Muret - M. Cavaillé",
        latitude: 43.605,
        longitude: 1.46,
      },
      { name: "Croix de Pierre", latitude: 43.608, longitude: 1.442 },
      { name: "Déodat de Séverac", latitude: 43.61, longitude: 1.44 },
      { name: "Arènes", latitude: 43.605, longitude: 1.442 },
      { name: "Hippodrome", latitude: 43.61, longitude: 1.43 },
      { name: "Zénith", latitude: 43.6105, longitude: 1.4405 },
      { name: "Cartoucherie", latitude: 43.612, longitude: 1.445 },
      { name: "Purpan", latitude: 43.61, longitude: 1.45 },
      { name: "Arènes Romaines", latitude: 43.6105, longitude: 1.4455 },
      { name: "Ancely", latitude: 43.6125, longitude: 1.447 },
      { name: "Servanty Airbus", latitude: 43.615, longitude: 1.45 },
      { name: "Guyenne - Berry", latitude: 43.6155, longitude: 1.455 },
      {
        name: "Pasteur Mairie de Blagnac",
        latitude: 43.62,
        longitude: 1.46,
      },
      { name: "Place du Relais", latitude: 43.6205, longitude: 1.465 },
      { name: "Odyssud Ritouret", latitude: 43.62, longitude: 1.47 },
      {
        name: "Patinoire - Barradels",
        latitude: 43.6205,
        longitude: 1.475,
      },
      { name: "Grand Noble", latitude: 43.621, longitude: 1.48 },
      { name: "Place G. Brassens", latitude: 43.6215, longitude: 1.485 },
      { name: "Andromède Lycée", latitude: 43.622, longitude: 1.49 },
      { name: "Beauzelle Aeroscopia", latitude: 43.6225, longitude: 1.495 },
      { name: "Aéroconstellation", latitude: 43.623, longitude: 1.5 },
      { name: "MEETT", latitude: 43.6235, longitude: 1.505 },

      // Stations de Ligne A
      { name: "Basso Cambo", latitude: 43.573, longitude: 1.438 },
      { name: "Bellefontaine", latitude: 43.588, longitude: 1.442 },
      { name: "Reynerie", latitude: 43.601, longitude: 1.445 },
      {
        name: "Mirail - Université",
        latitude: 43.605,
        longitude: 1.45,
      },
      { name: "Bagatelle", latitude: 43.61, longitude: 1.455 },
      { name: "Mermoz", latitude: 43.6105, longitude: 1.46 },
      {
        name: "Fontaine Lestang",
        latitude: 43.612,
        longitude: 1.465,
      },
      { name: "Arènes", latitude: 43.605, longitude: 1.442 },
      { name: "Patte d'Oie", latitude: 43.61, longitude: 1.47 },
      {
        name: "Saint-Cyprien - République",
        latitude: 43.6105,
        longitude: 1.475,
      },
      { name: "Esquirol", latitude: 43.61, longitude: 1.44 },
      { name: "Capitole", latitude: 43.6105, longitude: 1.4425 },
      { name: "Jean-Jaurès", latitude: 43.61, longitude: 1.445 },
      { name: "Marengo - SNCF", latitude: 43.6105, longitude: 1.448 },
      { name: "Jolimont", latitude: 43.61, longitude: 1.45 },
      { name: "Roseraie", latitude: 43.6105, longitude: 1.455 },
      { name: "Argoulets", latitude: 43.61, longitude: 1.46 },
      { name: "Balma - Gramont", latitude: 43.6105, longitude: 1.465 },
    ];

    // Insérer les arrêts dans la base de données
   const documents = await Stop.insertMany(stops);
    console.log("Arrêts insérés avec succès.", documents);
  } catch (error) {
    console.error("Erreur lors de l'insertion des arrêts :", error);
  }
};

module.exports = seedStops;
