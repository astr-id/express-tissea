const Line = require("../models/Line");
const Stop = require("../models/Stop");
const LineStop = require("../models/LineStop");
const User = require("../models/User");

// 1. GET - /api/categories/:id/lines
// Retourne la liste de toutes les lignes de la catégorie de transport précisée par :id
exports.getLinesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const lines = await Line.find({ category: categoryId }); 
    res.status(200).json(lines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des lignes.", error });
  }
};

// GET - /api/categories/:id/lines/:id
// Retourne les détails de la ligne précisée
exports.getLineDetails = async (req, res) => {
  try {
    const { id, lineId } = req.params;

    // Recherche la ligne par son ID
    const line = await Line.findById(lineId);

    // Si la ligne n'est pas trouvée ou que la catégorie ne correspond pas
    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Ligne non trouvée." });
    }

    // Recherche les arrêts associés à la ligne
    const stops = await LineStop.find({ line: lineId }).populate("stop"); 

    // Récupération des noms des arrêts
    const stopNames = stops.map((stop) => stop.stop.name);

    res.status(200).json({
      createdAt: line.createdAt,
      startTime: line.start_time,
      endTime: line.end_time,
      stops: stopNames,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des détails de la ligne.",
      error: error.message,
    });
  }
};


// GET - /api/categories/:id/lines/:id/stops
// Retourne la liste détaillée des arrêts d'une ligne précisée
exports.getLineStops = async (req, res) => {
  try {
    const { id, lineId } = req.params;

    // Recherche la ligne par son ID
    const line = await Line.findById(lineId);

    // Si la ligne n'est pas trouvée ou que la catégorie ne correspond pas
    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Ligne non trouvée." });
    }

    // Recherche les arrêts associés à la ligne
    const lineStops = await LineStop.find({ line: lineId })
      .populate("stop");

    const stopDetails = lineStops.map((stop) => ({
      name: stop.stop.name, 
      latitude: stop.stop.latitude, 
      longitude: stop.stop.longitude,
      order: stop.order,
    }));

    res.status(200).json(stopDetails);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des arrêts.",
      error: error.message, 
    });
  }
};


// 8. POST /api/categories/:id/lines/:id/stops
// Ajout d'un arrêt pour la ligne précisée par :id


// 9. PUT /api/categories/:id/lines/:id
// Modification des détails de la ligne précisée par :id

// 10. DELETE - /api/categories/:id/lines/:id/stops/:id
