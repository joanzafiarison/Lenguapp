const { MongoGridFSStreamError } = require("mongodb")
const mongoose = require("mongoose") 

const exerciseSchema = new mongoose.model({
    theme : {type : String , required : true},
    level : {type : String , required  : true}, 
    type : { type : String , required : true},
    words : {type : Map , required : true}
})

module.exports = mongoose.model("exercise",exerciseSchema)