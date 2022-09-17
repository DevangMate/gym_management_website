var express = require('express');
var router = express.Router();
const admincontroller=require("../controllers/admincontroller")
const session =require("express-session");
// const config=require("../config/config");
// router.use(session({secret:config.sessionSecret}))
var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
    res.render('login');
  });



router.get("/dashboard",admincontroller.loadDashboard);

router.post('/',admincontroller.verifyLogin);

router.get("*",function(req,res,next){
  res.redirect('/login')
})

  

module.exports = router;