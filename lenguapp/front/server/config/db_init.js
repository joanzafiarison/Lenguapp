const mongoose = require("mongoose")
//connection
connexion = require("./database")

//usage d'un model
const Tank= connexion.model('Tank', new mongoose.Schema({ name: String , size : String }));

// création ou autre
Tank.create({name :'T-800', size: 'small' }, function (err, small) {
    if (err) return handleError(err);
    // saved!
  });

  //recherche
Tank.find({size : 'small'}).then(console.log)

