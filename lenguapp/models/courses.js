const mongoose = require("mongoose") 

const contentSchema = new mongoose.Schema({
    word : {type : String  , required :true},
    translation : {type : String, required : true},
    phonetic : {type : String},
    path : {type: String}
});

const feedbackSchema = new mongoose.Schema({
    user_id : {type : Number , required :true},
    username : {type : String , required : true },
    comment : {type : String , required : true},
    date : {type : Date , default : Date.now}
});

const courseSchema = new mongoose.Schema({
    theme : {type : String, required : true},
    name  : {type :String , required : true},
    level : {type : Number , required  : true},
    language_to: {type : String , required  : true}, 
    language_from: {type : String , required  : true}, 
    content : [contentSchema],
    feedback : [feedbackSchema]
})

module.exports = courseSchema