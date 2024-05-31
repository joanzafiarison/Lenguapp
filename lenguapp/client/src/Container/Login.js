import React, { useEffect,useState}from "react";
import { Link , useNavigate } from "react-router-dom";
import {login} from "../Services/auth";
import { useAppData , useAppDispatch } from "../Services/ContextProvider";



export default function Login () {
            const [email,setEmail] = useState("");
            const [password,setPassword] = useState("");
            const [overlay,setOverlay] = useState(false);
            const [alertText,setAlertText]=useState("");
            const navigate = useNavigate();
            const { user } = useAppData();
            const dispatch = useAppDispatch();

            console.log("user ",user)

            // history = useHistory();
            //ben, mail@mail.com, b
            function connect (e){
                e.preventDefault()
                const {email,password} = e.target
                login(email.value,password.value)
                .then((res)=>{
                    if(res.data.message =="good credentials"){
                        //console.log("new auth ", res.headers.authorization)
                        localStorage.setItem("auth_token", res.headers.authorization)
                        setAlertText("Redirection");
                        setOverlay(true);
                        dispatch({
                            "user" : {
                                token : res.headers.authorization,
                                user_id : res.data.user_id ,
                                username : res.data.username,
                            },
                            "type" : "UPDATE_USER"
                        })
                        navigate("/");
                    }
                    else{
                        setAlertText("Mauvais mot de passe");
                        setOverlay(true);
                    }
                    console.log("status",res.status);
                })
                .then(()=>console.log("push"))
                .catch( (e) =>console.log(e))
            }

          

            return(
            <div style={{display:"flex",border:"1px solid black",width:"100%", padding :"1rem"}}>
                <div className="feature_login">
                    <figure>
                        <img src="" alt="feature"/>
                    </figure>
                    <h2>Apprendre avec des flashcards et partagez votre progression</h2>
                    <p>Vous pouvez choisir des thèmes, des langues et un niveau  qui vous convient</p>
                    <div className="switcher">
                        <div className="switch"></div>
                        <div className="switch active"></div>
                        <div className="switch"></div>
                    </div>
                </div>
                <div id="sign" className="mainElement">
                    <h1 className="logo_round">KOZE</h1>
                    <h2 className="text_greeting">Heureux de vous revoir</h2>
                    <p>Reprenez votre apprentissage de manière ludique et collaborative.</p>
                    <form method="post" onSubmit={connect}>
                        <div className="form_container">
                            <p>
                                <label htmlFor="identifiant">
                                Email : <input type="text" name="email" id="email"/>
                                </label>
                            </p>

                            <p>
                                <label htmlFor="password">
                                    Mot de Passe :<input type="password" name="password" id="pwd" />
                                </label>
                            </p>
                            <Link to="/forgotpassword"><p className="little_text">Récupérer son mot de passe</p></Link>
                            <button className="button_large">Se connecter</button>
                            <button className="button_google">Se connecter avec Google</button>
                        </div>
                        <div className="second">
                            <p>Pas encore inscrit ? Créer un <Link to="/register"><span>compte</span></Link></p>
                        </div>
                    </form>
                    <div className="overlay" style={{position:"absolute",display:overlay? "flex":"none",top:"40%",left:"40%",width:220,height:150,backgroundColor:"white",borderRadius:10,border:"1px solid black" ,justifyContent:"center",alignItems:"center"}}>
                        <p>{alertText}</p>
                        <button onClick={()=>setOverlay(!overlay)}>Fermer</button>
                    </div>
                </div>
            </div>
        )
}