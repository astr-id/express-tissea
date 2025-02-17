const LineStop = require("../models/lineStopModel");
const Line = require("../models/lineModel");
const Stop = require("../models/stopModel");
const { model } = require("mongoose");

const seedLineStops = async () => {
  try {
    await LineStop.deleteMany();
    // Récupérer les lignes et les arrêts
    const lineA = await Line.findOne({ name: "Ligne A" });
    const lineT1 = await Line.findOne({ name: "Ligne T1" });
    const stops = await Stop.find();

    const lineStops = [
      // Arrêts de la ligne A
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Basso Cambo")._id,
        order: 1,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Bellefontaine")._id,
        order: 2,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Reynerie")._id,
        order: 3,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Mirail - Université")._id,
        order: 4,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Bagatelle")._id,
        order: 5,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Mermoz")._id,
        order: 6,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Fontaine Lestang")._id,
        order: 7,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Arènes")._id,
        order: 8,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Patte d'Oie")._id,
        order: 9,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Saint-Cyprien - République")._id,
        order: 10,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Esquirol")._id,
        order: 11,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Capitole")._id,
        order: 12,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Jean-Jaurès")._id,
        order: 13,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Marengo - SNCF")._id,
        order: 14,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Jolimont")._id,
        order: 15,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Roseraie")._id,
        order: 16,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Argoulets")._id,
        order: 17,
      },
      {
        line: lineA._id,
        stop: stops.find((s) => s.name === "Balma - Gramont")._id,
        order: 18,
      },

      // Arrêts de la ligne T1
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Palais de Justice")._id,
        order: 1,
      },

      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Ile du Ramier")._id,
        order: 2,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Fer à Cheval")._id,
        order: 3,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Avenue de Muret - M. Cavaillé")._id,
        order: 4,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Croix de Pierre")._id,
        order: 5,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Déodat de Séverac")._id,
        order: 6,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Arènes")._id,
        order: 7,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Hippodrome")._id,
        order: 8,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Zénith")._id,
        order: 9,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Cartoucherie")._id,
        order: 10,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Purpan")._id,
        order: 11,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Arènes Romaines")._id,
        order: 12,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Ancely")._id,
        order: 13,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Servanty Airbus")._id,
        order: 14,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Guyenne - Berry")._id,
        order: 15,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Pasteur Mairie de Blagnac")._id,
        order: 16,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Place du Relais")._id,
        order: 17,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Odyssud Ritouret")._id,
        order: 18,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Patinoire - Barradels")._id,
        order: 19,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Grand Noble")._id,
        order: 20,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Place G. Brassens")._id,
        order: 21,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Andromède Lycée")._id,
        order: 22,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Beauzelle Aeroscopia")._id,
        order: 23,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "Aéroconstellation")._id,
        order: 24,
      },
      {
        line: lineT1._id,
        stop: stops.find((s) => s.name === "MEETT")._id,
        order: 25,
      },
    ];

    const documents = await LineStop.insertMany(lineStops);
    console.log("Arrêts de lignes insérés :", documents);
  } catch (error) {
    console.error("Erreur lors de l'insertion des arrêts de lignes", error);
  }
};

module.exports = seedLineStops;
