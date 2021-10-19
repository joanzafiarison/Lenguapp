import React from "react"
import axios from "axios"


export default class UserProfile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            info : {},
            user_id : "61657b8703b3bb47dc848f3d"
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/user/${this.state.user_id}`).then( (resp) => {
            this.setState({info : resp.data[0]})
        })
    }
    render() {
        const {info} = this.state
        console.log(this.state.info)
        return(
            <div id="user_admin" className="mainElement" >
                <div className="meta_info">
                
                    <h1>Mon Compte</h1>
                    <p>Nom : {info.username}</p>
                    <p>E-mail : {info.email}</p>
                </div>
                <div className="performance">
                    <p>Score : </p>
                    {info.scores != null ?
                        <ul>
                        {info.scores.map((score)=>(
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
                    {info.friends != null ?
                        <ul>
                        {info.friends.map((friend)=>(
                            <li>Matricule N * :{friend}</li>
                        ))}
                        </ul>
                        :
                        <ul>
                            <p>Pas d'amis pour le moment</p>
                        </ul>
                    }
                    <p>Posts : </p>
                    {info.posts != null ?
                        <ul>
                        {info.posts.map((post)=>(
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
}