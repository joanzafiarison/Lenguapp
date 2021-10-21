import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import {withContext} from "../Services/ContextWrapper"


 function TrainInstance (props) {
     
     const [content,setContent] = useState({})
     const [selected,setSelected] = useState([])
     const [focus,setFocus] = useState("")
     const [cursor,setCursor] = useState(0)
     const [result,setResult] = useState("")
     
     
    useEffect( () => {
        console.log("useEffect")
        axios.get(`http://localhost:5000/exercises/${props.exercise_id}`)
            .then((response) => setContent(response.data[0]))
    },[props.exercise_id != ""])
    
    
    async function validate(){
            setCursor(cursor +1)
            setSelected([...selected,{item : content.words[cursor],chosen : focus}])
            setFocus("")
            console.log("validate")
            console.log(cursor)
            if(cursor === 3){
                await axios.post("http://localhost:5000/scores",
                    {
                        content : selected,
                        user_id: props.context.user_id,
                        type:content.type,
                        theme : content.theme
                    })
                    .then((res) => setResult(res.data))
            }
            
    }
        console.log("PROPS",props)
        const {words} = content
        console.log("focus "+focus)
        console.log("selected",selected)
        console.log("result",result)
        console.log("content",content)
        console.log("cursor",cursor)
        return(
            <div id ="train_container" className="mainElement">
                <div className="train_meta">
                    <p> N°{cursor + 1}</p>
                    <p> THEME : {content.theme}</p>
                </div>
                
                {cursor < 4 ?
                    <div className="train_content">
                    {words == null ? 
                            <span>loading...</span> 
                            :
                            <div className="words">
                                <h2>{words[cursor].word}</h2>
                                <ul>
                                    {words[cursor].words.map((wd)=>(
                                        <button className={focus == wd ? 'choice focus' : 'choice'} key = {wd} onClick= {()=> setFocus(wd) }>{wd}</button>
                                    ))}
                                </ul>
                            </div>
                    }
                    </div>
                    :
                    <div className="response_box">
                       { result != "" ?
                           <p>Réponse en cours d'envoi ..</p>
                           :
                           <p>{result}</p>
                       }
                    </div>
                }
                <div className="right_side">
                    <button className="btn" disabled = {focus == "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                </div> 
               

            </div>
        )
}

export default withContext(TrainInstance)