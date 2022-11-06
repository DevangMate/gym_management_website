var express = require('express');
var router = express.Router();
const session =require("express-session");
const config=require("../config/config");

const usercontroller=require("../controllers/usercontroller")
const UserAuth=require("../middleware/UserAuth")
/* GET users listing. */
router.get('/', UserAuth.islogin,function(req, res, next) {
  res.render('userdashboard');
});
router.get('/Analytics', UserAuth.islogin,function(req, res, next) {
  res.render('useranalytics.hbs');
});
router.get('/logout',UserAuth.islogin,usercontroller.logout);

module.exports = router;
