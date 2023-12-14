import React , { useState } from 'react';
import { changePassword } from "../Services/auth";

function ForgotPassword() {

  const [ data, setData ] = useState({});
  const [ overlay, setOverlay ] = useState(false);
  const [ statusMessage, setStatusMessage ] = useState("")

  console.log(data);

  function handleSubmit(e){
    e.preventDefault();
    if(data.password === data.passwordConfirm){
        changePassword( data.email, data.password)
        .then((res) => console.log(res))
        .catch((err)=> {
            setStatusMessage("L'email renseigné n'existe pas");
            setOverlay(true);
        })
        //erreur utiliseur non trouvé
    }
    else {
        setStatusMessage("Les mots de passes ne sont pas identiques");
        setOverlay(true);
    }
  }

  function handleChange(e){
    const value = e.target.value;
    setData({...data,[e.target.name] : value})
    // control Data
    // emailRegex
    //passwordRegex
  }
  return (
    <div>
        <h2>Renouvellement de mot de passe</h2>
        <form onSubmit={handleSubmit}>
            <p>Email :
                <input type="text" name="email" id="email" onChange={(e) => handleChange(e)}/>
            </p>
            <p>Mot de passe : 
                <input type="password" name="password" id="password" onChange={(e) => handleChange(e)}/>
            </p>
            <p>Confirmation du mot de passe : 
                <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={(e) => handleChange(e)}/>
            </p>
            <input type="submit" value="Envoyer"/>
        </form>
        <div style={{display : overlay ? "block" :"none"}}>
                <p>{statusMessage}</p>
                <button onClick={()=> setOverlay(false)}>Fermer</button>
        </div>
    </div>
  )
}

export default ForgotPassword