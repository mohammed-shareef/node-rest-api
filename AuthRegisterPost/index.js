
const User = require("../models/User");
const bcrypt = require("bcrypt");
require('../app')();

module.exports = async function(context, req) {

   try{

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    context.res = { body : hashedPassword};
    const newUser = new User({
        "userName" : req.body.userName,
        "password" : hashedPassword,
        "email" : req.body.email,
    })
     const user = await newUser.save();

     context.res = { body : user};
   }
   catch(err){
    context.log('Error '+err);
    context.res = { body : err};
   }
};