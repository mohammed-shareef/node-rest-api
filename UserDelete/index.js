const User = require("../models/User");

module.exports = async function (context, req) {
   
    try{
        if(!req.body.userId){
          context.res = {
            status: 400,
            body: 'No user id provided'
          }
          return;
        }

        if(req.params.id === req.body.userId || req.body.isAdmin){
          await User.findByIdAndDelete(req.params.id);
          context.res = {
           body : "Account deleted successfully"
          };
        }
        else{
          context.res = {
            status : 403,
            body : "Only an admin can delete an account"
          };
        }
    }
    catch(err){
      context.res = {
        status : 500,
        body : 'Could not delete account - '+err
    }
  }
}