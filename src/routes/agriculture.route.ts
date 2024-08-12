import { Router } from "express";
import { BrainAgricultureController } from "../app/controller/brain_agriculture.controller";

const agRouter = (brainAgricultureController: BrainAgricultureController) => {
  const router = Router();

  router.post("/", brainAgricultureController.create);
  router.get("/", brainAgricultureController.findFarms);
  router.get("/document", brainAgricultureController.findFarmDocument);
  router.get("/:id", brainAgricultureController.findFarm);
  router.put("/:id", brainAgricultureController.update);
  router.delete("/:id", brainAgricultureController.delete);

  return router;
};

export { agRouter };
