const mongoose = require("mongoose") 
// 3 languages for now

const dicoSchema = new mongoose.Schema({
    word : {type : String , required : true},
    word_id : {type : String},
    definition : {type : String},
    composition : { type : Array },
    type : { type : Array , required : true},
    themes  : {type : Array },
    attachment: { type : Object },
    phonetics : { type : String },
    lang : { type : String, required : true},
});

module.exports = dicoSchema