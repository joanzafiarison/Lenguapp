import React from 'react'

export default class Header extends React.Component{
    render() {
        return(
            <header>
                <div id="logo">
                    <h1>Lenguapp</h1>
                </div>
                <nav>
                    <ul>
                    <li>Train</li>
                    <li>Share</li>
                    <li>Read</li>
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