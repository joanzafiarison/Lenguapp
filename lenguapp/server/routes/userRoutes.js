const express= require("express")
const router = express.Router()
const fs = require('fs');


//get all users
router.get("/users", function (req,res) {
    let rawdata = fs.readFileSync('./public/users.json');
    let user = JSON.parse(rawdata);
    res.send(user)
})

// get one user
router.get("/user/:userId", function (req,res,next) {
    let rawdata = fs.readFileSync('./public/users.json');
    let users = JSON.parse(rawdata);
    selected = "no such user"
    for (user of users ) {
        if (user["id"] == req.params.userId){
            selected = user
        }
    }
    // moving to next route
    next()
    res.send(selected)

})


//delete user
router.delete("/user/:userId", function (req,res) {

})

router.put("/user/:userId", function (req,res) {

})


module.exports = router