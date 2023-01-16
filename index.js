const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");

dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser : true, useUnifiedTopology : true},()=>{
    console.log('Connected to MongoDB..!!');
});


const app = express();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);

app.get("/",(req,res)=>{
  res.send("<H2>Welcome ...!!</H2>")
});

app.listen(8800, ()=>{
  console.log('Backend server is running.!!');
});