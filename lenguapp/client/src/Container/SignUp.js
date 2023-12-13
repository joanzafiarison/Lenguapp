import React ,{useState,useEffect} from "react";
import {sign_up} from "../Services/auth";

export default function SignUp () {
        const [password, setPassword] = useState("");
        const [passwordConfirm, setPasswordConfirm] = useState("");
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [options, setOptions] = useState({})

        function handleSubmit(e) {
            e.preventDefault();
            sign_up({email : email, password : password, username : username})
                .then(res=>console.log(res.data))
                .catch(err => console.log(err))
        }

        return(
            <div className="container_one">
                <h1>Création du compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className="container_wrap">
                        <p>
                            <label htmlFor="username">
                                Identifiant :<input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="email">
                                E-mail : <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="password">
                                Mot de passe : <input type="password" name="password" id="pwd" onChange={(e)=>setPassword(e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="passwordconf">
                                Confirmation du mot de passe : <input type="password" name="password" id="pwd" onChange={(e)=>setPassword(e.target.value)}/>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="languages">
                                Langues :
                                <select name="languages" id="languages">
                                    <option value="Français">Français</option>
                                    <option value="Anglais">Anglais</option>
                                </select>
                            </label>
                        </p>
                        <p>
                            <label htmlFor="work">
                                Profession : <input type="text" name="work" id="work" />
                            </label>
                        </p>
                        <p>
                            <label htmlFor="level">
                                Niveau : <input type="radio" name="level" id="level" />
                            </label>
                        </p>
                        
                        <input type="submit" name="submit"  />
                    </div>
                    
                </form>
            </div>
        )
}