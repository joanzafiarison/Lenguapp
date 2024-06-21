import React from 'react'
//import {} from '@fon'

function PayWall() {

  function paySubscription(){
    //trigger stripe
    //Success 
    //Fail
  }
  return (
    <div class="mainContainer">
        <div class="payCard">
            <h2>Premium</h2>
            <div>
                <p>participe à des dialogues fictifs</p>
                <p>Check</p>
            </div>
            <div>
                <p>Améliore ta prononciation et passe pour un natif!</p>
                <p>Check</p>
            </div>
            <div>
                <p>Accède a du contenu dans la langue que du veux adapté à tes connaissances</p>
                <p>Check</p>
            </div>
            <div>
                <p>Participe à des quizz sur la compréhension d'un texte</p>
                <p>Check</p>
            </div>
            <p>5.99€ / mois</p>
            <button onClick={()=> paySubscription()}>C'est Parti</button>
        </div>
    </div>
  )
}

export default PayWall;
