const mongoose=require('mongoose')

 const connectDb=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected To datbase ${mongoose.connection.host}`)
  
    }
    catch(err){
        console.log("Db err",err);
    }
}
module.exports= connectDb;