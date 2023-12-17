const mongoose = require("mongoose") 

const quizzContent = new mongoose.Schema({
    item : {type : Object, required : true},
    solution : {type : Object, required : true},
    choices : {type : Array , required : false }
})


const exerciseSchema = new mongoose.Schema({
    theme : {type : String , required : true},
    name : {type : String , required : true},
    level : {type : String }, 
    type : { type : String },
    content : [quizzContent] ,
    language : {type :String, required : true}
})


module.exports = exerciseSchema