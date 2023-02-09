import axios from "axios";

function login(email,password){
     return axios.post("http://localhost:5000/login",{password : password,email:email})
}


function sign_up(email,password,username){
    return axios.post("http://localhost:5000/register",{username : username,password : password,email:email})
    
}


export {
    login,
    sign_up
}