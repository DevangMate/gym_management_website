const User =require("../models/user");
var session=require('express-session');

// Create and Save Member
const CreateMember=async(req,res)=>{
//  validate request
 if(!req.body){
    res.status(400).send({message:"content cant be empty"});
    return;
 }

//  new user
 const Member=new User({
    UserID:req.body.UserID,
    Name:req.body.Name,
    Password:req.body.Password,
    is_admin:0,
    is_trainer:0,
    Height:req.body.Height,
    Weight:req.body.Weight,
    BirthDate:req.body.BirthDate,
    Phone:req.body.Phone,
    AlternatePhone:req.body.AlternatePhone,
    Address:req.body.Address,
    email:req.body.email,
    Gender:req.body.Gender,
    Status:req.body.Status
 })


 
 // @ts-ignore
 Member.save({ UserID:req.body.UserID,
    Name:req.body.Name,
    Password:req.body.Password,
    is_admin:0,
    is_trainer:0,
    Height:req.body.Height,
    Weight:req.body.Weight,
    BirthDate:req.body.BirthDate,
    Phone:req.body.Phone,
    AlternatePhone:req.body.AlternatePhone,
    Address:req.body.Address,
    email:req.body.email,
    Gender:req.body.Gender,
    Status:req.body.Status})
 .then(data=>{
    res.redirect('/dashboard/Members/add_member')
 })
 .catch(err=>{
    res.status(500).send({
        message:err.message ||"Some error occured while creating a create Operation"
    });
 })
}

// Retrieve and return all Members/retrieve and return a single user
const FindMember=async(req,res)=>{
 if(req.query.id){
    const id=req.query.id;

    User.findById(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"not found user with id" +id})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Erro retrieving user with id" +id})
    })
 }   
 else{
 User.find({is_admin:0,is_trainer:0})
 .then(user=>{
   res.send(user)
 })
 .catch(err=>{
   res.status(500).send({
       message:err.message ||" error occured while retrieving user information"
   });
})
}
}


// Update a new identified user by userid
const UpdateMember=async(req,res)=>{
   if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
}

// Delete member with specified userid
const DeleteMember=async(req,res)=>{
   const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}







module.exports={
    CreateMember,
    FindMember,
    UpdateMember,
    DeleteMember,
};