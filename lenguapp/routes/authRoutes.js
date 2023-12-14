const express= require("express")
const router = express.Router()
const fs = require('fs');
const bcrypt = require("bcrypt");


const mongoose = require("mongoose")
const db = require("../config/database")
const UserModel = require("../models/user")


const service = require("../services/user");
const secure = require("../services/secure");

router.post("/hash",  (req,res) => {
    saltRounds = 10;
    password = req.body.password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    res.send(hash)
})

router.post("/tanks", async(req,res) => {
    const {name} = req.body
    // create model
    Tank = db.model("Tank",new mongoose.Schema({ name: String , size : String }))
    try{
        //then search
        selected = await Tank.find({name : name}) 
        if(selected){
            res = selected
        }
    }catch (e) {
        res = {message : "no no such tank"}
    }

    res.send(resp)
})
/*USER ROUTES*/
router.post("/login", service.auth)



router.post("/register", async(req,res) => {
    console.log("body ",req.body)
    const {username, password , email} = req.body
    subscribe = false

    const User = db.model("Users",UserModel)

    if(username && password && email) {
        let new_user = await User.find({email:email})
        //si pas d'users
        if(new_user.length == 0){
            try {
                //hashing
                saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                hashed_pass =  bcrypt.hashSync(password,salt);
                let new_user_info = 
                {
                    email : email,
                    password : hashed_pass,
                    username : username
                }
                try {
                    await User.create(new_user_info)
                } catch(err) {
                    //erreur de création
                    throw new Error(err);
                }
                
                //vérification
                let found_user = await User.find({email:email})
                console.log("found ",found_user)
                if(found_user.length == 0){
                    console.log("not subbed")
                }
                else {
                    subscribe = true
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    if(subscribe){
        msg = `${username} subscribed succesfully`
    }
    else {
        msg = `${username} not subscribed`
    }
    res.send(msg)
})

router.post("/forgotpassword", async ( req, res) => {
    const { email , password } = req.body;
    let User = db.model("Users",UserModel);

    let hashed_pass = secure.hash_pass(password);

    const user = await User.find({email : email});
    if (user.length === 1) {
        let result = await User.updateOne(
            { email : email },
            {
                $set : {
                   password : hashed_pass  
                }
            }
        );
        return res.status(200).json(result);
    }
    return res.status(400).json({"message" : "utilisateur non trouvé"});
})



module.exports = router