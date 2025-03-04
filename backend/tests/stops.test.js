import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { getStops } from "../controllers/stopsController";

const prisma = new PrismaClient();

describe("Tests pour GET /api/stops", () => {
  const app = express();
  app.use(express.json());
  app.get("/api/stops", getStops);

  beforeAll(async () => {
    const existingStops = await prisma.stop.findMany();
    if (existingStops.length === 0) {
      // Si la table est vide insère des données
      await prisma.stop.createMany({
        data: [{ name: "Stop 1" }, { name: "Stop 2" }],
      });
    }
  });

  afterAll(async () => {
    await prisma.stop.deleteMany({
      where: { name: { startsWith: "Stop" } },
    });
    await prisma.$disconnect();
  });

  it("devrait renvoyer une liste d'arrêts", async () => {
    const response = await request(app).get("/api/stops");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });
});
