
const Post = require("../models/Post");

module.exports = async function (context, req) {
   
    try{
        const post = await Post.findById(req.context.params.id);
    
        if(!post){
            context.res = {
                status : 404,
                body : "the post is not found"
            };
            return;
        }
    
        if(req.context.body.userId !== post.userId){
            context.res = {
                status : 403,
                body : "you can only update your own posts"
            };
            return;
        }
        else{
          await post.updateOne({$set : req.context.body});
          context.res = {
            body : "updated post successfully"
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