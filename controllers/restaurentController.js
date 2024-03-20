const restaurentModel = require("../models/restaurentModel")


const createRestaurentController=async(req,res)=>{
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body
        if(!title||!coords)
        {
            return res.status(500).send({
                success:false,
                message:"please provide title and address",
            })
        }
        const newRestaurent=new restaurentModel({title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,coords,

        });
        await newRestaurent.save()
        res.status(201).send({
            success:true,
            message:"new restaurent Created successfully",
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"error to create restaurent Api",
            err
        })
    }

}
//Get all restaurent

const getallRestaurentControoler= async(req,res) =>{
    try{
         const restaurants=await restaurentModel.find({})
         if(!restaurants){
            return res.status(404).send({
                success:false,
                message:"No restaurent availbale"
            })
         }
         res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants

         })

    }
    catch(err){
        console.log(err)
        return res.status(500).send({
            success:false,
            message:"err in get all restaurent API"
        })

    }
}
const getallRestaurentByIdController = async(req,res)=>{
    try{
             const restaurentId=req.params.id  
             if(!restaurentId){
                return res.status(404).send({
                    success:false,
                    message:"please provide restaurent Id",
                })
             }
             //find restaurent
             const restaurent =await restaurentModel.findById(restaurentId)
             //validation
             if(!restaurent){
                  return res.status(404).send({
                    success:false,
                    message:" no retaurent found"
                  })
             }
             res.status(200).send({
                success:true,
                restaurent,
             })
    }
    catch(err)
    {
      console.log(err)
      res.status(500).send({
        success:false,
        message:"err In get Restaurent By Id API",
        err
      })
    }
}
//delete restaurent 
const deleteRestaurentController = async(req,res)=>{
    try{
         const restaurentId=req.params.id
         if(!restaurentId){
            return res.status(404).send({
                success:false,
                message:"please provide the restaurent ID",
            })
         }
         await restaurentModel.findByIdAndDelete(restaurentId)
         res.status(200).send({
            success:true,
            message:"restautrent deleted successfullly",
         })
    }
    catch(err){
     console.log(err)
     res.status(500).send({
        success:false,
        message:" err in delete restaurent API",
        err
     })

    }

}

module.exports={createRestaurentController,
    getallRestaurentControoler,
    getallRestaurentByIdController,
    deleteRestaurentController}