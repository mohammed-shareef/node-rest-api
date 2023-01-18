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
    res.status(500).json(err);
   }
  });

  router.post("/login",async (req,res)=>{
    try{
      
       if(!req.body.email) {
         res.status(400).json("User name not provided"); 
         return;
       }

       if(!req.body.password){
         res.status(400).json("Password not provided");
         return;
       }
      const user = await User.findOne({"email": req.body.email});
     
       if(!user) {
        res.status(404).json("User not found");
        return;
       } 

      const validPassword = await bcrypt.compare(req.body.password,user.password);
      
      if(!validPassword) {
        res.status(401).json("Wrong password"); 
        return;
      }
      
      res.json(user);

    }
    catch(err){
      res.status(500).json(err);
    }
  });

module.exports  = router;