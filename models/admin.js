const mongoose=require("mongoose");
// defining schema
const AdminSchema= new mongoose.Schema(
    {
        UserID:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true,
        }
    }
)
//  creating models or collections
 const Admin =mongoose.model("Admin",AdminSchema);

 module.exports=Admin;
