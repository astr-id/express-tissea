import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getDistanceBetweenStops } from "../controllers/statsController";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get(
  "/api/stats/distance/stops/:startStopId/:endStopId",
  getDistanceBetweenStops
);

let createdData = false;

beforeAll(async () => {
  const stop1 = await prisma.stop.findUnique({
    where: { id: new ObjectId("67c7069af86ce712949262eb") }, // Utilisez un ObjectId valide
  });

  const stop2 = await prisma.stop.findUnique({
    where: { id: new ObjectId("67c7069af86ce712949262ec") }, // Utilisez un ObjectId valide
  });

  if (!stop1 || !stop2) {
    await prisma.stop.createMany({
      data: [
        {
          id: new ObjectId(),
          name: "Palais de Justice",
          latitude: 43.5922,
          longitude: 1.4447,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: new ObjectId(),
          name: "Ile du Ramier",
          latitude: 43.5922,
          longitude: 1.4411,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
    createdData = true; 
  }
});

afterAll(async () => {
  if (createdData) {
    // Suppression des arrêts créés par les tests
    await prisma.stop.deleteMany({
      where: {
        id: {
          in: [
            new ObjectId("60d21b4667d0d8992e610c85"), // Arrêt 1
            new ObjectId("67c7069af86ce712949262ec"), // Arrêt 2
          ],
        },
      },
    });
  }
  await prisma.$disconnect();
});

// Tests
describe("GET /api/stats/distance/stops/:startStopId/:endStopId", () => {
  it("devrait renvoyer la distance entre deux arrêts", async () => {
    const response = await request(app).get(
      "/api/stats/distance/stops/67c7069af86ce712949262eb/67c7069af86ce712949262ec" 
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ distance: expect.any(String) });
  });
});
