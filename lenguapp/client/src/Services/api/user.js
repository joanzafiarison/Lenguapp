import axios from "axios";

let base_url = process.env.REACT_APP_BASE_URL;
let USER_URL = base_url+'/user/';

export async function getUserData(user){
    return await axios.get(USER_URL+''+user.user_id, { headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
    }})
}