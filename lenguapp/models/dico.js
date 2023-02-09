const mongoose = require("mongoose") 
// 3 languages for now
const variationSchema = new mongoose.Schema({
    usual : {type :String},
    variation : {type :Array}
})
const traductionSchema = new mongoose.Schema({
    eng : [variationSchema],
    de : [variationSchema],
    fr : [variationSchema]
})
const dicoSchema = new mongoose.Schema({
    word : {type : String , required : true},
    language : {type : String ,required : true },
    traduction : [traductionSchema]
})

module.exports = dicoSchema