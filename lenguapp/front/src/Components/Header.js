import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component{
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
                        <Link to="/">Share</Link>
                    </li>
                    <li>
                        <Link to ="/">Read</Link>
                    </li>
                    </ul>
                </nav>
                <div id="admin">
                    <div id="date">
                    <button type="button" className="btn">Display today's date</button>
                    <div className="date"></div>
                    </div>
                    <a href="/account">
                    <button id="account">
                        Se connecter
                    </button>
                    </a>
                    
                </div>
            </header>
    )}
}