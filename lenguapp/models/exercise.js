const mongoose = require("mongoose") 

const exerciseSchema = new mongoose.Schema({
    theme : {type : String , required : true},
    level : {type : String , required  : true}, 
    type : { type : String , required : true},
    words : {type : Array , required : true}
})

module.exports = exerciseSchema