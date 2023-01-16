const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

module.exports  = router;

router.post("/register",async (req,res)=>{
 
   try{
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password,salt);
     const newUser = new User({
    "userName" : req.body.userName,
    "password" : hashedPassword,
    "email" : req.body.email,
   })
     const user = await newUser.save();
     res.json(user);
   }
   catch(err){
    console.log("Error when registering user"+err);
   }
  });