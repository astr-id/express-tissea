const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedStops = async () => {

  await prisma.stop.createMany({
    data: [
      // Arrêts de tram T1
      { name: "Palais de Justice", latitude: 43.5922, longitude: 1.4447 },
      { name: "Ile du Ramier", latitude: 43.5922, longitude: 1.4411 },
      { name: "Fer à Cheval", latitude: 43.5928, longitude: 1.4353 },
      {
        name: "Avenue de Muret - M. Cavaillé",
        latitude: 43.5892,
        longitude: 1.4317,
      },
      { name: "Croix de Pierre", latitude: 43.5856, longitude: 1.4278 },
      { name: "Déodat de Séverac", latitude: 43.5897, longitude: 1.4217 },
      { name: "Arènes", latitude: 43.5928, longitude: 1.4181 },
      { name: "Hippodrome", latitude: 43.5947, longitude: 1.4094 },
      { name: "Zénith", latitude: 43.6008, longitude: 1.4114 },
      { name: "Cartoucherie", latitude: 43.6031, longitude: 1.4078 },
      { name: "Purpan", latitude: 43.6092, longitude: 1.402 },
      { name: "Arènes Romaines", latitude: 43.6142, longitude: 1.3983 },
      { name: "Ancely", latitude: 43.6183, longitude: 1.3969 },
      { name: "Servanty Airbus", latitude: 43.6256, longitude: 1.3936 },
      { name: "Guyenne - Berry", latitude: 43.6308, longitude: 1.3917 },
      {
        name: "Pasteur Mairie de Blagnac",
        latitude: 43.6344,
        longitude: 1.3914,
      },
      { name: "Place du Relais", latitude: 43.6367, longitude: 1.39 },
      { name: "Odyssud Ritouret", latitude: 43.6361, longitude: 1.3853 },
      {
        name: "Patinoire - Barradels",
        latitude: 43.6406,
        longitude: 1.3825,
      },
      { name: "Grand Noble", latitude: 43.6447, longitude: 1.3775 },
      { name: "Place G. Brassens", latitude: 43.6486, longitude: 1.3756 },
      { name: "Andromède Lycée", latitude: 43.6547, longitude: 1.3736 },
      { name: "Beauzelle Aeroscopia", latitude: 43.6603, longitude: 1.3694 },
      { name: "Aéroconstellation", latitude: 43.6633, longitude: 1.3625 },
      { name: "MEETT", latitude: 43.6678, longitude: 1.36 },

      // Stations de Ligne A
      { name: "Basso Cambo", latitude: 43.57, longitude: 1.3922 },
      { name: "Bellefontaine", latitude: 43.5661, longitude: 1.3983 },
      { name: "Reynerie", latitude: 43.5708, longitude: 1.402 },
      { name: "Mirail - Université", latitude: 43.5747, longitude: 1.402 },
      { name: "Bagatelle", latitude: 43.58, longitude: 1.4122 },
      { name: "Mermoz", latitude: 43.5833, longitude: 1.4153 },
      { name: "Fontaine Lestang", latitude: 43.5875, longitude: 1.4183 },
      { name: "Arènes", latitude: 43.5931, longitude: 1.4183 },
      { name: "Patte d'Oie", latitude: 43.5964, longitude: 1.4231 },
      {
        name: "Saint-Cyprien - République",
        latitude: 43.5981,
        longitude: 1.4317,
      },
      { name: "Esquirol", latitude: 43.6003, longitude: 1.4444 },
      { name: "Capitole", latitude: 43.6047, longitude: 1.4456 },
      { name: "Jean-Jaurès", latitude: 43.6058, longitude: 1.4489 },
      { name: "Marengo - SNCF", latitude: 43.6108, longitude: 1.455 },
      { name: "Jolimont", latitude: 43.6153, longitude: 1.4636 },
      { name: "Roseraie", latitude: 43.62, longitude: 1.4694 },
      { name: "Argoulets", latitude: 43.6244, longitude: 1.4769 },
      { name: "Balma - Gramont", latitude: 43.6297, longitude: 1.4831 },
    ],
  });

  console.log("Arrêts insérés.");
};

module.exports = seedStops;
