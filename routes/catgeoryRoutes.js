const express=require('express')

const authMiddleware = require('../middleware/authMiddleware');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');

const router=express.Router();

//create
router.post('/create',authMiddleware,createCatController)
//get all

router.get('/getAll',getAllCatController)

//update categeory
router.put('/update/:id',authMiddleware,updateCatController)
//delete categeory
router.delete('/delete/:id',authMiddleware,deleteCatController)

module.exports=router;