import React from 'react'

export default class HomePage extends React.Component{
    render() {
        return(
            <>
                <div id="hero">
                    <p>Learn,SHare,Practice</p>
                </div>
                
                <div className="feature">
                    <p>Titre</p>
                    <p>Contenu</p>
                </div>

                <div className="feature">
                    <p>Titre</p>
                    <p>Contenu</p>
                </div>
                
                <p>TRY</p>
                <p>CONNECT</p>
            </>
        )
    }
}