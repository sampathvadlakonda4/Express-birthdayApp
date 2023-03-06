const mongoose = require("mongoose")

const connect_To_Db = async ()=>{
try{
    const connect = await mongoose.connect("mongodb+srv://sampathvadlakonda4:sampath@cluster0.jq9wscs.mongodb.net/birthdayapp?retryWrites=true&w=majority")
    console.log("Database connected",connect.connection.host, connect.connection.name)
}
catch(err){
    console.log(err);
    process.exit(1)
}
}

module.exports = connect_To_Db