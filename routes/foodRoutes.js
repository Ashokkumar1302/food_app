const express=require('express')
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllfoodController, getSinglefoodController, getFoodByRestaurentController } = require('../controllers/foodController');
const router=express.Router();

//create 
router.post("/create",authMiddleware,createFoodController)
//get all food
router.get('/getAll',getAllfoodController)
//get single food
router.get('/get/:id',getSinglefoodController)
//get by reataurent id
router.get('/getByrestau/:id',getFoodByRestaurentController)
//
module.exports=router