const Post = require("../models/Post");

module.exports = async function (context, req) {
    try{
        const post = await Post.findById(req.params.id);
     
        if(req.body.userId !== post.userId){
          context.res = {
            status : 403,
            body : "you can only delete your own posts"
          };
          return;
        }
        else{
         await post.delete();
         context.res = {
            body : "post deleted successfully"
          };
        }
      }
      catch(err){
        context.res = {
            status : 500,
            body : 'Could not delete post - '+err
        }
      }
}