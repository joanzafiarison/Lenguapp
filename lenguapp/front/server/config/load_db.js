const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const userModel = require("../models/user")
const postModel = require("../models/post")
const exerciseModel = require("../models/exercise")

//connection
connexion = require("./database")


const db_infos = [
  {
    db_name : "Users",
    db_schema : userModel, 
    db_source : "../public/users.json"
  },
  {
    db_name : "Exercises",
    db_schema : exerciseModel, 
    db_source : "../public/exercises.json"
  },
  {
    db_name : "Posts",
    db_schema : postModel, 
    db_source : "../public/posts.json"
  }

]


 function populate(dbs){
  for(info of dbs){
    let Collection = connexion.model(info.db_name,info.db_schema)
    let objects = Collection.find()
    if(objects.length == 0) {
      let rawdata = fs.readFileSync(path.join(__dirname,info.db_source));
      let data_list = JSON.parse(rawdata);
      console.log(info.db_name)
      console.log(data_list)
      Collection.insertMany(data_list)
      .then(function(){
        console.log(info.db_name+" : Data inserted")  // Success
      })
      .catch(function(error){
        console.log(error)      // Failure
    });
    }
    
  }
} 


populate(db_infos)