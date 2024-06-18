const express= require("express")
const router = express.Router()
const fs = require('fs');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

const mongoose = require("mongoose")
const db = require("../config/database")
const UserModel = require("../models/user")
const User = db.model("users",UserModel);


const service = require("../services/user");
const secure = require("../services/secure");


const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: 'your-email-username',
        pass: 'your-email-password',
    },
});

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

    res.send(res)
})
/*USER ROUTES*/
router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try {
        
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');
        console.log("user found ",user)
     
        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;
                    console.log("response",response)
                    
                    let token = service.issueToken(user);

                    return res.header('Authorization', 'Bearer ' + token).status(200)
                            .json({
                                'message' : 'good credentials',
                                'user_id' : user._doc._id,
                                'username' : user._doc.username
                                
                            });
                }

                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        console.log(error)
        return res.status(501).json(error);
    }
})



router.post("/register", async(req,res) => {
    console.log("body ",req.body)
    const {username, password , email} = req.body
    let msg = `${username} not subscribed`;


    if(username && password && email) {
        let new_user = await User.find({email:email})
        //si pas d'users
        if(new_user.length == 0){
            try {
                //hashing
                
                hashed_pass =  secure.hash_pass(password)
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
                    const token = service.issueToken(found_user);
                    msg = `${username} subscribed succesfully`
                    //send Verif email
                    const mailOptions = {
                        from: 'joanzafdev@gmail.com',
                        to: found_user.email,
                        subject: 'Confirm your email address',
                        text: `Click on this link to verify your email: http://localhost:5000/verify?token=${token}`,
                    };
                
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send('Error sending verification email.');
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.send('Verification email sent.');
                        }
                    });
                    //res.status(200).json({ ...found_user, token });
                    
                }
            }
            catch (e) {
                res.send(msg)
            }
        }
    }
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