const mongoose=require("mongoose");
// defining schema
const UserSchema= new mongoose.Schema(
    {
        UserID:{
            type:String,
            required:true,
            unique:true,
        },
        Name:{
            type:String,
            required:true,
        },
        Password:{
            type:String,
            required:true,
        },
        is_admin:{
            type:Number,
            required:true,
        },
        is_trainer:{
            type:Number,
            required:false,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        Gender:{
            type:String,
            required:true,
            
        },
        Status:{
            type:String,
            required:true,
        }


    }
)
//  creating models or collections
 const User =mongoose.model("User",UserSchema);

 module.exports=User;
