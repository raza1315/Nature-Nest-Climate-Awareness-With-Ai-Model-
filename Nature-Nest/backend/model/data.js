const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        default:"You"
    },
    airScore:{
        type:Number,
        default:0
    },
    seaScore:{
        type:Number,
        default:0
    },
    carbonScore:{
        type:Number,
        default:0
    },
    earthScore:{
        type:Number,
        default:0
    },
})
const data=mongoose.model("Data",dataSchema);
module.exports=data;