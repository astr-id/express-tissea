const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getStops = async (req, res) => {
  try {
    const stops = await prisma.stop.findMany();
    res.status(200).json(stops);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des arrêts.",
      error: error.message,
    });
  }
};
