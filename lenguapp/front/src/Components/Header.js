import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component{
    constructor(props){
        super(props)
        let options = {
            timeZone:"Europe/Paris",
            hour12 : false,
            hour:  "2-digit",
            minute: "2-digit",
           second: "2-digit"
         }
        this.state = {
            time : new Date().toLocaleTimeString("fr-FR",options)
        }
    }

    
    render() {
        return(
            <header>
                <div id="logo">
                    <h1>Lenguapp</h1>
                </div>
                <nav>
                    <ul>
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
                    <div className="hour">{this.state.time}</div>
                    <div className="date"></div>
                    </div>
                    <button id="account">
                        <Link to ="/signin">Se connecter</Link>
                    </button>
                </div>
            </header>
    )}
}