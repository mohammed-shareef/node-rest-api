const bcrpyt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

module.exports  = router;

router.get("/",(req,res)=>{
  res.send("users")
});

router.get("/:id",async (req,res)=>{

  try{
    const user = await User.findById(req.params.id);
    const {password,createdAt,updatedAt,__v,...other} = user._doc;
    res.json(other);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put("/:id",async (req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin){
     if(req.body.password){
      try{
        const salt = await bcrpyt.genSalt(10);
        req.body.password = await bcrpyt.hash(req.body.password,salt);
      } 
      catch(err){
        return res.status(500).json(err);
      }
     }

     try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body});
        res.json("Account updated");
     }
     catch(err){
       res.status(500).json(err);
     }
   }
   else
      res.status(403).json('Only admins can update other users');
  });

  router.delete("/:id",async (req,res) =>{
    try{
       
        if(!req.body.userId){
          res.status(400).json('No user id provided');
          return;
        }

        if(req.params.id === req.body.userId || req.body.isAdmin){
          await User.findByIdAndDelete(req.params.id);
          res.json("Account deleted successfully")
        }
        else{
          res.status(403).json("Only an admin can delete an account");
        }
    }
    catch(err){
      res.status(500).json(err);
    }
  });

  router.put("/:id/follow",async (req,res) =>{

    if(req.params.id !== req.body.userId){
      try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId))
          res.status(403).json("You already follow this user");
        else{
            await user.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({$push:{following:req.params.id}});
            res.json("User is being followed");
        }
      }
      catch(err){

      }
    }
    else{
       res.status(403).json("you cannot follow yourself");
    }

  });

  router.put("/:id/unfollow",async (req,res) =>{

    if(req.params.id !== req.body.userId){
      try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId))
          res.status(403).json("You dont follow this user");
        else{
            await user.updateOne({$pull:{followers:req.body.userId}});
            await currentUser.updateOne({$pull:{following:req.params.id}});
            res.json("User has been unfollowed");
        }
      }
      catch(err){

      }
    }
    else{
       res.status(403).json("you cannot unfollow yourself");
    }

  });