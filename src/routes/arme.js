import { Router } from "express";
import ArmeController from "../controllers/ArmeController.js";
import { hasAuth } from "../middlewares/hasAuth.js";

const router = Router();

router.post(
  "/purchase-incubate-xeet-card",
  ArmeController.purchaseIncubateXeetCard
);

router.post("/generate-arme", ArmeController.generateArme);

router.post("/extract-to-ton", ArmeController.extractToTon);

export default router;
