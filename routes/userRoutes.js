const express=require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();
//get user
router.get('/getUser',authMiddleware, getUserController) 
//upadte user
router.put('/updateUser',authMiddleware,updateUserController)
//update password
router.post('/updatePassword',authMiddleware,updatePasswordController)
//reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)
//
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports=router