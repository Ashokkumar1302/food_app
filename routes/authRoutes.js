const express=require('express')
const { registerController,logincontroller } = require('../controllers/authController')

const router=express.Router();

router.post('/register',registerController);
//login
router.post('/login',logincontroller)


module.exports=router