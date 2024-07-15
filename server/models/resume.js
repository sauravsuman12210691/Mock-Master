const mongoose =require('mongoose');
const {Schema}= mongoose
const resumeSchema =new Schema({
    user:{
type :mongoose.Schema.Types.ObjectId,
ref:'user'
    },
    fileName:{
        type:String,
        required:true
    },
    Ats:{
        type:String
    },
    discription:{
        type:String,
        // required:true
    },
    
    date:{
        type:Date,
        default: Date.now()
    }

})
module.exports= mongoose.model("resume",resumeSchema);