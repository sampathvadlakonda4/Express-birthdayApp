const mongoose = require("mongoose");

const userList = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email:{
        type: String,
        required: [true, "Please add email"]
    },
    phonenumber:{
        type: String,
        required: [true, "Please add phonenumber"]
    },
    address:{
        type: String,
        required: [true, "Please add address"]
    },
    pincode:{
        type: String,
        required: [true, "Please add pincode"]
    },
    password:{
        type: String,
        required: [true, "Please add password"]
    },
    gender:{
        type: String,
        required: [true, "Please add gender"]
    },
    country:{
        type: String,
        required: [true, "Please add country"]
    },
    profilepic:{
        type: Object,
    },
},
{
    timestamps: true
})

const userList_Model = mongoose.model("userList",userList)
module.exports = userList_Model;