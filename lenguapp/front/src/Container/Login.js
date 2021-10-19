import React from "react"


export default class Login extends React.Component {
    render() {
        return(
            <div id="sign" className="mainElement">
                <h1>Connexion : </h1>
                <form method="post" action="http://localhost:5000/login">
                    <div className="form_container">
                        <label htmlFor="identifiant">
                           Email : <input type="text" name="email" id="email"/>
                        </label>
                        <label htmlFor="password">
                            Mot de Passe :<input type="password" name="password" id="pwd" />
                        </label>
                        <input type="submit" name="submit"  />
                    </div>
                    <div className="second">
                        <p>Pas encore inscrit ? Créer un <a href="signup">compte</a></p>
                    </div>
                </form>
            </div>
        )
    }
}