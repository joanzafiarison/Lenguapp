import React from "react"
import axios from "axios"


export default class UserProfile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user_id : 2,
            info : {}
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/user/${this.state.user_id}`).then( (resp) => {
            this.setState({info : resp.data})
        })
    }
    render() {
        const {info} = this.state
        console.log(this.state.info)
        return(
            <div id="user_admin">
                <div className="meta_info">
                
                    <h1>Mon Compte</h1>
                    <p>{info.name}</p>
                    <p>{info.email}</p>
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
                        null
                        
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
                        null
                    }
                    <p>Posts : </p>
                    {info.posts != null ?
                        <ul>
                        {info.posts.map((post)=>(
                            <li>Publication N * :{post}</li>
                        ))}
                        </ul>
                        :
                        null
                    }
                </div>
            
                
            </div>
        )
    }
}