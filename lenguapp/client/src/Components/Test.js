import React, { useEffect, useState } from "react"

export default function Test (){
    const [counter,setCounter] =useState(0) 

    return (
        <div className="mainElement">
            <p> Compteur : {counter} </p>
            <button onClick={() => setCounter(counter + 1)}>Envoyer une requête</button>
        </div>
    )
}