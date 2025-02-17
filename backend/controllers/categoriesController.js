const Line = require("../models/lineModel");
const Stop = require("../models/stopModel");
const LineStop = require("../models/lineStopModel");
const User = require("../models/userModel");

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

    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
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

    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Recherche les arrêts associés à la ligne
    const lineStops = await LineStop.find({ line: lineId }).populate("stop");

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
exports.addStop = async (req, res) => {
  try {
    const { id, lineId } = req.params;
    const { stopName, order, stopLatitude, stopLongitude } = req.body;

    // Recherche la ligne par son ID
    const line = await Line.findById(lineId);
    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Vérifie si l'arrêt existe déjà dans la base de données
    let stop = await Stop.findOne({ name: stopName });

    // Si l'arrêt existe vérifier s'il est déjà sur la ligne
    if (stop) {
      const stopExistsOnLine = await LineStop.findOne({
        line: lineId,
        stop: stop._id,
      });
      if (stopExistsOnLine) {
        return res
          .status(400)
          .json({ message: "Cet arrêt existe déjà sur cette ligne." });
      }
    } else {
      // Si l'arrêt n'existe pas il est crée
      stop = new Stop({
        name: stopName,
        latitude: stopLatitude,
        longitude: stopLongitude,
      });
      await stop.save(); 
    }

    // Vérifie si un arrêt avec cet ordre existe déjà
    const existingStops = await LineStop.find({ line: lineId }).sort("order");

    // Décaler les arrêts existants si nécessaire
    for (let i = 0; i < existingStops.length; i++) {
      if (existingStops[i].order >= order) {
        existingStops[i].order += 1;
        await existingStops[i].save();
      }
    }

    const lineStop = new LineStop({
      line: lineId,
      stop: stop._id, 
      order,
    });

    await lineStop.save();

    res.status(201).json({ stop, lineStop });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'arrêt.",
      error: error.message,
    });
  }
};


// 9. PUT /api/categories/:id/lines/:id
// Modification des détails de la ligne précisée par :id
exports.updateLine = async (req, res) => {
  try {
    const { id, lineId } = req.params;
    const { name, startTime, endTime, category } = req.body;

    // Recherche la ligne par son ID
    const line = await Line.findById(lineId);
    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    line.name = name;
    line.start_time = startTime;
    line.end_time = endTime;
    line.category = category;

    await line.save();

    res.status(200).json({ message: "Détails de la ligne mis à jour." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour des détails de la ligne.",
      error: error.message,
    });
  }
};

// 10. DELETE - /api/categories/:id/lines/:id/stops/:id
// Suppression d'un arrêt de la ligne précisée par :id
exports.deleteStop = async (req, res) => {
  try {
    const { id, lineId, stopId } = req.params;

    // Recherche la ligne par son ID
    const line = await Line.findById(lineId);
    if (!line || line.category.toString() !== id) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Recherche l'arrêt par son ID
    const stop = await Stop.findById(stopId);
    if (!stop) {
      return res.status(404).json({ message: "Cet arrêt n'existe pas" });
    }

    // Recherche et suppression de l'arrêt associé à la ligne
    const lineStop = await LineStop.findOneAndDelete({
      line: lineId,
      stop: stopId,
    });
    if (!lineStop) {
      return res
        .status(404)
        .json({ message: "Cet arrêt n'existe pas sur cette ligne" });
    }

    // Mise à jour de l'ordre des arrêts restants
    await LineStop.updateMany(
      { line: lineId, order: { $gt: lineStop.order } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({ message: "Arrêt supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'arrêt.",
      error: error.message,
    });
  }
};