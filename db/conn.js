const mongoose=require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/BuildAims-FitnessZone',
    (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("successfully connected")
        }
    });
}






