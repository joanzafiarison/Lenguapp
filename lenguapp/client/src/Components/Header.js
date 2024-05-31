import React , {useContext,useState} from 'react';
import { Link } from "react-router-dom";
import { useAppData, useAppDispatch } from "../Services/ContextProvider";


//Context User ou Admin 
//context Contient aussi session user & cookie
 function Header (){
        //test only
        const { user } = useAppData();
        const dispatch = useAppDispatch();

        const [isAdmin,setAdmin] = useState(true);
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
        console.log("opened",opened)
         const [time,setTime] = useState(new Date().toLocaleTimeString("fr-FR",options))
         const [connected,setConnected]=useState(true)
        console.log("CONTEXT",user)
        return(
            <header style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                <div id="logo" style={{flex:1}}>
                    <Link to="/">
                        <h1 style={{fontSize:"1.2rem",padding:"2rem"}}>Kozé</h1>
                    </Link>
                </div>
                <nav style={{flex:3}}>
                    <ul>
                        <li style={{fontSize:"0.8rem"}}>
                            <Link to="/train">Train</Link>
                        </li>
                        <li style={{fontSize:"0.8rem"}} >
                            <Link to="/courses">Learn </Link>
                        </li>
        
                        { isAdmin? 
                            (   
                                <>
                                    <li style={{fontSize:"0.8rem"}}>
                                        <Link to ="/dashboard/admin">Dashboard</Link>
                                    </li>
                                    <li style={{fontSize:"0.8rem"}}>
                                        <Link to ="/create">Create</Link>
                                    </li>
                                    <li style={{fontSize:"0.8rem"}}>
                                        <Link to ="/user">Compte</Link>
                                    </li>
                                </>
                            ):
                            (
                                <>
                                    <li style={{fontSize:"1rem"}}>
                                    <Link to ="/dashboard/user">Dashboard</Link>
                                    </li>
                                    
                                    <li style={{fontSize:"0.8rem"}}>
                                        <Link to="/register">Créer un compte</Link>
                                    </li>
                                    <li style={{fontSize:"0.8rem"}} >
                                        <Link to="/signin">Se connecter</Link>
                                    </li>
                    
                                </>
                            )
                        }

                    </ul>
                </nav>
                <div id="admin">
                    <div className='account-big'>
                        <figure onClick={()=> logout()}>
                            <Link to ="/signin">
                                <img src={connected ? "img/profil.png" : "img/question_mark.png"} style={{width:"100%"}}/>
                            </Link>
                        </figure>
                        
                        <p style={{fontSize:"0.8rem"}} >{user.username}</p>

                        <div className='switch' style={{backgroundColor: isAdmin? "green":"grey",width:"2em",height:"1em",display:"flex",justifyContent: isAdmin? "flex-start":"flex-end"}}>
                            <div onClick={()=>setAdmin(!isAdmin)} style={{backgroundColor:"black",width:"45%",height:"100%",borderRadius:20}} ></div>
                        </div>
                    </div>
                    <div className={`hamburger ${opened ? 'hamburger_open' : ''}`}>
                        <figure onClick={()=>setOpened(!opened)}>
                            <img src="img/hamburger.png"/>
                        </figure>
                        <ul className={`menu ${opened ? "menu_open" : ""}`} style={{display:opened?"block":"none"}}>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to="/train" >Train</Link>
                            </li>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to="/courses">Learn</Link>
                            </li>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to ="/user">Role</Link>
                            </li>
                            { isAdmin? 
                                (   
                                    <>
                                        <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                            <Link to ="/dashboard/admin">Dashboard</Link>
                                        </li>
                                        <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                            <Link to ="/create">Creer</Link>
                                        </li>
                                        <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                            <Link to ="/user">Compte</Link>
                                        </li>
                                    </>
                                ):
                                (
                                    <>
                                        <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                        <Link to ="/dashboard/user">Dashboard</Link>
                                        </li>
                                        <li style={{fontSize:"1rem"}}>
                                        <Link to ="/dashboard/user">Dashboard</Link>
                                        </li>
                                        <li style={{fontSize:"0.8rem"}}>
                                            <Link to="/register">Créer un compte</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </header>
    )
}

export default Header