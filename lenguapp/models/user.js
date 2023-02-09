const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    type :{ type: String,required : true},
    score :{ type: Number,required : true},
    total:{ type: Number,required : true},
    language:{ type: String,required : true},
    theme:{ type: String,required : true},
    datetime:{type : Date , default : Date.now}
})
const userSchema = new mongoose.Schema({
  username: { type: String,required : true},
  email: { type: String, unique: true },
  password: { type: String, required:true },
  token: { type: String, required : false},
  posts : {type: Array , default : null},
  friends : {type: Array , default : null},
  scores : [scoreSchema]
  
});

module.exports = userSchema