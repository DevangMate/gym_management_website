
const attendance = require("../models/attendance");
const User = require("../models/user");
const mongoose = require("mongoose");


var session = require('express-session');




const Markattendance = async(req,res)=>{
  if (!req.body) {
    res.status(400).send({ message: "content cant be empty" });
    return;
  }
 

  var UserID = req.body.UserID;
  const userExists = await User.exists({ UserID: UserID });
  if (userExists) {

    
    const user = await User.findOne({ UserID: UserID });

      const newattendance = new attendance({User:user?._id})
      newattendance.save()
      .then(data => {
        res.redirect('/dashboard/Attendance')
      })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occured while creating a create Operation"
          });
        })
    
  }

  else {
  console.log("something went wrong");
}

}
const Getattendancebydate= async(req,res)=>{
  let queryDate = req.params.date;
  attendance.find({ formattedDate: queryDate })
  .populate('User')
  .exec((err, attendance) => {
    if (err) return res.status(400).send(err);
    
    res.send(attendance);
  });

  

}



module.exports={
  Markattendance,
  Getattendancebydate
};
