const foodModel = require("../models/food.model.js");
const storageService = require("../services/storage.service")
const {authFoodPartnerMiddleware} = require("../Middlewares/auth.middleware.js")
const {v4: uuid} = require("uuid")


async function createFood(req, res){

  
  const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
  
  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id
  })
  
  console.log("req.file: ", req.file)

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem
  })

}

async function getFoodItems(req,res){
  const foodItems = await foodModel.find({})
  res.status(200).json({
    message: "Food items retrieved successfully",
    foodItems
  })
}

module.exports= {
  createFood,
  getFoodItems
}