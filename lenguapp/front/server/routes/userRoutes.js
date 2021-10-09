const express= require("express")
const router = express.Router()
const fs = require('fs');

const userSchema = require('../models/user')
const db = require("../config/database")
const User = db.model("Users",userSchema)

//get all users OK
router.get("/users",async function (req,res) {
    const users = await User.find()
    res.send(users)
})

// get one user OK
router.get("/user/:userId", async function (req,res,next) {
    const user = await User.find({_id : req.params.userId})
    // moving to next route
    next()
    res.send(user)

})
 

//delete user OK
router.delete("/user/:userId", async function (req,res) {
    const user = await User.deleteOne({_id : req.params.userId})
    res.send(user)
})
//update OK
router.put("/user/:userId", async function (req,res) {
    const username = req.body.username
    const user = await User.updateOne({_id : req.params.userId}, {username : username})
    res.send(user)
})


module.exports = router