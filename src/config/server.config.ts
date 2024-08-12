import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "../routes/routes";
import { BrainAgricultureRepository } from "../app/repository/brain_agriculture.repository";
import { BrainAgricultureUseCase } from "../app/use_cases/brain_agriculture.use_case";
import { BrainAgricultureController } from "../app/controller/brain_agriculture.controller";
import { agRouter } from "../routes/agriculture.route";
import { PrismaClient } from "@prisma/client";

export function createServer(): Application {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  const prisma = new PrismaClient();

  app.use(express.json());

  const brainAgricultureRepository = new BrainAgricultureRepository(prisma);
  const brainAgricultureUseCase = new BrainAgricultureUseCase(
    brainAgricultureRepository
  );
  const brainAgricultureController = new BrainAgricultureController(
    brainAgricultureUseCase
  );

  app.use("/api/agriculture", agRouter(brainAgricultureController));

  return app;
}
