const User = require("../models/User");

module.exports = async function (context, req) {

    if(req.params.id !== req.body.userId){
        try{
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if(user.followers.includes(req.body.userId))
            context.res = {
                status : 403,
                body: "You already follow this user"
            }
          else{
              await user.updateOne({$push:{followers:req.body.userId}});
              await currentUser.updateOne({$push:{following:req.params.id}});
              context.res = {
                body: "User is being followed"
              }
          }
        }
        catch(err){
            context.res = {
                status : 500,
                body: "Error trying to follow the user - "+err
              }
        }
      }
      else{
         context.res = {
            status : 403,
            body: "you cannot follow yourself"
         }
      }
}