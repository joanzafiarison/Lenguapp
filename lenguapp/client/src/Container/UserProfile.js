import React , {useEffect, useState} from "react";
import axios from "axios";
import { useAppData } from "../Services/ContextProvider";


 function UserProfile(props){
    const [userInfo,setUserInfo] = useState({})
    const { user } = useAppData();
    console.log("context",user)
    useEffect( () => {
        //Récupérer un cookie ou localstorage
        axios.get(`http://localhost:5000/user/${user.user_id}`, { headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        }}).then( (resp) => {
            setUserInfo(resp.data[0])
        }).catch((err) => console.log(err))
        console.log("useEffect")
    },[])
    
    console.log(userInfo)
    return(
            <div id="user_admin" className="mainElement" >
                <div className="meta_info">
                
                    <h1>Mon Compte</h1>
                    <p>Nom : {user.username}</p>
                    <p>E-mail : {userInfo.email}</p>
                    <p>Role : {userInfo.role}</p>
                </div>
                <div className="performance">
                    <p>Score : </p>
                    {userInfo.scores != null ?
                        <ul>
                        {userInfo.scores.map((score)=>(
                            <ul>
                                <li>score : {score.score}/{score.total}</li>
                                <li>theme : {score.theme}</li>
                                <li>langage : {score.language} </li>
                                <li>type :  {score.exercise_type}</li>
                            </ul>
                         ))}
                         </ul>
                        :
                        <ul>
                            <p>Pas de scores pour le moment</p>
                        </ul>
                        
                    }
                </div>

                <div className="social">
                    <p>Amis : </p>
                    {userInfo.friends != null ?
                        <ul>
                        {userInfo.friends.map((friend)=>(
                            <li>Matricule N * :{friend}</li>
                        ))}
                        </ul>
                        :
                        <ul>
                            <p>Pas d'amis pour le moment</p>
                        </ul>
                    }
                    <p>Posts : </p>
                    {userInfo.posts != null ?
                        <ul>
                        {userInfo.posts.map((post)=>(
                            <li>Publication N * :{post}</li>
                        ))}
                        </ul>
                        :
                        <ul>
                            <p>Pas de Publication pour le moment</p>
                        </ul>
                    }
                </div>
            
                
            </div>
        )
    
}


export default UserProfile