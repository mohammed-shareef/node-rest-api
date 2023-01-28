const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async function (context, req) {
    try{
      
        if(!req.body.email) {
          context.res = { body: "User name not provided"}; 
          return;
        }
 
        if(!req.body.password){
            context.res = { body: "Password not provided"};
          return;
        }
       const user = await User.findOne({"email": req.body.email});
      
        if(!user) {
            context.res = { body: "User not found"};
         return;
        } 
 
       const validPassword = await bcrypt.compare(req.body.password,user.password);
       
       if(!validPassword) {
        context.res = { body: "Wrong password" }; 
         return;
       }
       
       res.json(user);
 
     }
     catch(err){
        context.res = { body : err};
     }
}