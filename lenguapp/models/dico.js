const mongoose = require("mongoose") 
// 3 languages for now
const variationSchema = new mongoose.Schema({
    usual : {type :String},
    variation : {type :Array}
})
const traductionSchema = new mongoose.Schema({
    fr : {
        word : { type : String, required : true},
        variations : [variationSchema]
    },
    jp : {
        word : { type : String, required : true},
        variations : [variationSchema]
    },
    de : {
        word : { type : String, required : true},
        variations : [variationSchema]
    },
    ch : {
        word : { type : String, required : true},
        variations : [variationSchema]
    },
    mg : {
        word : { type : String, required : true},
        variations : [variationSchema]
    },
})
const dicoSchema = new mongoose.Schema({
    word : {type : String , required : true},
    composition : { type : Array , required : false},
    type : { type : Array , required : true},
    themes  : {type : Array ,  required : false},
    audio : { type : String, required : true},
    phonetics : { type : String, required : true},
    language : { type : String, required : true},
    translation : [traductionSchema]
});

module.exports = dicoSchema