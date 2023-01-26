const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");


router.post("/register",async (req,res)=>{
 
   try{
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.context.body.password,salt);
     const newUser = new User({
    "userName" : req.context.body.userName,
    "password" : hashedPassword,
    "email" : req.context.body.email,
   })
     const user = await newUser.save();
     res.context.json(user);
   }
   catch(err){
    res.context.status(500).json(err);
   }
  });

  router.post("/login",async (req,res)=>{
    try{
      
       if(!req.context.body.email) {
         res.context.status(400).json("User name not provided"); 
         return;
       }

       if(!req.context.body.password){
         res.context.status(400).json("Password not provided");
         return;
       }
      const user = await User.findOne({"email": req.context.body.email});
     
       if(!user) {
        res.context.status(404).json("User not found");
        return;
       } 

      const validPassword = await bcrypt.compare(req.context.body.password,user.password);
      
      if(!validPassword) {
        res.context.status(401).json("Wrong password"); 
        return;
      }
      
      res.context.json(user);

    }
    catch(err){
      res.context.status(500).json(err);
    }
  });

module.exports  = router;