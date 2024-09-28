import { Router } from "express";
import UserController from "../../src/controllers/UserController.js";

const router = Router();

// Destructure the controller
const { getUser, getUserCardDetails } = UserController;

// Define user-related routes
router.get("/user", getUser);

router.get("/user-card-details", getUserCardDetails);

export default router;
