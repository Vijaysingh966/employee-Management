const mongoose=require('mongoose');
 const dotenv = require('dotenv').config();
 
 const connectDB = ()=>{
    try{
        mongoose.connect(process.env.DB_STRING);
        console.log("Database is Connected");
        
    }catch(error){
            console.log('DataBase Error ',error.message);
            process.exit(1);
    }
 }

 module.exports = connectDB;