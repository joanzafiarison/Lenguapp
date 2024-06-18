const mongoose = require("mongoose")

require('dotenv').config();//{path: '../.env'}

const mongo_uri = process.env.MONGO_URI

console.log("mongo uri", mongo_uri)

const connexion =  mongoose.createConnection(mongo_uri)


module.exports = connexion