const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String,required : true},
  email: { type: String, unique: true },
  password: { type: String, required:true },
  address : {type : String, default : null},
  token: { type: String, required : false},
  posts : {type: Array , default : null},
  friends : {type: Array , default : null},
  scores : [
   { theme : {type :String},
    exercise_type :{type:String},
    score : {type :Number},
    total : {type : Number}
   }
  ]
  
});

module.exports = userSchema