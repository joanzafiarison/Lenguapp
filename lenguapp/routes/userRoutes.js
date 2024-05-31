const express= require("express")
const router = express.Router()
const fs = require('fs');
const bcrypt = require("bcrypt")

const auth = require("../services/user");
const secure = require("../services/secure");
const userSchema = require('../models/user')
const db = require("../config/database")
const User = db.model("Users",userSchema)

// get one user OK
router.get("/user/:userId", auth.auth(auth.Roles.All), async function (req,res,next) {
    const user = await User.find({_id : req.params.userId})
    delete user[0]._doc.password;// moving to next route
    res.send(user)

})
 
//delete user OK
router.delete("/user/:userId", auth.auth(auth.Roles.Admin), async function (req,res) {
    const user = await User.deleteOne({_id : req.params.userId})
    res.send(user)
})

//update OK
router.put("/user/:userId",auth.auth(auth.Roles.Admin), async function (req,res) {
    const {username,email,password,scores,friends} = req.body
    console.log(req.body)
    hashed_pass =  secure.hash_pass(password);
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
        res.send("User updated")
    }
    catch {
        console.log(e)
    }
    
    res.send("Error")
})


module.exports = router