import axios from "axios";

function login(email,password){
     return axios.post("/login",{password : password,email:email})
}

function changePassword(email, password){
    return axios.post("/forgotpassword",{password : password, email : email})
}


function sign_up(userData){
    return axios.post("/register", userData)
    
}

function isLoggedIn(token){
    //check Token 
    // if it is OK return the user info 
    return {};
}

function logOut(){
    //delete The token
}

export {
    login,
    sign_up,
    changePassword
}