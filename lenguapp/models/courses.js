const mongoose = require("mongoose") 

const contentSchema = new mongoose.Schema({
    type : {type : String  , required :true},
    content : {type : Object, required : true},//3 content :Word/sound/Writing -- andyousay --building
});

const feedbackSchema = new mongoose.Schema({
    user_id : {type : Number , required :true},
    username : {type : String , required : true },
    comment : {type : String , required : true},
    date : {type : Date , default : Date.now}
});

const courseSchema = new mongoose.Schema({
    theme : {type : String, required : true},
    type : {type : String, required : true},
    name  : {type :String , required : true},
    level : {type : String , required  : true},
    lang_src: {type : String , required  : true}, 
    lang_dest: {type : String , required  : true},
    content : [contentSchema],
    feedback : [feedbackSchema]
})

module.exports = courseSchema