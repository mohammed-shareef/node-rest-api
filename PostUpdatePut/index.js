
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

        context.res = {
          body : post
      };
    
      }
      catch(err){
        context.res = {
            status : 500,
            body : 'Could not update post - '+err
      }
    }
}