const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
userName:{
    type:String,
    required:[true,'user name is require']
},
email:{
    type:String,
    required:[true,'email is require'],
    unique:true
},
password:{
    type:String,
    required:[true,'pasword is required'],
},
address:{
    type:Array,

},
phone:{
    type:String,
    required:[true,'phone number is require'],
},
usertype:{
    type:String,
    required:[true,'user type is required'],
    default:'client',
    enum:['client','admin','vendor','driver'],
},
profile:{
    type:String,
    default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
},
answer:{
    type:String,
    require:[true,"answer required"]
}


},{timestamps:true})

module.exports=mongoose.model('User',userSchema);