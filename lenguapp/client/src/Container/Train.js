import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import {withContext} from "../Services/ContextWrapper"
import { useLocation } from 'react-router-dom'


const STATE = {
    ENTERING : 'entering',
    ENTERED : 'entered',
    EXITING : 'exiting',
    EXITED : 'exited'
}
//custom hook with useEffect/useState hook
function useTransitionState(duration = 1000){

    const [state, setState] = useState();

    useEffect(()=>{
        let timerId;
        
        if (state === STATE.ENTERING){
            console.log("switch to enter")
            timerId = setTimeout(()=>setState(STATE.ENTERED),duration);
        }
        else if (state === STATE.EXITING){
            console.log("switch to  end")
            timerId = setTimeout(()=>setState(STATE.EXITED),duration)
        }
        
        return () => {
            timerId && clearTimeout(timerId)
        }
        
    });
    return [state,setState]
}

//STATE TOGGLER
function useTransitionControl(duration){
    const [state,setState] = useTransitionState(duration);

    const enter = () => {
        if(state !== STATE.EXITING){
            setState(STATE.ENTERING);
        }
    };
    const exit =() => {
        if(state !== STATE.ENTERING){
            setState(STATE.EXITING)
        }
    };

    return [state,enter,exit];
}

 function TrainInstance (props) {

     const [content,setContent] = useState({})
     const [selected,setSelected] = useState([])
     const [focus,setFocus] = useState("")
     const [cursor,setCursor] = useState(0)
     const [result,setResult] = useState("")
     const [state,enter,exit] = useTransitionControl(1500);
     const location = useLocation()
     const {exercise_id} = location.state
     
    console.log("etat",state)
  

    useEffect( () => {
        console.log("useEffect load exercises")
        axios.get(`http://localhost:5000/exercises/${exercise_id}`)
            .then((response) => setContent(response.data[0]))
    },[])

    useEffect( () => {
        console.log("submit score")
         axios.post("http://localhost:5000/scores",
                    {
                        content : selected,
                        user_id: props.context.user_id,
                        type:content.type,
                        theme : content.theme,
                        language: content.language
                    })
                    .then((res) =>{
                         setResult(res.data)
                         console.log(res.data)
                        })
    },[cursor === 4])
    
    
    async function validate(){
            setCursor(cursor +1)
            setSelected([...selected,{item : content.content[cursor],chosen : focus}])
            setFocus("");
            enter();
            console.log("validate")
            console.log(cursor)
            
    }
        //console.log("PROPS",props)
        //console.log("focus "+focus)

        return(
            <div id ="train_container" className={state == "entering" ? "layoutTransition":""}>
                <div className="progress_bar">
                    <div className="advancement"></div>
                </div>
                <div className="train_meta">
                    <p> THEME : {content.theme}</p>
                </div>
                
                {cursor < 4 ?
                    <div className="train_content">
                    {content.content == null ? 
                            <span>loading...</span> 
                            :
                            <div className="words">
                                <h2>{content.content[cursor].word}</h2>
                                <figure>
                                    <audio
                                        controls
                                        src="https://d1qx7pbj0dvboc.cloudfront.net/rate.mp3">
                                            <a href="https://d1qx7pbj0dvboc.cloudfront.net/rate.mp3">
                                                Download audio
                                            </a>
                                    </audio>
                                </figure>
                                <ul>
                                    {content.content[cursor].choices.map((wd)=>(
                                        <button className={focus === wd ? 'choice focus' : 'choice'} key = {wd} onClick= {()=> setFocus(wd) }>{wd}</button>
                                    ))}
                                </ul>
                            </div>
                    }
                    </div>
                    :
                    <div className="response_box">
                       { result == "" ?
                           <p>Réponse en cours d'envoi ..</p>
                           :
                           <p>{result}</p>
                       }
                    </div>
                }
                <div className="right_side">
                    <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                </div> 
               <p>Lifecycle :{state}</p>

            </div>
        )
}

export default withContext(TrainInstance)