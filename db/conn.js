const mongoose=require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://matedevang532003:DJMATE2003@cluster0.wld7ojm.mongodb.net/BuildAims-FitnessZone?retryWrites=true&w=majority',
    (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("successfully connected")
        }
    });
}






