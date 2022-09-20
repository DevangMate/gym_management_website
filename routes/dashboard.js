var express = require('express');
var router = express.Router();
const admincontroller=require("../controllers/admincontroller")
const AdminAuth=require("../middleware/adminAuth")
router.get('/',AdminAuth.islogin, function(req, res, next) {
    res.render('dashboard');
  });

router.get('/logout',AdminAuth.islogin,admincontroller.logout);
  module.exports = router;