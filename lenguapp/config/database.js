const mongoose = require("mongoose")

require('dotenv').config();

const mongo_uri = process.env.MONGO_URI


const connexion =  mongoose.createConnection(mongo_uri)


module.exports = connexion