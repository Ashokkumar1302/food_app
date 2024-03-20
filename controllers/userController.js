const userModels = require("../models/userModels");
const bcrypt=require('bcryptjs')

const getUserController=async(req,res)=>{
  try{
    //find user
    const user=await userModels.findById({_id:req.body.id})
      //validation
      if(!user)
      {
        return res.status(404).send({
            success:false,
            message:"user not found",
            user
        });
      }
      //hide password
      user.password=undefined
      res.status(200).send({
        success:true,
        message:"user get successfully",
        user
      })
  }catch(err){
    console.log(err)
    res.status(500).send({
        success:false,
        message:"err in get user API",
        err
    })
  }

};
//update user
const updateUserController=async(req,res)=>{
    try{
        //find user
         const user=await userModels.findById({_id:req.body.id}) 
     //validation
     if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found",
        })
     }
     //update
     const {userName,address,phone}=req.body
     if(userName) 
     {
        user.userName=userName
     }
     if(address) user.address=address
     if(phone)user.phone=phone
     //save
     await user.save()
     res.status(200).send({
        success:true,
        message:"updated succesfully",
        user
     })
    }catch(err){
      console.log(err)
      res.status(500).send({
        success:false,
        message:"err in update API",
        err
      })
    }
};
//update user password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModels.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      err,
    });
  }
};
 
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await userModels.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "eror in PASSWORD RESET API",
      err,
    });
  }
};
// DLEETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};


module.exports={
  getUserController,updateUserController,updatePasswordController,
  resetPasswordController,deleteProfileController};