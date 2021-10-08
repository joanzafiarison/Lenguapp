import React from "react"


export default class SignUp extends React.Component {
    render() {
        return(
            <div id="sign">
                <h1>Inscription</h1>
                <form method="post" action="http://localhost:5000/register">
                    <div className="form_container">
                        <label htmlFor="username">
                            Identifiant :<input type="text" name="username" id="username"/>
                        </label>
                        <label htmlFor="email">
                            E-mail : <input type="email" name="email" id="email"/>
                        </label>
                        <label htmlFor="password">
                            Mot de passe : <input type="password" name="password" id="pwd" />
                        </label>
                        <label htmlFor="languages">
                            Langues :
                            <select name="languages" id="languages">
                                <option value="Français">Français</option>
                                <option value="Anglais">Anglais</option>
                            </select>
                        </label>
                        <label htmlFor="level">
                            Niveau : <input type="radio" name="level" id="level" />
                        </label>
                        
                        <input type="submit" name="submit"  />
                    </div>
                    
                </form>
            </div>
        )
    }
}