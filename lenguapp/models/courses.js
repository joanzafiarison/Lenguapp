const mongoose = require("mongoose") 

const contentSchema = new mongoose.Schema({
    words : {type : Array  , required :true}
})

const feedbackSchema = new mongoose.Schema({
    user_id : {type : Number , required :true},
    username : {type : String , required : true },
    comment : {type : String , required : true},
    date : {type : Date , default : Date.now}
})

const courseSchema = new mongoose.Schema({
    themes : {type : Array , required : true},
    name  : {type :String , required : true},
    level : {type : Number , required  : true},
    language_source: {type : String , required  : true}, 
    language_from: {type : String , required  : true}, 
    content : [contentSchema],
    feedback : [feedbackSchema]
})

module.exports = courseSchema