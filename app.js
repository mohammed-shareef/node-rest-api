//The idea for using a separate .js file for initialisation was taken from the below post
//https://stackoverflow.com/questions/48815835/azure-function-run-code-on-startup-for-node

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

module.exports = async () => {

    console.log('Initialising...');

    helmet();
    morgan("common");

    mongoose.set('strictQuery', false);
    mongoose.connect(process.env["MONGODB_URL"],{useNewUrlParser : true, useUnifiedTopology : true},()=>{
       console.log('Connected to MongoDB..!!');
    });

   // global.ErrorHandler = ErrorHandler;
   // global.Validator = Validator;

    //this is just to test if it will work with async funcs
    //const wait = await delay(5000)

    console.log('Done initialising...');
}