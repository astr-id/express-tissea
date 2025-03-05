/// <reference types="vitest" />
import request from "supertest";
import express from "express";

const Line = mongoose.models.Line || require("../models/lineModel");
const LineStop = mongoose.models.LineStop || require("../models/lineStopModel");
const Stop = mongoose.models.Stop || require("../models/stopModel");
import mongoose from "mongoose";
import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  getLineDetails,
  getLinesByCategory,
  getLineStops,
  addStop,
  updateLine,
  deleteStop,
} from "../controllers/categoriesController";

const app = express();
app.use(express.json());
app.get("/api/categories/:id/lines", getLinesByCategory);
app.get("/api/categories/:id/lines/:lineId", getLineDetails);
app.get("/api/categories/:id/lines/:lineId/stops", getLineStops);
app.post("/api/categories/:id/lines/:lineId/stops", addStop);
app.put("/api/categories/:id/lines/:lineId", updateLine);
app.delete("/api/categories/:id/lines/:lineId/stops/:stopId", deleteStop);

describe("GET /api/categories/:id/lines", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mongoose.models = {};
  });

  it("should return a list of lines for a given category", async () => {
    const mockLines = [
      { id: 1, name: "Line 1", category: "123" },
      { id: 2, name: "Line 2", category: "123" },
    ];

    vi.spyOn(Line, "find").mockResolvedValue(mockLines);

    const response = await request(app).get("/api/categories/123/lines");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockLines);
  });

  it("should return a 500 error on failure", async () => {
    vi.spyOn(Line, "find").mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/categories/123/lines");
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "Erreur lors de la récupération des lignes."
    );
  });
});

describe("PUT /api/categories/:id/lines/:lineId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mongoose.models = {};
  });

  it("should update line details", async () => {
    const mockLine = {
      _id: "line123",
      category: "123",
      save: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(Line, "findById").mockResolvedValue(mockLine);

    const response = await request(app)
      .put("/api/categories/123/lines/line123")
      .send({
        name: "Updated Line",
        startTime: "08:00",
        endTime: "22:00",
        category: "123",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Détails de la ligne mis à jour.");
  });
});

describe("DELETE /api/categories/:id/lines/:lineId/stops/:stopId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mongoose.models = {};
  });

  it("should delete a stop from the line", async () => {
    const mockLine = { _id: "line123", category: "123" };
    const mockStop = { _id: "stop123" };
    vi.spyOn(Line, "findById").mockResolvedValue(mockLine);
    vi.spyOn(Stop, "findById").mockResolvedValue(mockStop);
    vi.spyOn(LineStop, "findOneAndDelete").mockResolvedValue({ order: 2 });
    vi.spyOn(LineStop, "updateMany").mockResolvedValue();

    const response = await request(app).delete(
      "/api/categories/123/lines/line123/stops/stop123"
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Arrêt supprimé avec succès.");
  });
});
