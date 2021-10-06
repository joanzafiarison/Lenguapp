const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id : { type : Number , required : true},
    content : { type : String, required : true},
    attachment : {type : Map, default: {}},
    likes : {type : Array , default : []},
    comment : { type : Map , default : {}}
})

module.exports = mongoose.model("post", postSchema)