const jwt = require("jsonwebtoken");

exports.auth = ( req,res ,next) => {
    
    //si req.headers.authorization 
    if( req.headers.authorization != ""){
        const token = req.headers.authorization.split(' ')[1];
        let user = jwt.decode(token);
        console.log("userDecoded",user)
        if(user.userToken == req.body.userToken){
            return res.status(200).json({message :"ok token"})
        }
        else {
            return res.status(400).json({message : "errreur"})
        }
    }
}