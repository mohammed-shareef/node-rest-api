const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/",async (req,res) => {

    try{

       if(!req.body.userId){
         res.json("User id not provided");
         return;
       }

       if(!req.body.desc){
        res.json("Description not provided");
        return;
      }

       const newPost = new Post(req.body);
       const savedPost = await newPost.save();

       res.json(savedPost);
    }
    catch(err){
      res.status(500).json(err);
    }
});

router.put("/:id",async (req,res) =>{
  try{
    const post = await Post.findById(req.params.id);

    if(!post){
        res.status(404).json("the post is not found");
        return;
    }

    if(req.body.userId !== post.userId){
        res.status(403).json("you can only update your own posts");
        return;
    }
    else{
      await post.updateOne({$set : req.body});
      res.json("updated post successfully");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete("/:id",async (req,res) =>{
 try{
   const post = await Post.findById(req.params.id);

   if(req.body.userId !== post.userId){
     res.status(403).json("you can only delete your own posts");
     return;
   }
   else{
    await post.delete();
    res.json("post deleted successfully");
   }
 }
 catch(err){
   res.status(500).json(err);
 }
});

router.put("/:id/like",async (req,res) =>{
try{
    const post = await Post.findById(req.params.id);

    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes:req.body.userId}});
        res.json("the post has been liked");
    }
    else {
       await post.updateOne({$pull:{likes:req.body.userId}});
       res.json("the post has been disliked");
    }
}
catch(err){
    res.status(500).send(err);
}
});

router.get("/:id",async (req,res) =>{

try{
   const post = await Post.findById(req.params.id);  
   res.json(post);
}
catch(err){
  res.status(500).json(err);
}

});

router.get("/timeline/all",async (req,res) =>{

    try{
       const currentUser = await User.findById(req.body.userId);
       const userPosts = await Post.find({userId : currentUser._id});
       const friendPosts = await Promise.all(
        currentUser.following.map(friendId =>{
          return Post.find({userId : friendId});
        }));
        res.json(userPosts.concat(...friendPosts));
    }
    catch(err){
      res.status(500).json('error '+err);
    }
})

module.exports = router;