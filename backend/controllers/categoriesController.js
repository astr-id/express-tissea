const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// 1. GET - /api/categories/:id/lines
// Retourne la liste de toutes les lignes de la catégorie de transport précisée par :id
exports.getLinesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Vérifier si la catégorie existe
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    // Récupérer toutes les lignes liées à cette catégorie
    const lines = await prisma.line.findMany({
      where: { categoryId },
    });

    res.status(200).json(lines);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des lignes.",
      error: error.message,
    });
  }
};

// GET - /api/categories/:id/lines/:id
// Retourne les détails de la ligne précisée
exports.getLineDetails = async (req, res) => {
  try {
    const { id: categoryId, lineId } = req.params;

    // Recherche la ligne par son ID
    const line = await prisma.line.findUnique({
      where: { id: lineId },
      include: {
        category: true,
        stops: {
          include: {
            stop: true,
          },
        },
      },
    });

    if (!line || line.categoryId !== categoryId) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Extraction des noms des arrêts
    const stopNames = line.stops.map((stop) => stop.stop.name);

    res.status(200).json({
      createdAt: line.createdAt,
      startTime: line.startTime,
      endTime: line.endTime,
      stops: stopNames,
    });
  } catch (error) {
    console.error("Erreur Prisma :", error);
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
    const { id: categoryId, lineId } = req.params;

    const line = await prisma.line.findUnique({
      where: { id: lineId },
      include: { category: true },
    });

    if (!line || line.categoryId !== categoryId) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Récupérer les arrêts associés à la ligne, triés par ordre d'apparition
    const lineStops = await prisma.lineStop.findMany({
      where: { lineId },
      include: { stop: true },
      orderBy: { order: "asc" },
    });

    // Transformer les résultats
    const stopDetails = lineStops.map((stop) => ({
      name: stop.stop.name,
      latitude: stop.stop.latitude,
      longitude: stop.stop.longitude,
      order: stop.order,
    }));

    res.status(200).json(stopDetails);
  } catch (error) {
    console.error("Erreur Prisma :", error);
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
    const { id: categoryId, lineId } = req.params;
    const { stopName, order, stopLatitude, stopLongitude } = req.body;

    // Vérifie si la ligne existe et appartient bien à la catégorie
    const line = await prisma.line.findUnique({
      where: { id: lineId },
    });

    if (!line || line.categoryId !== categoryId) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Vérifie si l'arrêt existe déjà
    let stop = await prisma.stop.findFirst({
      where: {
        name: stopName, 
      },
    });


    // Si l'arrêt existe, vérifier s'il est déjà sur la ligne
    if (stop) {
      const stopExistsOnLine = await prisma.lineStop.findFirst({
        where: {
          lineId,
          stopId: stop.id,
        },
      });

      if (stopExistsOnLine) {
        return res.status(400).json({
          message: "Cet arrêt existe déjà sur cette ligne.",
        });
      }
    } else {
      // Créer l'arrêt s'il n'existe pas
      stop = await prisma.stop.create({
        data: {
          name: stopName,
          latitude: stopLatitude,
          longitude: stopLongitude,
        },
      });
    }

    // Ajouter l'arrêt à la ligne
    const newLineStop = await prisma.lineStop.create({
      data: {
        lineId,
        stopId: stop.id,
        order,
      },
    });

    res.status(201).json({
      message: "Arrêt ajouté avec succès à la ligne.",
      lineStop: newLineStop,
    });
  } catch (error) {
    console.error("Erreur Prisma :", error);
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
    const { id: categoryId, lineId } = req.params;
    const { name, startTime, endTime, category } = req.body;

    // Vérifie si la ligne existe et appartient bien à la catégorie
    const line = await prisma.line.findUnique({
      where: { id: lineId },
    });

    if (!line || line.categoryId !== categoryId) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Met à jour la ligne
    await prisma.line.update({
      where: { id: lineId },
      data: {
        name,
        startTime,
        endTime,
        categoryId: category, // Mise à jour de la catégorie si nécessaire
      },
    });

    res.status(200).json({ message: "Détails de la ligne mis à jour." });
  } catch (error) {
    console.error("Erreur Prisma :", error);
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
    const { id: categoryId, lineId, stopId } = req.params;

    // Vérifier si la ligne existe et appartient à la bonne catégorie
    const line = await prisma.line.findUnique({
      where: { id: lineId },
    });

    if (!line || line.categoryId !== categoryId) {
      return res.status(404).json({ message: "Cette ligne n'existe pas" });
    }

    // Vérifier si l'arrêt existe
    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
    });

    if (!stop) {
      return res.status(404).json({ message: "Cet arrêt n'existe pas" });
    }

    // Vérifier si l'arrêt est bien associé à cette ligne
    const lineStop = await prisma.lineStop.findFirst({
      where: {
        lineId,
        stopId,
      },
    });

    if (!lineStop) {
      return res
        .status(404)
        .json({ message: "Cet arrêt n'existe pas sur cette ligne" });
    }

    // Supprimer l'arrêt de la ligne
    await prisma.lineStop.delete({
      where: { id: lineStop.id },
    });

    // Mettre à jour l'ordre des arrêts restants
    await prisma.lineStop.updateMany({
      where: {
        lineId,
        order: { gt: lineStop.order },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    res.status(200).json({ message: "Arrêt supprimé avec succès." });
  } catch (error) {
    console.error("Erreur Prisma :", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'arrêt.",
      error: error.message,
    });
  }
};
