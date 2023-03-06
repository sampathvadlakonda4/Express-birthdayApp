const express = require("express")
const cors = require("cors")
const connect_To_Db = require("./dbconnection/dbconnection")

const app =  express()
app.use(express.json())
app.use(cors())
connect_To_Db();

app.use("/users",require("./apis/users"))
app.use("/birthday",require("./apis/birthdaylists"))
const port = 4000;
app.listen(port,()=>{
    console.log("server running at port " + port);
})