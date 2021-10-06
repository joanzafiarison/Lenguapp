const express= require("express")
const router = express.Router()
const fs = require('fs');

/*USER ROUTES*/
router.post("/connect", (req,res) => {
    //if first connexion no cookie , give him cookie
    //cookie attached to user (act like a token)
    res.send("attempting to connect")
})

//create a user
router.get("/user/create", function (req,res) {
    let user = { 
        id : '42',
        name: 'Joan',
        age: 25, 
        gender: 'Male',
        password :'SkuSku', 
        identifiant :'BendoFlakes'
    };
    //give cookie, at first connection
    // to rewrite => JSON.parse(file_read) 
    // append a data 
    //and write it
    //status pending?
    let data = JSON.stringify(user);
    fs.writeFileSync('./public/pending.json', data);
    res.send(data)
})

router.get("/user/confirm", function (req,res) {
    let user = { 
        id : '42',
        name: 'Joan',
        age: 25, 
        gender: 'Male',
        password :'SkuSku', 
        identifiant :'BendoFlakes'
    };
    
    let data = JSON.stringify(user);
    fs.writeFileSync('./public/pending.json', data);
    res.send(data)
})

module.exports = router