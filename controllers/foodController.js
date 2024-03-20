const foodModal = require("../models/foodModal");


// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturnat) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};
const getAllfoodController = async(req,res)=>{
    try{
         const foods =await foodModal.find({})
         if(!foods)
         {
           return res.status(404).send({
            success:false,
            message:"no food items was found"
           })
         }
         res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods,
         })
    }
    catch(err){
        console.log(err)
        res.stauts(500).send({
            success:false,
            message: "Erorr in get All food API",
        err,
        });
    }
};
//get all single food 
const getSinglefoodController =async(req,res)=>{
         try{
          const foodId=req.params.id
          if(!foodId)
          {
            return res.stauts(404).send({
                success:false,
                message:"please provide the valid id"
            })
          }
           const food=await foodModal.findById(foodId)
           if(!food){
            return res.status(404).send({
                success:false,
                message:"no food found with this id"
            })
           }
           res.status(200).send({
            success:true,
            food
           })
         }
         catch(err){
            console.log(err)
            res.status(500).send({
                success:false,
                message:"Error in get sigle food item"
            });
         }
};
//get food by restaurent
//get all single food 
const getFoodByRestaurentController =async(req,res)=>{
  try{
   const restaurentId=req.params.id
   if(!restaurentId)
   {
     return res.stauts(404).send({
         success:false,
         message:"please provide the valid id"
     })
   }
    const food=await foodModal.find({resturnat:restaurentId})
    if(!food){
     return res.status(404).send({
         success:false,
         message:"no food found with this id"
     })
    }
    res.status(200).send({
     success:true,
     message:"food based on restaurent",
     food
    })
  }
  catch(err){
     console.log(err)
     res.status(500).send({
         success:false,
         message:"Error in get sigle food item"
     });
  }
};



module.exports={createFoodController,getAllfoodController,getSinglefoodController,getFoodByRestaurentController}