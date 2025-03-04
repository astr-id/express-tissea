const { PrismaClient } = require("@prisma/client");
const haversine = require("haversine-distance");
const prisma = new PrismaClient();

// 4. GET - api/stats/distance/stops/:id/:id
// Calcule et retourne la distance en kilomètre entre les deux arrêts donnés précisée par :id/:id
exports.getDistanceBetweenStops = async (req, res) => {
  console.log(req.params);
  try {
    const { startStopId, endStopId } = req.params;

    // Recherche des arrêts par ID (en utilisant directement les String)
    const startStop = await prisma.stop.findUnique({
      where: { id: startStopId },
    });
    const endStop = await prisma.stop.findUnique({
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
exports.getDistanceOfLine = async (req, res) => {
  try {
    const { id } = req.params;

    // Recherche de la ligne avec les arrêts associés
    const lineWithStops = await prisma.line.findUnique({
      where: { id },
      include: {
        stops: {
          include: {
            stop: true,
          },
        },
      },
    });

    console.log(lineWithStops);

    // Vérification si la ligne existe et si elle a des arrêts
    if (!lineWithStops || lineWithStops.stops.length < 2) {
      return res
        .status(404)
        .json({ message: "La ligne n'existe pas ou n'a pas assez d'arrêts." });
    }

    // Calcul de la distance totale de la ligne
    let distance = 0;
    for (let i = 0; i < lineWithStops.stops.length - 1; i++) {
      const stop1 = lineWithStops.stops[i].stop;
      const stop2 = lineWithStops.stops[i + 1].stop;

      // Vérification si les arrêts ont des coordonnées valides
      if (
        !stop1.latitude ||
        !stop1.longitude ||
        !stop2.latitude ||
        !stop2.longitude
      ) {
        return res.status(400).json({
          message:
            "Certaines coordonnées d'arrêt sont manquantes ou invalides.",
        });
      }

      // Calcul de la distance entre deux arrêts
      const segmentDistance = haversine(
        { lat: stop1.latitude, lon: stop1.longitude },
        { lat: stop2.latitude, lon: stop2.longitude }
      );

      // Vérification que la distance est valide
      if (isNaN(segmentDistance)) {
        return res.status(400).json({
          message: "Erreur lors du calcul de la distance entre les arrêts.",
        });
      }

      distance += segmentDistance;
    }

    // Retourne la distance en kilomètres avec 2 décimales
    res.status(200).json({ distance: (distance / 1000).toFixed(2) });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      message: "Erreur lors du calcul de la distance.",
      error: error.message,
    });
  }
};
