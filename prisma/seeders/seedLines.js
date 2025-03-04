const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedLines = async () => {

  const busCategory = await prisma.category.findFirst({
    where: { name: "Bus" },
  });
  const metroCategory = await prisma.category.findFirst({
    where: { name: "Métro" },
  });

  const tramwayCategory = await prisma.category.findFirst({
    where: { name: "Tramway" },
  });

  if (!busCategory) {
    console.error(
      "Catégorie 'Bus' introuvable. Exécutez `seedCategories.js` d'abord."
    );
    return;
  }

  if (!metroCategory) {
    console.error(
      "Catégorie 'Métro' introuvable. Exécutez `seedCategories.js` d'abord."
    );
    return;
  }

  if (!tramwayCategory) {
    console.error(
      "Catégorie 'Tramway' introuvable. Exécutez `seedCategories.js` d'abord."
    );
    return;
  }

  await prisma.line.createMany({
    data: [
      {
        name: "Ligne A",
        startTime: "05:00",
        endTime: "00:30",
        categoryId: metroCategory.id,
      },
      {
        name: "Ligne B",
        startTime: "05:00",
        endTime: "00:30",
        categoryId: metroCategory.id,
      },
      {
        name: "Ligne 70",
        startTime: "05:30",
        endTime: "23:30",
        categoryId: busCategory.id,
      },
      {
        name: "Ligne L2",
        startTime: "06:00",
        endTime: "21:30",
        categoryId: busCategory.id,
      },
      {
        name: "Ligne T1",
        startTime: "05:30",
        endTime: "00:30",
        categoryId: tramwayCategory.id,
      },
      {
        name: "Ligne T2",
        startTime: "05:30",
        endTime: "00:30",
        categoryId: tramwayCategory.id,
      },
      {
        name: "Ligne 1",
        startTime: "06:00",
        endTime: "21:00",
        categoryId: busCategory.id,
      },
      {
        name: "Ligne 14",
        startTime: "06:00",
        endTime: "21:00",
        categoryId: busCategory.id,
      },
    ],
  });

  console.log("Lignes insérées.");
};

module.exports = seedLines;
