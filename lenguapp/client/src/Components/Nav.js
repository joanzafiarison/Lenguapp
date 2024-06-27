import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useAppData, useAppDispatch } from "../Services/ContextProvider";

export default function Nav () {
    const { user } = useAppData();
    const [opened, setOpened] = useState(false);
    return (
      <nav style={{flex :2}}>
            <figure className={`hamburger ${ opened ?  'hamburger_open' : ''}`} onClick={()=>setOpened(!opened)}>
                <img src="img/hamburger.png"/>
            </figure>
            <ul className={`menu ${ opened ?  'menu_open' : ''}`} >
                <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                    <Link to="/train" >Train</Link>
                </li>
                <li className="menu_link"   onClick={()=>setOpened(!opened)}>
                    <Link to="/courses">Learn</Link>
                </li>
                { user.role ==="teacher" && user.isLoggedIn ? 
                    (   
                        <>
                            <li className="menu_link" onClick={()=>setOpened(!opened)} >
                                <Link to ="/dashboard/admin">Dashboard</Link>
                            </li>
                            <li className="menu_link" onClick={()=>setOpened(!opened)} >
                                <Link to ="/create">Creer</Link>
                            </li>
                            <li className="menu_link" onClick={()=>setOpened(!opened)} >
                                <Link to ="/user">Compte</Link>
                            </li>
                        </>
                    ): null
                }
                { user.role ==="user" && user.isLoggedIn ? 
                    (   
                        <>
                            <li className="menu_link" onClick={()=>setOpened(!opened)} >
                                <Link to ="/dashboard/user">Dashboard</Link>
                            </li>
                            <li className="menu_link" onClick={()=>setOpened(!opened)} >
                                <Link to ="/user">Compte</Link>
                            </li>
                        </>
                    ): null
                }
                { !user.isLoggedIn ? 
                    (
                        <>
                            <li className="menu_link" onClick={()=>setOpened(!opened)}>
                                <Link to="/register">Créer un compte</Link>
                            </li>
                            <li className="menu_link" onClick={()=>setOpened(!opened)}>
                                <Link to="/signin">Se connecter</Link>
                            </li>
                        </>
                    ):null
                }
            </ul>
      </nav>
    )
}
