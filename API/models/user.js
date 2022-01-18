const mongoose = require("mongoose");
const bcrypt=require ('bcryptjs');

const userScema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    birthday:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('user',userScema)