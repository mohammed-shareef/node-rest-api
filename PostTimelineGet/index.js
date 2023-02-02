
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = async function (context, req) {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
         currentUser.following.map(friendId =>{
           return Post.find({userId : friendId});
         }));
         context.res = {
            body : userPosts.concat(...friendPosts)
         };
     }
     catch(err){
       context.res = {
          status : 500,
          body : 'Could not show timeline - '+err
       }
     }
}