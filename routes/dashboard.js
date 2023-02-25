var express = require('express');
var router = express.Router();
const usercontroller=require("../controllers/usercontroller")
const AdminAuth=require("../middleware/AdminAuth");
const Membercontroller=require("../controllers/Membercontroller");
const Attendancecontroller=require("../controllers/attendancecontroller")
const TrainerController=require("../controllers/Trainercontroller");
const axios=require('axios').default;


var bodyParser = require('body-parser');
const attendance = require('../models/attendance');
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
  axios.get('http://localhost:3000/dashboard/Trainers/api/trainers')
  .then(function(response){
   
   res.render('Trainers',{trainers:response.data});
  
  })
  .catch(err=>{
   res.send(err);
  })
}),


// adding trainer
router.get('/Trainers/add_Trainer',AdminAuth.islogin,function(req, res, next) {
  res.render('addTrainer');
});
// Updating Trainer
router.get('/Trainers/update_trainer',AdminAuth.islogin,function(req, res, next) {
  axios.get('http://localhost:3000/dashboard/Trainers/api/trainers', { params : { id : req.query.id }})
  .then(function(trainerdata){
    
    res.render('updatetrainer',{trainer:trainerdata.data});
  })
  .catch(err =>{
    res.send(err);
})
  
});





// API
router.post('/Trainers/api/trainers',TrainerController.CreateTrainer);

router.get('/Trainers/api/trainers',TrainerController.FindTrainer);

router.put('/Trainers/api/trainers/:id',TrainerController.UpdateTrainer);

router.delete('/Trainers/api/trainers/:id',TrainerController.DeleteTrainer);


//attendance

router.get('/Attendance', function (req, res) {
  
  axios.get('http://localhost:3000/dashboard/Attendance/api/attendances')
  .then(function(response){
    
    
    res.render('attendance', { attendance: response.data });
    
    })
    .catch(err =>{
    res.send(err);
    });
    });


//API
router.post('/Attendance/api/attendance',Attendancecontroller.Markattendance);
router.get('/Attendance/api/attendances',Attendancecontroller.Getattendancebydate);

module.exports = router;


