var express = require('express');
var router = express.Router();
const usercontroller=require("../controllers/usercontroller")
const AdminAuth=require("../middleware/AdminAuth");
const Membercontroller=require("../controllers/Membercontroller");

const TrainerController=require("../controllers");
const axios=require('axios').default;


var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}));
/**
 * @description Dashboard Route
 * @method GET/
 */
router.get('/',AdminAuth.islogin, function(req, res, next) {
    res.render('dashboard');
  });

router.get('/logout',AdminAuth.islogin,usercontroller.logout);

// Member
/**
 * @description Membermenu Route
 * @method GET/
 */
router.get('/Members',AdminAuth.islogin,function(req, res, next) {
  axios.get('http://localhost:3000/dashboard/Members/api/users')
   .then(function(response){
    
    res.render('Members',{members:response.data});
   
   })
   .catch(err=>{
    res.send(err);
   })
  
});

/**
 * @description add member
 * @method GET/ add_member
 */
router.get('/Members/add_member',AdminAuth.islogin,function(req, res, next) {
  res.render('addmember');
});

/**
 * @description update member
 * @method GET/ update_member
 */
router.get('/Members/update_member',AdminAuth.islogin,function(req, res, next) {
  axios.get('http://localhost:3000/dashboard/Members/api/users', { params : { id : req.query.id }})
  .then(function(memberdata){
    
    res.render('updatemember',{member:memberdata.data});
  })
  .catch(err =>{
    res.send(err);
})
  
});

// API
router.post('/Members/api/users',Membercontroller.CreateMember);

router.get('/Members/api/users',Membercontroller.FindMember);

router.put('/Members/api/users/:id',Membercontroller.UpdateMember);

router.delete('/Members/api/users/:id',Membercontroller.DeleteMember);



// Trainer

router.get('/Trainers',AdminAuth.islogin,function(req, res, next){
  res.render('Trainers')
}),


// adding trainer
router.get('/Trainers/add_Trainer',AdminAuth.islogin,function(req, res, next) {
  res.render('addTrainer');
});





// API
router.post('/Trainers/api/users',TrainerController.CreateTrainer);
  module.exports = router;

