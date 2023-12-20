import React , { useState, useEffect } from 'react';
import axios from "axios";
import { useFlow, useFlowDispatch } from "../Services/FlowContextProvider";
import { useTransitionControl } from "../hooks/transition";
import { useAppData } from "../Services/ContextProvider";
import {colors} from "../utils/colors";
import ResponseBox from './ResponseBox';
import ExerciseSwitcher from './ExerciseSwitcher';




function Quizz({exercise_id}) {
    const [state,enter,exit] = useTransitionControl(2000);
    const [cursor,setCursor] = useState(0);
    //const [content,setContent] = useState({})
    const [selected,setSelected] = useState([]);
    const [focus,setFocus] = useState("");
    const [solution, setSolution] = useState("");
    const [result,setResult] = useState({});
    const { user } = useAppData();
    const { content, success  } = useFlow();
    console.log("in quizz",Object.keys(content).length == 0)
    console.log(exercise_id)
    console.log("content",content)

    const dispatch = useFlowDispatch();
    useEffect( () => {

        async function loadData () {
            await axios.get(`http://localhost:5000/exercises/${exercise_id}`)
            .then((response) => dispatch({
                content : response.data[0],
                type : "UPDATE_CONTENT"
            }))
            .catch(err => console.log(err))
        }

        loadData();
    
    },[])

    useEffect( () => {
        console.log("effect score data")
        if(cursor > 0){
            axios.post("http://localhost:5000/scores",
                    {
                        content : selected,
                        user_id: user.user_id,
                        type:content.type,
                        theme : content.theme,
                        language: content.language
                    })
                    .then((res) =>{
                        setResult(res.data)
                        })
                    .catch(err => console.log(err))
        }
         
    },[cursor === content.length])

    async function validate(){
        console.log("validate")
        let valid = focus === content.content[cursor].solution.word;
        //setSuccess(valid);
       
        setCursor(cursor +1);
        setSelected([...selected,{item : content.content[cursor],chosen : focus}]);
        
        //setSuccess(content.solution === result.chosen)
        setFocus("");

        enter();
        setSolution(content.content[cursor].solution.word)
        exit();
    
        //if finished --> Go to Train/
        //TODO
    }

  return (
    <div id ="train_container" className={state == "entering" ? "layoutTransition":""}>
        <div className="progress_bar">
            <div className="advancement" style={{width:`${(cursor/content.length)*100}%`}}></div>
        </div>
        <div className="train_meta">
                <p style={{fontSize :12}}> {content.theme}</p>
        </div> 
        <div className="train_content">
            <ExerciseSwitcher/>
        </div>
        {content.content && 
                    <div className="success_overlay" style={{display: state === "exiting" ? "flex" : "none"}}>
                            <p>{success? "Bravo !" :"la réponse était : "+solution}</p>
                            <div className="tick" style={{width:50,height:50,backgroundColor: success ? colors.green : colors.red}}>

                            </div>
                    </div>
                        }
    </div>
  )
}

/**
 * {Object.keys(content).length !== 0  ? 
                    <ResponseBox result={result} />
                    :
                    <div className="words">
                        <h2 style={{fontSize:22, margin :'0.8rem'}}>{content.content[cursor].item.word}</h2>
                        <figure>
                            <audio
                                controls
                                src="http://localhost:5000/resources">
                                    <a href="http://localhost:5000/resources">
                                        Download audio
                                    </a>
                            </audio>
                        </figure>
                        <ul>
                            {content.content[cursor].choices.map((wd)=>(
                                <div>
                                    <button className={focus === wd.word ? 'choice focus' : 'choice'} key = {wd.word} onClick= {()=> setFocus(wd.word)}>{wd.word}</button>
                                </div>
                            ))}
                        </ul>
                        <p>Lifecycle :{state}</p>
                        <div className="right_side">
                            <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                        </div>
                    </div>
                }
 */
export default Quizz

