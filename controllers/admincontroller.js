const Admin =require("../models/admin");


const verifyLogin= async(req,res,next)=>{
    try {
        const UserID=req.body.UserID;
        const Password=req.body.Password;

        const Userdata=await Admin.findOne({UserID:UserID});
        if (Userdata?.Password== Password) {
            res.status(201).redirect("dashboard")
            
            
        } else {
            res.render("login",{message:"invalid userID"})
        }

    } catch (error) {
        res.status(400).send("invalid login details")
            
    }
}

const loadDashboard= async(req,res)=>{
    try {
        res.render('dashboard');
    } catch (error) {
        console.log(error.message);
    }
}
module.exports={
    verifyLogin,
    loadDashboard
};