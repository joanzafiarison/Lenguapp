const mongoose = require("mongoose") 

const contentSchema = new mongoose.Schema({
    title : {type : String , required : true},
    content : {type : String , required : true},
})

const feedbackSchema = new mongoose.Schema({
    user_id : {type : Number , required :true},
    username : {type : String , required : true },
    comment : {type : String , required : true},
    date : {type : Date , default : Date.now}
})

const courseSchema = new mongoose.Schema({
    theme : {type : String , required : true},
    name  : {type :String , required : true},
    level : {type : String , required  : true},
    language : {type : String , required  : true}, 
    from : {type : String , required  : true},
    content : [contentSchema],
    feedback : [feedbackSchema]
})

module.exports = courseSchema