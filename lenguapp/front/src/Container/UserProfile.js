import React , {useEffect,useContext,useState} from "react"
import axios from "axios"
import { withContext } from "../Services/ContextWrapper"


 function UserProfile(props){
    const [userInfo,setUserInfo] = useState({})
        
    
    useEffect( () => {
        axios.get(`http://localhost:5000/user/${props.context.user_id}`).then( (resp) => {
            setUserInfo(resp.data[0])
        })
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
                                <li>{score.score}/{score.total}</li>
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