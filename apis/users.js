const express = require("express")
const router = express.Router()

const userList = require("../schemas/userList")

//get user list
router.route("/list").get(async (req,res)=>{
    try{
        const users = await userList.find()
        res.json(users)
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

// add new user or signup
router.route("/signup").post(async (req,res)=>{
    try{
        const {username, email, phonenumber, address, pincode, password} = req.body
        if(!username || !email || !phonenumber || !address || !pincode || !password){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await userList.find({email})
        if(check_for_record != ""){
            res.status(404)
            res.json({
                message: "Record already existed with this email"
            })
            throw new Error("Record already existed with this email")
        }
        const userDetails = await userList.create({username, email, phonenumber, address, pincode, password});
        res.json(userDetails)
    }
    catch(err){
        res.status(400)
        throw new Error(err)
    }
})

//update user
router.route("/update").post(async (req,res)=>{
    try{
        const {username, email, phonenumber, address, pincode, password} = req.body
        if(!username || !email || !phonenumber || !address || !pincode || !password){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await userList.find({email})
        if(check_for_record != ""){
            const userUpdated_Details = await userList.findOneAndUpdate(
                {
                    email
                },
                {username, email, phonenumber, address, pincode, password},
                {new: true}
            );
            res.json(userUpdated_Details)
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

// search in userList
router.route("/search").post(async (req,res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await userList.find({email, password})
        if(check_for_record != ""){
            res.json(check_for_record)
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

// change or forgot password
router.route("/checkforuser").post(async (req,res)=>{
    try{
        const {email} = req.body
        if(!email){
            res.status(400)
            res.json({
                message: "Email is mandatory"
            })
            throw new Error("Email is mandatory")
        }
        const check_for_record = await userList.find({email})
        if(check_for_record != ""){
            res.json(check_for_record)
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

// change or forgot password
router.route("/updatepassword").post(async (req,res)=>{
    try{
        const {email, password } = req.body
        if(!email || !password){
            res.status(400)
            res.json({
                message: "All fields are mandatory"
            })
            throw new Error("All fields are mandatory")
        }
        const check_for_record = await userList.find({email})
        if(check_for_record != ""){
            const userUpdated_Details = await userList.findOneAndUpdate(
                {
                    email
                },
                {...check_for_record, ...req.body},
                {new: true}
            );
            res.json(userUpdated_Details)
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
module.exports = router