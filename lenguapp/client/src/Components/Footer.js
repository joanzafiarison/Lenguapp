import * as React from "react";


const Footer = () => {
    return(
        <footer>
            <div>
                <h2>A propos</h2>
                <ul>
                    <li>Exploitation des données</li>
                    <li>Mentions légales</li>
                </ul>
            </div>
            
            <div>
                <h2>Service client</h2>
                <ul>
                    <a><li>L'équipe</li></a>
                    <a><li>Contact</li></a>
                </ul>
            </div>

            <div>
                <h2>Réseaux</h2>
                <ul>
                    <a><li>Twitter</li></a>
                    <a><li>Instagram</li></a>
                </ul>
            </div>
        </footer>
    )
}


export default Footer;