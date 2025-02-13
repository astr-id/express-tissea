const Line = require("../models/lineModel");
const Stop = require("../models/stopModel");
const LineStop = require("../models/lineStopModel");
const User = require("../models/userModel");
const haversine = require("haversine-distance");

// 4. GET - api/stats/distance/stops/:id/:id
// Calcule et retourne la distance en kilomètre entre les deux arrêts donnés précisée par :id/:id
exports.getDistanceBetweenStops = async (req, res) => {
  try {
    const { startStopId, endStopId } = req.params;

    // Recherche des arrêts par ID
    const startStop = await Stop.findById(startStopId);
    const endStop = await Stop.findById(endStopId);

    // Vérification si les arrêts existent
    if (!startStop || !endStop) {
      return res.status(404).json({ message: "Arrêts non trouvés." });
    }

    // Calcul de la distance entre les deux arrêts en utilisant la fonction Haversine
    const distance = haversine(
      { lat: startStop.latitude, lon: startStop.longitude }, // Format attendu : lat et lon
      { lat: endStop.latitude, lon: endStop.longitude } // Format attendu : lat et lon
    );

    // Retourne la distance en kilomètres (en divisant par 1000 si elle est en mètres)
    res.status(200).json({ distance: (distance / 1000).toFixed(2) }); // Affichage avec 2 décimales
  } catch (error) {
    res
      .status(500)
      .json({
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

    // Récupère tous les arrêts associés à la ligne triés par ordre
    const lineStops = await LineStop.find({ line: id })
      .populate("stop")
      .sort("order");

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
    res.status(500).json({
      message: "Erreur lors du calcul de la distance de la ligne.",
      error: error.message,
    });
  }
};
