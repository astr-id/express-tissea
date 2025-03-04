const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getStops = async (req, res) => {
  try {
    if (!prisma.stop) {
      console.error('Le modèle "stop" n\'est pas disponible dans prismaClient');
      return res.status(500).json({
        message: 'Modèle "stop" introuvable',
      });
    }
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
