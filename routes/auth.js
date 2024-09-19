import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/onboard", authController.CreateAccount);
router.post("/login", authController.loginUser);

export default router;
