const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id : { type : Number , required : true},
    content : { type : String, required : true},
    attachments : {type : Map, default: {}},
    likes : {type : Array , default : []},
    comment : { type : Map , default : {}},
    date : {type : Date , default : Date.now}
})

module.exports = postSchema