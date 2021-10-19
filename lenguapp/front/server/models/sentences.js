const mongoose = require("mongoose")

// nested or subdocument? here nested
const sentenceModel = new mongoose.Schema({
    sentence : {type : String , required : true},
    language : {type :String, required : true},
    traductions : {
        fr : String,
        eng : String,
        de : String
    }
})

module.exports = sentenceModel

