import React , {useEffect,useContext,useState} from "react"
import axios from "axios"
import { withContext } from "../Services/ContextWrapper"


 function UserProfile(props){
    const [userInfo,setUserInfo] = useState({})
        
    console.log("context",props.context)
    useEffect( () => {
        //Récupérer un cookie ou localstorage
        axios.get(`http://localhost:5000/user/${props.context[0].user_id}`).then( (resp) => {
            setUserInfo(resp.data[0])
        }).catch((err) => console.log(err))
        console.log("useEffect")
    },[])
    
    console.log("user info")
    console.log(userInfo)
    return(
            <div id="user_admin" className="mainElement" >
                <div className="meta_info">
                
                    <h1>Mon Compte</h1>
                    <p>Nom : {props.context.username}</p>
                    <p>E-mail : {props.context.mail}</p>
                </div>
                <div className="performance">
                    <p>Score : </p>
                    {userInfo.scores != null ?
                        <ul>
                        {userInfo.scores.map((score)=>(
                            <ul>
                                <li>score : {score.score}/{score.total}</li>
                                <li>theme : {score.theme}</li>
                                <li>langage : anglais </li>
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


export default withContext(UserProfile)