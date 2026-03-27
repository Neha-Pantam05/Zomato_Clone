const foodPartnerModel = require("../models/foodPartner.model")

async function getFoodPartnerById(req,res){

  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId) 

  if(!foodPartner){
    return res.status(404).json({
      message:"foodPartner not Found"
    })
  }
  res.status(200).json({
    message:"FoodPartner retrived Successfully",
    foodPartner
  });
}

module.exports = {
  getFoodPartnerById
}