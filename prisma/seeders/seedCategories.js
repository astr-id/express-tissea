const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedCategories = async () => {

  await prisma.category.createMany({
    data: [{ name: "Bus" }, { name: "Métro" }, { name: "Tramway" }],
  });

  console.log("Catégories insérées.");
};

module.exports = seedCategories;
