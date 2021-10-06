const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required : true},
  username: { type: String,required : true},
  email: { type: String, unique: true },
  address : {type : String, default : null},
  password: { type: String, required:true },
  token: { type: String, required : true},
  posts : {type: Number , default : null},
  friends : {type: Number , default : null},
  scores : {type: Number , default : null}
});

module.exports = mongoose.model("user", userSchema);