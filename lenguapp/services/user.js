// ajout jwt 
const UserModel = require("../models/user");
const db = require("../config/database");
const User = db.model("users",UserModel);

const jwt    = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET ",SECRET_KEY)

exports.auth =  (roles = []) => {

    if (!Array.isArray(roles)) roles = [roles];
    
    return async (req, res, next) => {
        function sendError(msg) {
          return res.status(403).json({
            message: msg,
          });
        }

        try {
            //get header token
            let token = req.headers["Authorization"] || req.headers["authorization"];

            if(!token) return sendError("no token")
            if (token.indexOf("Bearer") !== 0) return sendError("Error: Token format invalid"); // Wrong format
            console.log("verify",token)
            //verify token
            const tokenString = token.split(" ")[1];
            jwt.verify(tokenString, SECRET_KEY , (err, decodedToken) => {
                if(err){
                    //error
                    console.log("error",err)
                    sendError("Error : Broken or expired Token")
                }
                //Check role
                if(!decodedToken._doc.role) return sendError("Error : no role defined");
                const userRole = decodedToken._doc.role;
                //Check if correct Role is met
                if(roles.indexOf(userRole) === -1) return sendError("Error: User not authorized")

                req.user = decodedToken;
                next();
                

            })

        } catch (error) {
            return res.status(501).json(error);
        }
  }
}

exports.issueToken = function(user) {

    const HOURS = 1; 
    const MINUTES = 60; 
    const SECONDS = 60;
    const expiresIn = HOURS * MINUTES * SECONDS;

    var token = jwt.sign({
            ...user, 
            iss :"Node-Auth"
        }
        ,   SECRET_KEY,
        {
            expiresIn : expiresIn
        }
    )

    return token;
}

exports.Roles = {
    User: ["user"],
    Teacher: ["teacher"],
    Admin : ["admin"],
    All: ["user", "teacher", "admin"],
  };