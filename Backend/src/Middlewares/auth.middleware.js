const foodPatnerModel = require("../models/foodPatner.model")
const jwt = require("jsonwebtoken")

async function authFoodPatnerMiddleware(req,res,next){

  const token = req.cookies.token;

  if(!token) {
    return res.status(401)({
      message:"login first"
    })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 

    const foodPatner = await foodPatnerModel.findById(decoded.id)

    req.foodPatner = foodPatner
    next()
  }catch(err){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }

}

module.exports = {authFoodPatnerMiddleware}