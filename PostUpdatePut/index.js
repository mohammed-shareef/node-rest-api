
const Post = require("../models/Post");

module.exports = async function (context, req) {
   
    try{
        const post = await Post.findById(req.params.id);
    
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            context.res = {
                body : "the post has been liked"
            };
        }
        else {
           await post.updateOne({$pull:{likes:req.body.userId}});
           context.res = {
            body : "the post has been disliked"
           };
        }
    }
    catch(err){
        context.res = {
            status : 500,
            body : 'Could not update post - '+err
       }
    }  
}