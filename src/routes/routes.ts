import { Router } from "express";
import { agRouter } from "./agriculture.route";

const router = Router();

router.use("/agriculture", agRouter);

export { router };
