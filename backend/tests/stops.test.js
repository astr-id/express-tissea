/// <reference types="vitest" />
import request from "supertest";
import express from "express";
import { getStops } from "../controllers/stopsController";
import Stop from "../models/stopModel";
import mongoose from "mongoose"; 
import { describe, expect, it, beforeEach, vi } from "vitest";

const app = express();
app.use(express.json());
app.get("/api/stops", getStops);

describe("GET /api/stops", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mongoose.models = {}; 
  });

  it("should return a list of stops", async () => {
    const mockStops = [
      { id: 1, name: "Stop 1", latitude: 48.8566, longitude: 2.3522 },
      { id: 2, name: "Stop 2", latitude: 34.0522, longitude: -118.2437 },
    ];

    vi.spyOn(Stop, "find").mockResolvedValue(mockStops);

    const response = await request(app).get("/api/stops");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body).toEqual(mockStops);
  });

  it("should return a 500 error on failure", async () => {
    const originalFind = Stop.find;
    Stop.find = vi.fn().mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/stops");
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "Erreur lors de la récupération des arrêts."
    );

    Stop.find = originalFind;
  });
});
