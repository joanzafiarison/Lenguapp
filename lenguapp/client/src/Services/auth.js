import axios from "axios";

function login(email,password){
     return axios.post("http://localhost:5000/login",{password : password,email:email})
}


function sign_up(userData){
    return axios.post("http://localhost:5000/register", userData)
    
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
    sign_up
}