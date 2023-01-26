const createHandler = require("azure-function-express").createHandler;
const express = require("@azure/function");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")

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
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.get("/",(req,res)=>{
  res.send("<H2>Welcome ...!!</H2>")
});
 

// Binds the express app to an Azure Function handler
module.exports = createHandler(app);