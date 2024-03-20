const testController=(req,res)=>{
try{
  res.status(200).send({
    success:true,
    message:'data user api',
  })
}
catch(err){
    console.log('error in test API',err)
}
}

module.exports={testController}