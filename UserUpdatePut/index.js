
module.exports = async function (context, req) {
   
    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){
           const salt = await bcrpyt.genSalt(10);
           req.body.password = await bcrpyt.hash(req.body.password,salt);
         }
   
        try{
           const user = await User.findByIdAndUpdate(req.params.id,{$set : req.body});
           context.res = {
            body :  "Account updated"
           }
        }
        catch(err){
          context.res = {
            status : 500,
            body : 'Could not update user - '+err
           }
        }
      }
      else
         context.res = {
            status: 403,
            body : 'Only admins can update other users'
        };
}