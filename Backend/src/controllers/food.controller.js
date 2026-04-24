const foodModel = require("../models/food.model.js");
const storageService = require("../services/storage.service");
const {
  authFoodPartnerMiddleware,
} = require("../Middlewares/auth.middleware.js");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/like.model.js");
const saveModel = require("../models/save.model.js");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  console.log("req.file: ", req.file);

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  const userLikes = await likeModel.find({ user: req.user._id }).select('food');
  const likedFoodIds = userLikes.map(like => like.food.toString());

  const userSaves = await saveModel.find({ user: req.user._id }).select('food');
  const savedFoodIds = userSaves.map(save => save.food.toString());

  const foodItemsWithStatus = foodItems.map(item => ({
    ...item.toObject(),
    isLiked: likedFoodIds.includes(item._id.toString()),
    isSaved: savedFoodIds.includes(item._id.toString())
  }));

  res.status(200).json({
    message: "Food items retrieved successfully",
    foodItems: foodItemsWithStatus,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({ user: user._id, food: foodId });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

    return res.status(200).json({ message: "Food item unliked successfully" });
  }

  const like = await likeModel.create({ user: user._id, food: foodId });

  await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

  res.status(201).json({ message: "Food item  liked successfully", like });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({ user: user._id, food: foodId });
    return res.status(200).json({ message: "Food item unsaved successfully" });
  }

  const save = await saveModel.create({ user: user._id, food: foodId });

  res.status(201).json({ message: "Food item saved successfully", save });
}

async function shareFood(req, res) {
  const { foodId } = req.params;
  const food = await foodModel.findById(foodId).populate('foodPartner', 'name');

  if (!food) {
    return res.status(404).json({ message: "Food item not found" });
  }

  const shareData = {
    title: food.name,
    description: food.description,
    url: `http://localhost:5173/food/${foodId}`, // Assuming frontend URL
    image: food.video, // Assuming video is the main media
    partner: food.foodPartner.name
  };

  res.status(200).json({
    message: "Share data retrieved successfully",
    shareData
  });
}

async function getSavedFoods(req, res) {
  const userSaves = await saveModel.find({ user: req.user._id }).populate('food');
  const savedFoods = userSaves.map(save => save.food);

  const userLikes = await likeModel.find({ user: req.user._id }).select('food');
  const likedFoodIds = userLikes.map(like => like.food.toString());

  const savedFoodsWithStatus = savedFoods.map(item => ({
    ...item.toObject(),
    isLiked: likedFoodIds.includes(item._id.toString()),
    isSaved: true
  }));

  res.status(200).json({
    message: "Saved food items retrieved successfully",
    savedFoods: savedFoodsWithStatus,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  shareFood,
  getSavedFoods,
};
