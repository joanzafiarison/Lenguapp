const bcrypt = require("bcrypt");
    
function hash_pass(password){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashed_pass =  bcrypt.hashSync(password,salt);
    return hashed_pass;
}

module.exports = {
    hash_pass
}
