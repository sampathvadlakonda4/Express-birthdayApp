const express = require("express")
const router = express.Router();

const birthdayDetails = require("../schemas/birthday_Schema")


// get bday list
router.route("/list").get(async (req,res)=>{
    try{
        const birthdayList = await birthdayDetails.find()
        res.json(birthdayList)
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

// get bday list according to user
router.route("/list/search").post(async (req,res)=>{
    try{
        const {loginuserid} = req.body 
        if(!loginuserid){
            res.status(400)
            res.json({
                message: "loginuserid is mandatory"
            })
            throw new Error("loginuserid is mandatory")
        }
        const birthdayList = await birthdayDetails.find({loginuserid})
        if(birthdayList != ""){
            res.json(birthdayList)
        }
        else{
            res.status(204)
            res.json({
                message: "No records found"
            })
            throw new Error("No records found")
        }
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

// add new bday 
router.route("/addnew").post(async (req,res)=>{
    try{
        const {name, email, phonenumber, address, pincode, relation, dateofbirth,  loginuserid} = req.body
        if(!name || !email || !phonenumber || !address || !pincode || !relation || !dateofbirth || !loginuserid){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await birthdayDetails.find({name, loginuserid})
        if(check_for_record != ""){
            res.status(404)
            res.json({
                message: "Record already existed with this name"
            })
            throw new Error("Record already existed with this name")
        }
        const birthdayCreated_Details = await birthdayDetails.create({
            name, email, phonenumber, address, pincode, relation, dateofbirth, loginuserid
        });
        res.json(birthdayCreated_Details)
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

//update new bday
router.route("/update").post(async (req,res)=>{
    try{
        const {name, email, phonenumber, address, pincode, relation, dateofbirth,  loginuserid} = req.body
        if(!name || !email || !phonenumber || !address || !pincode || !relation || !dateofbirth || !loginuserid){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await birthdayDetails.find({name, loginuserid})
        if(check_for_record != ""){
            const birthdayUpdated_Details = await birthdayDetails.findOneAndUpdate(
                {
                    name, loginuserid
                },
                {
                    name, email, phonenumber, address, pincode, relation, dateofbirth, loginuserid
                },
                {new: true}
            );
            res.json(birthdayUpdated_Details)
        }
        else{
            res.status(404)
            res.json({
                message: "Record not found"
            })
            throw new Error("Record not found")
        }
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

module.exports = router;