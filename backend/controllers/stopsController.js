const Stop = require("../models/stopModel");

// Get - /api/stops
exports.getStops = async (req, res) => {
  try {
    const stops = await Stop.find();
    res.status(200).json(stops);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des arrêts.", error });
  }
};
