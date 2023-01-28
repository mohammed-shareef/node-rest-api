
### Building a Social REST API using the MERN Stack
 The code in this repository is being  built to learn the MERN stack using the excellent project guidance provided by Lama dev 
 which can be found here https://www.youtube.com/watch?v=ldGl6L4Vktk

 As Azure Functions have been chosen for hosting the API the code base is divided into three branches
 
 The **master** branch holds the code for using express as the server
 **azure_function_express** contains code which is an attempt to run the express codebase on an Azure Function
 & the **azure_function** branch contains the code base which is a working copy of the API running on an Azure Function.
 
 The inspiration for moving this entirely to an Azure function comes from John Papa's excellent video on youtube [Refactor Node.js & Express API's to serverless](https://youtu.be/R6Oy5NzjtE0?t=2630). PS : This video is based on typescript though

Original source code  - https://github.com/safak/youtube/tree/social-rest-api 

##### Follow the commands below to create and initialise a nodejs project

###### Create the project using information like project name, developers name, etc
###### Defaults are already in place
npm init

##### Add the following packages to the project
###### express - nodejs framework to run the web server
###### mongoose - runs a mongodb server
###### dotenv - used to store environment variables, keys, passwords
###### helmet - secure communication over the API
###### morgan - logging middleware for the API calls to the server
###### nodemon - automatically restart the server when code changes are detected
npm add express mongoose dotenv helmet morgan nodemon

###### Runs the web server
npm start 
