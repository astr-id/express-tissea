import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import { getStops } from "../controllers/stopsController";

// Mock Prisma
const mockFindMany = vi.fn().mockResolvedValue([
  {
    id: "67c56be2786aa4f63589fb41",
    name: "Palais de Justice",
    latitude: 43.5922,
    longitude: 1.4447,
    createdAt: "2025-03-03T08:44:18.177Z",
    updatedAt: "2025-03-03T08:44:18.177Z",
  },
  {
    id: "67c56be2786aa4f63589fb42",
    name: "Ile du Ramier",
    latitude: 43.5922,
    longitude: 1.4411,
    createdAt: "2025-03-03T08:44:18.177Z",
    updatedAt: "2025-03-03T08:44:18.177Z",
  },
]);

const mockPrisma = { stop: { findMany: mockFindMany } };

const app = express();
app.use(express.json());
app.get("/api/stops", (req, res) => getStops(req, res, mockPrisma)); // On passe le mock ici

describe("GET /api/stops", () => {
  it("should return a list of stops", async () => {
    const response = await request(app).get("/api/stops");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    );

    expect(mockFindMany).toHaveBeenCalled(); // Vérifie que le mock a bien été appelé
    expect(mockFindMany).toHaveBeenCalledTimes(1);
  });
});
