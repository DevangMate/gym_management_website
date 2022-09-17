var express = require('express');
var router = express.Router();
const session =require("express-session");

var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    res.render('login');
  });

router.post("/",async(req,res,next)=>{
  try{
    var UserID=req.body.UserID;
    var Password=req.body.Password;

    console.log(UserID);
    console.log(Password);
    

  }
  catch(error){
    res.status(400).send("invalid userId")
  }
})
  

module.exports = router;