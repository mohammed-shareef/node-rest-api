const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async function (context, req) {
    try{
      
        if(!req.body.email) {
          context.res = { 
            status: 400,
            body: "Email not provided"
          }; 
          return;
        }

        if(!req.body.userName) {
          context.res = { 
            status: 400,
            body: "User name not provided"
          }; 
          return;
        }
 
        if(!req.body.password){
            context.res = {
              status: 400,
              body: "Password not provided"
            };
          return;
        }
       const user = await User.findOne({"email": req.body.email});
      
        if(!user) {
            context.res = {
               status: 404,
               body: "User not found"
              };
         return;
        } 
 
       const validPassword = await bcrypt.compare(req.body.password,user.password);
       
       if(!validPassword) {
        context.res = { 
          status: 401,
          body: "Wrong password" }; 
         return;
       }
       
       context.res = {
        body : user};
 
     }
     catch(err){
        context.res = {
          status: 500,
           body : 'Unable to login - '+err};
     }
}