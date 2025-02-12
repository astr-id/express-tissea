const LineStop = require("../models/LineStop");
const Line = require("../models/Line");
const Stop = require("../models/Stop");
const { model } = require("mongoose");

const seedLineStops = async () => {
  try {
    const count = await LineStop.countDocuments();
    if (count === 0) {
      // Récupérer les lignes et les arrêts
      const lineA = await Line.findOne({ name: "Ligne A" });
      const lineT1 = await Line.findOne({ name: "Ligne T1" });

      const stops = await Stop.find();

      const lineStops = [
        // Arrêts de la ligne A
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Basso Cambo")._id,
          order: 1,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Bellefontaine")._id,
          order: 2,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Reynerie")._id,
          order: 3,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Mirail - Université")._id,
          order: 4,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Bagatelle")._id,
          order: 5,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Mermoz")._id,
          order: 6,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Fontaine Lestang")._id,
          order: 7,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Arènes")._id,
          order: 8,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Patte d'Oie")._id,
          order: 9,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Saint-Cyprien - République")
            ._id,
          order: 10,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Esquirol")._id,
          order: 11,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Capitole")._id,
          order: 12,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Jean-Jaurès")._id,
          order: 13,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Marengo - SNCF")._id,
          order: 14,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Jolimont")._id,
          order: 15,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Roseraie")._id,
          order: 16,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Argoulets")._id,
          order: 17,
        },
        {
          line: lineA._id,
          stop: stops.find((s) => s.name === "Métro Balma - Gramont")._id,
          order: 18,
        },

        // Arrêts de la ligne T1
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
    } else {
      console.log("Les catégories existent déjà dans la base de données.");
    }
  } catch (error) {
    console.error("Erreur lors de l'insertion des arrêts de lignes", error);
  }
};

module.exports = seedLineStops;
