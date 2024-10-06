import { Router } from "express";
import AuthController from "../../src/controllers/AuthController.js";

const router = Router();

const { authenticateUser } = AuthController;

// Define user-related routes
router.post("/authentiate", authenticateUser);

export default router;
