const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");


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

  router.post("/login",async (req,res)=>{
    try{
      
      const user = await User.findOne({"email": req.body.email});
      !user && res.status(404).json("User not found"); 

      const validPassword = await bcrypt.compare(req.body.password,user.password);
      !validPassword && res.status(401).json("Wrong password"); 

      res.json(user);

    }
    catch(err){
      console.log(err);
    }
  });

module.exports  = router;