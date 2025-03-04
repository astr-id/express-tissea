const { PrismaClient } = require("@prisma/client");
const haversine = require("haversine-distance");

const prisma = new PrismaClient();
// 4. GET - api/stats/distance/stops/:id/:id
// Calcule et retourne la distance en kilomètre entre les deux arrêts donnés précisée par :id/:id
exports.getDistanceBetweenStops = async (req, res, prismaClient = prisma) => {
 
  try {
    const { startStopId, endStopId } = req.params;

    // Recherche des arrêts par ID
    const startStop = await prismaClient.stop.findUnique({
      where: { id: startStopId },
    });

    const endStop = await prismaClient.stop.findUnique({
      where: { id: endStopId },
    });

    // Vérification si les arrêts existent
    if (!startStop || !endStop) {
      return res
        .status(404)
        .json({ message: "Un ou les deux arrêts n'existent pas." });
    }

    // Calcul de la distance en utilisant la formule Haversine
    const distance = haversine(
      { lat: startStop.latitude, lon: startStop.longitude },
      { lat: endStop.latitude, lon: endStop.longitude }
    );

    // Retourne la distance en kilomètres, avec 2 décimales
    res.status(200).json({ distance: (distance / 1000).toFixed(2) });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      message: "Erreur lors du calcul de la distance.",
      error: error.message,
    });
  }
};

// GET - api/stats/distance/lines/:id
// Calcule et retourne la distance en kilomètre de la ligne entière précisée par :id
exports.getDistanceOfLine = async (req, res, prismaClient = prisma) => {
  try {
    const { id: lineId } = req.params;

    // Vérifier si la ligne existe
    const line = await prismaClient.line.findUnique({
      where: { id: lineId },
    });

    if (!line) {
      return res.status(404).json({ message: "Cette ligne n'existe pas." });
    }

    // Récupérer tous les arrêts associés à la ligne triés par ordre
    const lineStops = await prismaClient.lineStop.findMany({
      where: { lineId },
      include: { stop: true },
      orderBy: { order: "asc" }, // Trie les arrêts dans l'ordre d'apparition
    });

    let totalDistance = 0;

    // Parcours de la liste des arrêts pour calculer la distance totale
    for (let i = 0; i < lineStops.length - 1; i++) {
      const startStop = lineStops[i].stop;
      const endStop = lineStops[i + 1].stop;

      // Calcul de la distance entre deux arrêts successifs
      totalDistance += haversine(
        { lat: startStop.latitude, lon: startStop.longitude },
        { lat: endStop.latitude, lon: endStop.longitude }
      );
    }

    // Convertir la distance en kilomètres
    const totalDistanceInKm = (totalDistance / 1000).toFixed(2);

    // Retourne la distance totale de la ligne
    res.status(200).json({ distance: totalDistanceInKm });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      message: "Erreur lors du calcul de la distance de la ligne.",
      error: error.message,
    });
  }
};
