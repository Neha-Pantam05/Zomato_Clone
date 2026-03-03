const express = require("express");
const authController = require("../controllers/auth.controller.js")

const router = express.Router();

// user Auth API's
router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logoutUser)


// foodPatner Auth API's
router.post("/foodPatner/register",authController.registerFoodPatner)
router.post("/foodPatner/login",authController.loginFoodPatner)
router.get("/foodPatner/logout",authController.logoutFoodPatner)


module.exports = router;