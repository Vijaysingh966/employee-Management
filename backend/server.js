const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const employee = require('./routs/erouts')
require('dotenv').config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/employee',employee);
const PORT = process.env.PORT || 8080
app.get("/api/employee",(req,res)=>{
    res.send("Hello Developers")
})
app.listen( PORT,()=>{
    console.log(`Server is Running on port ${PORT}`);
    
})