// ajout jwt 
const UserModel = require("../models/user");
const db = require("../config/database");
const User = db.model("users",UserModel);

const jwt    = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET ",SECRET_KEY)

exports.auth = async (req, res, next) => {
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
                    const expireIn = 24 * 60 * 60;
                    const token   = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });
                    

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
        return res.status(501).json(error);
    }
}