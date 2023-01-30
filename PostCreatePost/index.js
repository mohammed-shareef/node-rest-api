const Post = require("../models/Post");

module.exports = async function (context, req) {
  
    try{

        if(!req.body.userId){
          context.res = {
            body : "User id not provided"
          };
          return;
        }
 
        if(!req.body.desc){
         context.res = {
            body : "Description not provided"
         };
         return;
       }
 
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
 
        context.res = {
            body: savedPost
        };
     }
     catch(err){
       context.res = {
        status : 500,
        body : 'Could not create post - '+err
     };
   }
}