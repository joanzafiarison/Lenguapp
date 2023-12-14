const express= require("express")
const router = express.Router()
const fs = require('fs');
const bcrypt = require("bcrypt")

const auth = require("../middleware/auth");
const userSchema = require('../models/user')
const db = require("../config/database")
const User = db.model("Users",userSchema)

//get all users OK
router.get("/users",async function (req,res) {
    console.log("hello")
    const users = await User.find()
    res.send(users)
})

// get one user OK
router.get("/user/:userId",  async function (req,res,next) {
    const user = await User.find({_id : req.params.userId})
    delete user[0]._doc.password;// moving to next route
    res.send(user)

})
 

//delete user OK
router.delete("/user/:userId", async function (req,res) {
    const user = await User.deleteOne({_id : req.params.userId})
    res.send(user)
})
//update OK
router.put("/user/:userId", async function (req,res) {
    const {username,email,password,scores,friends} = req.body
    console.log(req.body)
    user = {}
    saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    hashed_pass =  bcrypt.hashSync(password,salt);
    try {
        const user = await User.updateOne({_id : req.params.userId}, 
            {$set: {
               username : username,
               email :email,
               password :hashed_pass,
               scores : scores ,
               friends: friends
            }
        })
        .then((res)=> console.log(res))
        .catch((e) => console.log(e))
    }
    catch {
        console.log(e)
    }
    
    res.send(user)
})


module.exports = router