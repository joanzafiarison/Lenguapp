const express= require("express")
const router = express.Router()
const fs = require('fs');

/*USER FRIENDS*/
//id des amis de l'user
router.get("/user/:userId/friends",function (req,res){
    let rawdata = fs.readFileSync('./public/users.json');
    let users = JSON.parse(rawdata);
    selected = "no such user"
    for (user of users ) {
        if (user["id"] == req.params.userId){
            selected = user
        }
    }
    res.send(selected["friends"])
})

//add friend
router.post("/user/:userId/friend",function (req,res){

})

//delete friend 
router.delete("/user/:userId/friend",function (req,res){
    
})

//block friend , invite , mute etc...
router.post("/user/:userId/friend/action",function (req,res){
    
})

module.exports = router