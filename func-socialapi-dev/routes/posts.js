const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/",async (req,res) => {

    try{

       if(!req.context.body.userId){
         res.context.json("User id not provided");
         return;
       }

       if(!req.context.body.desc){
        res.context.json("Description not provided");
        return;
      }

       const newPost = new Post(req.context.body);
       const savedPost = await newPost.save();

       res.context.json(savedPost);
    }
    catch(err){
      res.context.status(500).json(err);
    }
});

router.put("/:id",async (req,res) =>{
  try{
    const post = await Post.findById(req.context.params.id);

    if(!post){
        res.context.status(404).json("the post is not found");
        return;
    }

    if(req.context.body.userId !== post.userId){
        res.context.status(403).json("you can only update your own posts");
        return;
    }
    else{
      await post.updateOne({$set : req.context.body});
      res.context.json("updated post successfully");
    }
  }
  catch(err){
    res.context.status(500).json(err);
  }
});

router.delete("/:id",async (req,res) =>{
 try{
   const post = await Post.findById(req.context.params.id);

   if(req.context.body.userId !== post.userId){
     res.context.status(403).json("you can only delete your own posts");
     return;
   }
   else{
    await post.delete();
    res.context.json("post deleted successfully");
   }
 }
 catch(err){
   res.context.status(500).json(err);
 }
});

router.put("/:id/like",async (req,res) =>{
try{
    const post = await Post.findById(req.context.params.id);

    if(!post.likes.includes(req.context.body.userId)){
        await post.updateOne({$push:{likes:req.context.body.userId}});
        res.context.json("the post has been liked");
    }
    else {
       await post.updateOne({$pull:{likes:req.context.body.userId}});
       res.context.json("the post has been disliked");
    }
}
catch(err){
    res.context.status(500).send(err);
}
});

router.get("/:id",async (req,res) =>{

try{
   const post = await Post.findById(req.context.params.id);  
   res.context.json(post);
}
catch(err){
  res.context.status(500).json(err);
}

});

router.get("/timeline/all",async (req,res) =>{

    try{
       const currentUser = await User.findById(req.context.body.userId);
       const userPosts = await Post.find({userId : currentUser._id});
       const friendPosts = await Promise.all(
        currentUser.following.map(friendId =>{
          return Post.find({userId : friendId});
        }));
        res.context.json(userPosts.concat(...friendPosts));
    }
    catch(err){
      res.context.status(500).json('error '+err);
    }
})

module.exports = router;