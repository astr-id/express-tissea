const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedLineStops = async () => {

    const lineA = await prisma.line.findFirst({
        where: { name: "Ligne A" },
    });

    const lineT1 = await prisma.line.findFirst({
        where: { name: "Ligne T1" },
    });

    const stops = await prisma.stop.findMany();

    if (!lineA) {
        console.error("Ligne 'Ligne A' introuvable. Exécutez `seedLines.js` d'abord.");
        return;
    }

    if (!lineT1) {
        console.error("Ligne 'Ligne T1' introuvable. Exécutez `seedLines.js` d'abord.");
        return;
    }

    await prisma.lineStop.createMany({
      data: [
        // Arrêts de la ligne A
            {
              lineId: lineA.id,
                stopId: stops.find((s) => s.name === "Basso Cambo").id,
                order: 1,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Bellefontaine").id,
          order: 2,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Reynerie").id,
          order: 3,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Mirail - Université").id,
          order: 4,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Bagatelle").id,
          order: 5,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Mermoz").id,
          order: 6,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Fontaine Lestang").id,
          order: 7,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Arènes").id,
          order: 8,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Patte d'Oie").id,
          order: 9,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Saint-Cyprien - République").id,
          order: 10,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Esquirol").id,
          order: 11,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Capitole").id,
          order: 12,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Jean-Jaurès").id,
          order: 13,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Marengo - SNCF").id,
          order: 14,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Jolimont").id,
          order: 15,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Roseraie").id,
          order: 16,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Argoulets").id,
          order: 17,
        },
        {
          lineId: lineA.id,
          stopId: stops.find((s) => s.name === "Balma - Gramont").id,
          order: 18,
        },

        // Arrêts de la ligne T1
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Palais de Justice").id,
          order: 1,
        },

        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Ile du Ramier").id,
          order: 2,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Fer à Cheval").id,
          order: 3,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Avenue de Muret - M. Cavaillé")
            .id,
          order: 4,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Croix de Pierre").id,
          order: 5,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Déodat de Séverac").id,
          order: 6,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Arènes").id,
          order: 7,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Hippodrome").id,
          order: 8,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Zénith").id,
          order: 9,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Cartoucherie").id,
          order: 10,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Purpan").id,
          order: 11,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Arènes Romaines").id,
          order: 12,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Ancely").id,
          order: 13,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Servanty Airbus").id,
          order: 14,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Guyenne - Berry").id,
          order: 15,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Pasteur Mairie de Blagnac").id,
          order: 16,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Place du Relais").id,
          order: 17,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Odyssud Ritouret").id,
          order: 18,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Patinoire - Barradels").id,
          order: 19,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Grand Noble").id,
          order: 20,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Place G. Brassens").id,
          order: 21,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Andromède Lycée").id,
          order: 22,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Beauzelle Aeroscopia").id,
          order: 23,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "Aéroconstellation").id,
          order: 24,
        },
        {
          lineId: lineT1.id,
          stopId: stops.find((s) => s.name === "MEETT").id,
          order: 25,
        },
      ],
    });

  console.log("Relations Ligne-Arrêt insérées.");
};

module.exports = seedLineStops;
