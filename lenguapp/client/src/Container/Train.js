import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import {withContext} from "../Services/ContextWrapper"
import { useLocation } from 'react-router-dom'
import {colors} from "../utils/colors"


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
     const [count,setCount] = useState(0)
     const [selected,setSelected] = useState([])
     const [focus,setFocus] = useState("")
     const [cursor,setCursor] = useState(0)
     const [result,setResult] = useState({})
     const [state,enter,exit] = useTransitionControl(2000);
     const [success,setSuccess] = useState(false);
     const location = useLocation()
     const {exercise_id} = location.state

     let state_ = {
        content :content,
        count : count, 
        cursor :cursor,
        result :result
    }
    console.log("state general",state_)

    useEffect( () => {

        axios.get(`http://localhost:5000/exercises/${exercise_id}`)
            .then((response) => setContent(response.data[0]))

        //mettre directement le lien dans le composant audio
        axios.get("http://localhost:5000/resources")
            .then((response)=>console.log("audio",response))
    
    },[])



    useEffect( () => {
        if(cursor > 0){
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
                        })
        }
         
    },[cursor === count])


    useEffect(()=>{
        if(content.content != undefined){
            console.log("setting count ",content.content.length)
            setCount(content.content.length);
        }
    },[content])
    
    
    async function validate(){
        
            let valid = focus == content.content[cursor].solution;
            setSuccess(valid);
            setCursor(cursor +1);
            setSelected([...selected,{item : content.content[cursor],chosen : focus}]);
            
            //setSuccess(content.solution === result.chosen)
            setFocus("");
            enter();
            exit();
            console.log("validate")
            console.log(cursor)
            
    }
        //console.log("PROPS",props)
        //console.log("focus "+focus)

 
        return(
            <div id ="train_container" className={state == "entering" ? "layoutTransition":""}>
                <div className="progress_bar">
                    <div className="advancement" style={{width:`${(cursor/count)*100}%`}}></div>
                </div>
                <div className="train_meta">
                        <p> THEME : {content.theme}</p>
                </div> 
                {cursor < count ?
                    <div className="train_content">
                    {content.content == null ? 
                            <span>Ce contenu est vide</span> 
                            :
                            <div className="words">
                                <h2>{content.content[cursor].word}</h2>
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
                           <div>
                                <p>Vous avez trouvé {result.score}/{result.total} mots</p>
                                <p>{Math.round(result.score/result.total*100)}%</p>
                            </div>
                           
                       }
                    </div>
                }
                <div className="right_side">
                    <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                </div> 
               <p>Lifecycle :{state}</p>
               <div className="success_overlay" style={{display: state == "exiting" ? "flex" : "none"}}>
                    <p>{success? "Bravo !" :"C'est pas ça !"}</p>
                    <div className="tick" style={{width:50,height:50,backgroundColor: success ? colors.green : colors.red}}>

                    </div>
               </div>

            </div>
        )
}

export default withContext(TrainInstance)