import React , {useContext,useState} from 'react';
import {Link} from "react-router-dom";
import {withContext} from "../Services/ContextWrapper"

 function Header (props){
  
        let options = {
            timeZone:"Europe/Paris",
            hour12 : false,
            hour:  "2-digit",
            minute: "2-digit",
           second: "2-digit"
         }
        
         const [time,setTime] = useState(new Date().toLocaleTimeString("fr-FR",options))
         const [connected,setConnected]=useState(true)
        console.log("CONTEXT",props.context)
        return(
            <header>
                <div id="logo">
                    <h1>Lenguapp</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/train">Train</Link>
                        </li>
                        <li>
                            <Link to="/courses">Learn</Link>
                        </li>
                        <li>
                            <Link to ="/user">Info</Link>
                        </li>
                    </ul>
                </nav>
                <div id="admin">
                    <div id="date">
                    <div className="hour">{time}</div>
                    <div className="date"></div>
                    </div>
                    <Link to ="/signin">
                        <figure className="icon_container">
                            <img src={connected ? "img/profil.png" : "img/question_mark.png"}/>
                            <p>{props.context.username}</p>
                        </figure>
                    </Link>
                </div>
            </header>
    )
}

export default withContext(Header)