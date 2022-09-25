const mongoose=require("mongoose");
// defining schema
const UserSchema= new mongoose.Schema(
    {
        UserID:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true,
        },
        is_admin:{
            type:Number,
            required:true,
        }
    }
)
//  creating models or collections
 const User =mongoose.model("User",UserSchema);

 module.exports=User;
