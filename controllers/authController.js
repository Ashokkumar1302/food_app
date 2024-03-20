const userModels = require("../models/userModels");
const bcrypt=require('bcryptjs')
const Jwt=require('jsonwebtoken')


const registerController=async(req,res)=>{
try{
    const {userName,email,password,phone,address,answer}=req.body
    //validation
    if(!userName || !email ||!password ||!phone||!address||!answer)
    {
        return res.status(500).send({
            success:false,
            message:'please provide all field'
        });
    }
    //check user
    const existing=await userModels.findOne({email})
    if(existing)
    {
          return res.status(500).send({
            success:false,
            message:'email already register',
          });
    }
    //hashing password
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    //create new user
    const user=await userModels.create({
        userName,
        email,
        password:hashedPassword,
        address,
        phone,answer,});
    res.status(201).send(
        {
         success:true,
         message:"Successfully Registered", 
         user,
        }
    );
}
    catch(err)
    {
        console.log(err)
        res.status(500).send({
            success:false,
            message:'error In registor Api',
            err
        })
    }

};
const logincontroller=async(req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email ||!password)
        {
            return res.status(500).send({
                success:false,
                message:"please provide Email or password"
            })
        }
        //check user
        const user=await userModels.findOne({email})
        if(!user)
        {
            return res.status(404).send({
                succes:false,
                message:"User not found"
            })
        }
        //check user password | comapre password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials",
            });
        }
        const token=Jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"Login succesfully",
            token,
            user,
        })

    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in login API",
            err
        })
    }

}

module.exports={registerController,logincontroller};