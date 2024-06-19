import React , {useContext,useState} from 'react';
import { Link } from "react-router-dom";
import { useAppData, useAppDispatch } from "../Services/ContextProvider";
import Nav from "./Nav";


//Context User ou Admin 
//context Contient aussi session user & cookie
 function Header (){
        //test only
        const { user } = useAppData();
        const dispatch = useAppDispatch();

        const [opened,setOpened] = useState(false);
        let options = {
            timeZone:"Europe/Paris",
            hour12 : false,
            hour:  "2-digit",
            minute: "2-digit",
           second: "2-digit"
         }
        function logout(){
            localStorage.setItem("auth_token","")
            dispatch({
                "user" : {
                    token : "",
                    user_id : "" ,
                    username : "",
                },
                "type" : "UPDATE_USER"
            })
            //Update Storage
        }
        console.log("user",user)
         const [time,setTime] = useState(new Date().toLocaleTimeString("fr-FR",options))
         const [connected,setConnected]=useState(true)
        console.log("CONTEXT",user)
        return(
            <header style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
                <div id="logo" style={{flex:1}}>
                    <Link to="/">
                        <h1 style={{fontSize:"1.2rem",padding:"2rem"}}>Kozé</h1>
                    </Link>
                </div>
                <Nav/>
            </header>
    )
}

export default Header