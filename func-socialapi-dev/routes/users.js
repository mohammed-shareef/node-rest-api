const bcrpyt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");

module.exports  = router;

router.get("/",(req,res)=>{
  res.send("users")
});

router.get("/:id",async (req,res)=>{

  try{
    const user = await User.findById(req.context.params.id);
    const {password,createdAt,updatedAt,__v,...other} = user._doc;
    res.json(other);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put("/:id",async (req,res)=>{
   if(req.context.body.userId === req.context.params.id || req.context.body.isAdmin){
     if(req.context.body.password){
      try{
        const salt = await bcrpyt.genSalt(10);
        req.context.body.password = await bcrpyt.hash(req.context.body.password,salt);
      } 
      catch(err){
        return res.status(500).json(err);
      }
     }

     try{
        const user = await User.findByIdAndUpdate(req.context.params.id,{$set : req.context.body});
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
       
        if(!req.context.body.userId){
          res.status(400).json('No user id provided');
          return;
        }

        if(req.context.params.id === req.context.body.userId || req.context.body.isAdmin){
          await User.findByIdAndDelete(req.context.params.id);
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

    if(req.context.params.id !== req.context.body.userId){
      try{
        const user = await User.findById(req.context.params.id);
        const currentUser = await User.findById(req.context.body.userId);
        if(user.followers.includes(req.context.body.userId))
          res.status(403).json("You already follow this user");
        else{
            await user.updateOne({$push:{followers:req.context.body.userId}});
            await currentUser.updateOne({$push:{following:req.context.params.id}});
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

    if(req.context.params.id !== req.context.body.userId){
      try{
        const user = await User.findById(req.context.params.id);
        const currentUser = await User.findById(req.context.body.userId);
        if(!user.followers.includes(req.context.body.userId))
          res.status(403).json("You dont follow this user");
        else{
            await user.updateOne({$pull:{followers:req.context.body.userId}});
            await currentUser.updateOne({$pull:{following:req.context.params.id}});
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