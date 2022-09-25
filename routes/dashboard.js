var express = require('express');
var router = express.Router();
const usercontroller=require("../controllers/usercontroller")
const AdminAuth=require("../middleware/AdminAuth");

router.get('/',AdminAuth.islogin, function(req, res, next) {
    res.render('dashboard');
  });

router.get('/logout',AdminAuth.islogin,usercontroller.logout);
  module.exports = router;