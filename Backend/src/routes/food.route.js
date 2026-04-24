const express = require("express");
const foodController = require("../controllers/food.controller.js");
const authMiddleware = require("../Middlewares/auth.middleware.js");
const multer = require("multer");

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
router.get("/",
  authMiddleware.authUserMiddleware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

router.post('/save',
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
)

router.get('/share/:foodId',
  authMiddleware.authUserMiddleware,
  foodController.shareFood,
)

router.get('/saved',
  authMiddleware.authUserMiddleware,
  foodController.getSavedFoods,
)

module.exports = router;
