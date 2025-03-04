import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import { getDistanceBetweenStops } from "../controllers/statsController";

// Mock de Prisma
const mockFindUnique = vi.fn();

const mockPrisma = {
  stop: { findUnique: mockFindUnique },
};

const app = express();
app.use(express.json());
app.get("/api/stats/distance/stops/:startStopId/:endStopId", (req, res) =>
  getDistanceBetweenStops(req, res, mockPrisma)
);

describe("GET /api/stats/distance/stops/:startStopId/:endStopId", () => {
  it("should return the distance between two stops", async () => {
    // Mock des arrêts 
    mockFindUnique
      .mockResolvedValueOnce({
        id: "stop1",
        latitude: 43.5922, 
        longitude: 1.4447, 
      })
      .mockResolvedValueOnce({
        id: "stop2",
        latitude: 43.5922, 
        longitude: 1.4411, 
      });

    const response = await request(app).get(
      "/api/stats/distance/stops/stop1/stop2"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ distance: expect.any(String) });
  });

  it("should return 404 if one of the stops does not exist", async () => {
    mockFindUnique.mockResolvedValueOnce(null); 

    const response = await request(app).get(
      "/api/stats/distance/stops/stop1/stop2"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Un ou les deux arrêts n'existent pas.",
    });
  });
});
