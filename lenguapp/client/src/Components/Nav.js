import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useAppData, useAppDispatch } from "../Services/ContextProvider";

export default function Nav () {
    const { user } = useAppData();
    const [opened, setOpened] = useState(false);
    return (
      <nav >
            <figure className={`hamburger ${ opened ?  'hamburger_open' : ''}`} onClick={()=>setOpened(!opened)}>
                <img src="img/hamburger.png"/>
            </figure>
            <ul className={`menu ${ opened ?  'menu_open' : ''}`} >
                <li className="menu_link"  >
                    <Link to="/train" >Train</Link>
                </li>
                <li className="menu_link"  >
                    <Link to="/courses">Learn</Link>
                </li>
                <li className="menu_link"  >
                    <Link to ="/user">Role</Link>
                </li>
                { user ? 
                    (   
                        <>
                            <li className="menu_link"  >
                                <Link to ="/dashboard/admin">Dashboard</Link>
                            </li>
                            <li className="menu_link"  >
                                <Link to ="/create">Creer</Link>
                            </li>
                            <li className="menu_link"  >
                                <Link to ="/user">Compte</Link>
                            </li>
                        </>
                    ):
                    (
                        <>
                            <li className="menu_link">
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
      </nav>
    )
}
