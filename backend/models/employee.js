const mongoose = require('mongoose');
const { type } = require('os');


const employeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    department:String,
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    }
})

module.exports = mongoose.model("Employee",employeeSchema);