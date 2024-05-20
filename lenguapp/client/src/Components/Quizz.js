import React , { useState, useEffect } from 'react';
import axios from "axios";
import { useFlow, useFlowDispatch } from "../Services/FlowContextProvider";
import { useTransitionControl } from "../hooks/transition";
import { useAppData } from "../Services/ContextProvider";
import {colors} from "../utils/colors";
import { FaBeer, FaCheckCircle ,FaRegWindowClose } from 'react-icons/fa';

import ResponseBox from './ResponseBox';
import ExerciseSwitcher from './ExerciseSwitcher';




function Quizz({exercise_id}) {
    const [state,enter,exit] = useTransitionControl(2000);
    const { cursor, content, success, solution } = useFlow();
    //const [selected,setSelected] = useState([]);
    const [count,setCount] = useState(0);
    const { user } = useAppData();
    const { selected } = useFlow();

    console.log("count ",count)
    console.log("cursor ",cursor)
    const dispatch = useFlowDispatch();
    useEffect( () => {

        async function loadData () {
            await axios.get(`http://localhost:5000/exercises/${exercise_id}`)
            .then((response) => {
                dispatch({
                    content : response.data[0],
                    type : "UPDATE_CONTENT"
                })
        })
            .catch(err => console.log(err))
        }

        loadData();
     
       
    
    },[])

    useEffect(() => {
        exit();

        return () => enter();
    },[cursor])

    useEffect(() => {
        if(content.content){
            setCount(content.content.length)
        }
    },[content])

    useEffect( () => {
        console.log("cursor quizz ",cursor)
        //console.log("select ",selected)
        console.log("content ",content)
        
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
                        console.log("message data ",res.data)
                        dispatch({
                            result : res.data,
                            type : "UPDATE_RESULT"
                        })
                        })
                    .catch(err => console.log(err))
        }
         
    },[cursor === count])

  
  return (
    <div id ="train_container" className={state == "entering" ? "layoutTransition":""}>
        <div className="progress_bar">
            <div className="advancement" style={{width:`${(cursor/content.length)*100}%`}}></div>
        </div>
        <div className="train_meta">
                <p style={{fontSize :12}}>{content.theme}</p>
        </div> 
        <div className="train_content">
            <ExerciseSwitcher/>
        </div>
        <p>Lifecycle : {state}</p>
        {content.content && 
                    <div className="success_overlay" style={{display: state === "exiting" ? "flex" : "none"}}>
                            <p>{success? "Bravo !" :"la réponse était : "+solution}</p>
                            <div className="tick" style={{display :"flex" , alignItems :"center", width:50,height:50 , margin :"0.5rem"}}>
                                {success  ? <FaCheckCircle color={colors.green} />:<FaRegWindowClose  color={colors.red}/>}
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

