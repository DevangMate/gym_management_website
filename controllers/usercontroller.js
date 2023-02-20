const User =require("../models/user");
var session=require('express-session')

const verifyLogin= async(req,res)=>{
    try {
        const UserID=req.body.UserID;
        const Password=req.body.Password;

        const Userdata=await User.findOne({UserID:UserID});
        // req.session.user_id= Userdata?.UserID;
        // req.session.user_id=req.session.sessionuserid;
        if (Userdata?.Password== Password) {    
            const sessionuserid= Userdata?._id;
            req.session.user_id=sessionuserid;
            req.session.is_admin=Userdata?.is_admin;
            req.session.is_trainer=Userdata?.is_trainer;
            
            if(Userdata?.is_admin==1) {
                
                res.status(201).redirect("/dashboard");
            }
            else if(Userdata?.is_trainer==1){
                res.status(201).redirect("/trainerdashboard")
            }
            else if(Userdata?.is_admin==0 && Userdata?.is_trainer==0){
                res.status(201).redirect("/userdashboard")
            }
            
           
            
            
        } else {
            res.render("login",{message:"invalid userID"})
        }

    } catch (error) {
        res.status(400).send(error.message)
            
    }
}

const loadDashboard= async(req,res)=>{
    try {
        res.render('dashboard');
    } catch (error) {
        console.log(error.message);
    }
}
const loaduserDashboard= async(req,res)=>{
    try {
        const userData= await User.findById({_id:req.session.user_id});
        res.render('userdashboard',{user:userData});
    } catch (error) {
        console.log(error.message);
    }
} 
const loadtrainerDashboard= async(req,res)=>{
    try {
        res.render('trainerdashboard');
    } catch (error) {
        console.log(error.message);
    }
}



const logout =async(req,res)=>{
    try {
        
        req.session.destroy();

        res.redirect('/login');
    } catch (error) {
        console.log(error.message)
    }

}



module.exports={
    verifyLogin,
    loadDashboard,
    loaduserDashboard,
    loadtrainerDashboard,
    logout
    
};