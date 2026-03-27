const express = require ("express");
const FoodPartnerController = require("../controllers/foodPartner.controller")
const authMiddleware = require("../Middlewares/auth.middleware")
const router = express.Router();

router.get("/:id",authMiddleware.authUserMiddleware,FoodPartnerController.getFoodPartnerById
)
module.exports = router