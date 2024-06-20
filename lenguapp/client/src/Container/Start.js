import React, {useState} from 'react'
import  {IntroProvider} from "../Services/IntroContextProvider";
import FlowBar from "../Components/FlowBar";

import {useIntroDispatch,useIntro} from "../Services/IntroContextProvider";

function IntroText(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    console.log(step);
    return(
        <div>
            <h1>IntroText</h1>
            <button onClick={()=> dispatch({
                    step : step+1,
                    type:'nextStep'
            })}>Next</button>
        </div>
    )
}
function IntroQuestion(){
    const {step} = useIntro();
    const dispatch = useIntroDispatch();
    console.log(step);
    return(
        <div>
            <h1>IntroQuestion</h1>
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
        <div>
            <h1>XP</h1>
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
        <div>
            <h1>Streak</h1>
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
        <div>
            <h1>Choisis ton rythme</h1>
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
            return <IntroText/>
        case "intro_question":
            return <IntroQuestion/>
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
        "desc" :"Nous allons définir tes préférences"
    },
    {
        "name" :"intro_question",
        "desc" :"Quels langages veut tu apprendre",
        "data"  : 'langs'
    },
    {
        "name" :"intro_text",
        "desc" :"Très bien déterminons ton niveau !",
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