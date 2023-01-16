const router = require("express").Router();

module.exports  = router;

router.get("/",(req,res)=>{
    res.send("<H2>Welcome Users...!!</H2>")
  });