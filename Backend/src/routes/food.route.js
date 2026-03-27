const express = require("express");
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../Middlewares/auth.middleware.js");
const  multer  = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// POST -> http://localhost:3000/api/food
const router = express.Router();
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// GET -> http://localhost:3000/api/food
router.get("/",authMiddleware.authUserMiddleware,
  foodController.getFoodItems)


module.exports = router;
