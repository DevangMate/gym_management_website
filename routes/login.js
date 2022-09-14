var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login');
  });

router.post("/login",async(req,res,next)=>{
  try{

    

  }
  catch(error){
    res.status(400).send("invalid userId")
  }
})
  

module.exports = router;