import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Test (){
    const [counter,setCounter] =useState(0) 
    useEffect(() => {
        console.log(counter)
        axios.post("http://localhost:5000/scores",{response : counter})
             .then((res)=>console.log(res))
             .catch( (e) => console.log(e))
       },[counter === 4])
    return (
        <div className="mainElement">
            <p> Compteur : {counter} </p>
            <button onClick={() => setCounter(counter + 1)}>Envoyer une requête</button>
        </div>
    )
}