const express=require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { createRestaurentController, getallRestaurentControoler, getallRestaurentByIdController, deleteRestaurentController } = require('../controllers/restaurentController');

const router=express.Router();
//routes
router.post('/create',authMiddleware,createRestaurentController)
//get all restaurent
router.get("/getAll",getallRestaurentControoler)
//get restaurent by ID
router.get("/get/:id",getallRestaurentByIdController)

//DELETE RESATAURENT
router.delete("/delete/:id",authMiddleware,deleteRestaurentController)

module.exports=router