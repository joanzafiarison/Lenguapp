import React, {useState} from 'react'
import  {IntroProvider} from "../Services/IntroContextProvider";
import FlowBar from "../Components/FlowBar";

import {useIntroDispatch,useIntro} from "../Services/IntroContextProvider";

function IntroText({text}){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    console.log(text);
    return(
        <div className='mainContainer'>
            <div className="bubble down">
                <p>{text}</p>
            </div>
            <div className='avatar'>

            </div>
            <button onClick={()=> dispatch({
                    step : step+1,
                    type:'nextStep'
            })}>Next</button>
        </div>
    )
}
function IntroQuestion({text}){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    console.log(step);
    return(
        <div className='mainContainer'>
            <div style={{display:"flex"}}>
                <div className="bubble right">
                    <p>{text}</p>
                </div>
                <div className='avatar'>

                </div>
            </div>
            <select>
                <option value="eng">Anglais</option>
                <option value="jp">Japonais</option>
                <option value="ch">Chinois</option>
                <option value="mg">Malgache</option>
            </select>
            <button onClick={()=> dispatch({
                    step : step+1,
                    type:'nextStep'
            })}>Next</button>
        </div>
    )
}

function IntroExercise(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    console.log(step);
    return(
        <div>
            <h1>IntroExercise</h1>
            <button onClick={()=> dispatch({
                        step : step+1,
                        type:'nextStep'
                })}>Next</button>
        </div>
    )
}
function SuccessScreen(){
    return(
        <h1>Success</h1>
    )
}

function DisplayXP(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    return(
        <div className='mainContainer'>
            <div className="trophy">
                
            </div>
            <button onClick={()=> dispatch({
                        step : step+1,
                        type:'nextStep'
                })}>Next</button>
        </div>
    )
}

function Streak(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    return(
        <div className='mainContainer'>
            <h1>Streak</h1>
            <p>Jour</p>
            <div>
                <div style={{display:"flex"}}>
                    <div>
                        <p>L</p>
                        <div className='roundbox checked'></div>
                    </div>
                    <div>
                        <p>M</p>
                        <div className='roundbox '></div>
                    </div>
                    <div>
                        <p>M</p>
                        <div className='roundbox '></div>
                    </div>
                    <div>
                        <p>J</p>
                        <div className='roundbox '></div>
                    </div>
                    <div>
                        <p>V</p>
                        <div className='roundbox '></div>
                    </div>
                </div>
                <p>Pour ne pas perdre le streak reviens demain !</p>
            </div>
            <button onClick={()=> dispatch({
                    step : step+1,
                    type:'nextStep'
            })}>Next</button>
        </div>
    )
}

function RythmnOfLearning(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    return(
        <div className='mainContainer'>
            <h1>Choisis ton rythme</h1>
            <div style={{margin: 50, width:200, border: "1px solid black", borderRadius :15, padding : 10}}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <p>14 jours</p>
                    <p>A fond</p>
                </div>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <p>14 jours</p>
                    <p>A fond</p>
                </div>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <p>14 jours</p>
                    <p>A fond</p>
                </div>
            </div>
        
            <button onClick={()=> dispatch({
                        step : step+1,
                        type:'nextStep'
                })}>Next</button>
        </div>
    )
}

function CreateProfil(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    return(
        <div>
            <h1>Créer son profil</h1>
            <button onClick={()=> dispatch({
                        step : step+1,
                        type:'nextStep'
                })}>Next</button>
        </div>
    )
}



function SwitchScreen({scenario}){
    const {step} = useIntro();
    let name = scenario[step].name;
    switch(name){
        case "intro_text":
            return <IntroText text={scenario[step].text}/>
        case "intro_question":
            return <IntroQuestion text={scenario[step].text}/>
        case "intro_exercise":
            return <IntroExercise/>
        case "display_xp":
            return <DisplayXP/>
        case "rythmn":
            return <RythmnOfLearning/>
        case "streak":
            return <Streak/>
        case "profile":
            return <CreateProfil/>
        default :
            return <h1>Default</h1>
    }
}
//IntroText
//IntroQuestion question avec choix -> Réponse sauvegardés dans le cookie
//Exercise avec choix
//Success Screen
//XP affichage
//Streak
//Intro Rythmn choix du rythme
//Créer son profil
const ScreenSteps = [
    {
        "name" :"intro_text",
        "text" :"Nous allons définir tes préférences"
    },
    {
        "name" :"intro_question",
        "text" :"Quels langages veut tu apprendre? ",
        "data"  : 'langs'
    },
    {
        "name" :"intro_text",
        "text" :"Très bien déterminons ton niveau !",
    },
    {
        "name" :"intro_exercise",
    },
    {
        "name" :"rythmn",
    },
    {
        "name" :"streak",
    },
]
function Start() {
  
  //console.log(ScreenSteps[step].name)
  return (
    <IntroProvider>
        <FlowBar steps={ScreenSteps}/>
        <SwitchScreen scenario={ScreenSteps}/>
    </IntroProvider>
  )
}

export default Start