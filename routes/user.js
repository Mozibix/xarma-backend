const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");

// const userController = require("../controllers/users.controller");

// router.get("/getProfile", requireAuth, userController.GetProfile);

module.exports = router;
