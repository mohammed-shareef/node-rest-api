const router = require("express").Router();
const User = require("../models/User");

module.exports  = router;

router.post("/register",async (req,res)=>{
   const newUser = new User({
    "userName" : req.body.userName,
    "password" : req.body.password,
    "email" : req.body.email,
   })
   try{
     const user = await newUser.save();
     res.json(user);
   }
   catch(err){
    console.log("Error when registering user"+err);
   }
  });