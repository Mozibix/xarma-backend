import { Router } from 'express';
import UserController from '../../src/controllers/UserController.js';
const router = Router();

// Destructure the controller
const {
  getUser
} = UserController;

// Define user-related routes
router.get('/user', getUser);
export default router;