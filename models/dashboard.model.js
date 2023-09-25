const mongoose = require("mongoose");

const dashSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String ,enum:["Tech", "Marketing", "Operations"],require:true},
    salary:{type:Number,required:true},
},{
    versionKey:false
})


const DashModel = mongoose.model("employees",dashSchema);

module.exports={DashModel};