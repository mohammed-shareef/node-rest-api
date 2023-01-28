const User = require('../models/User');

module.exports = async function (context, req) {

    try{
        const user = await User.findById(req.params.id);
        const {password,createdAt,updatedAt,__v,...other} = user._doc;
        context.res =  {body : other};
      }
      catch(err){
        context.res = {
          status : 500,
          body: 'Could not find user - '+err
        };
      }
}