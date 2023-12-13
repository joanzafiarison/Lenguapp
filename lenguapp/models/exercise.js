const mongoose = require("mongoose") 

const exerciseSchema = new mongoose.Schema({
    theme : {type : String , required : true},
    level : {type : String }, 
    type : { type : String },
    words : {type : Array , required : true},
    language : {type :String, required : true}
})

module.exports = exerciseSchema