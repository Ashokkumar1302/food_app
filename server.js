const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDb = require('./config/db')


dotenv.config()
//db connection
connectDb();

//rest object
const app =express()
//middleware
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))

//route

app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/resturent',require("./routes/restaurentRoutes"))
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use('/api/v1/food',require('./routes/foodRoutes'))

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>welcome to server app</h1>");

});
//port
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`node server running ${port}`);
});