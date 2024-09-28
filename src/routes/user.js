import { Router } from "express";
import UserController from "../../src/controllers/UserController.js";
import { hasAuth } from '../middlewares/hasAuth'

const router = Router();

// Destructure the controller
const { getUser, getUserCardDetails } = UserController;

// Define user-related routes
router.get("/user", getUser);

router.get("/user-card-details", getUserCardDetails);
router.get('/details', hasAuth, UserController.getUserDetails);
router.get('/scores', hasAuth, UserController.getUserScores);

export default router;
