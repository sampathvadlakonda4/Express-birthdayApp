const mongoose = require('mongoose');

const birthdayDetails = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add name"]
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
    relation:{
        type: String,
        required: [true, "Please add relation"]
    },
    dateofbirth:{
        type: String,
        required: [true, "Please add dateofbirth"]
    },
    loginuserid:{
        type: String,
        required: [true, "Please add loginuserid"]
    }
},
{timestamps: true}
);

const birthdayDetails_Model = mongoose.model("birthdayDetails",birthdayDetails)

module.exports = birthdayDetails_Model