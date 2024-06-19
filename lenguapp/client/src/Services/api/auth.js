import axios from "axios";

let base_url = process.env.REACT_APP_BASE_URL;

function login(email,password){
     return axios.post(base_url+"/login",{password : password,email:email})
}

function changePassword(email, password){
    return axios.post(base_url+"/forgotpassword",{password : password, email : email})
}


function sign_up(userData){
    return axios.post(base_url+"/register", userData)
    
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