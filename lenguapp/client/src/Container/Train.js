import React , {useState, useEffect} from "react";
import Quizz from "../Components/Quizz";
import axios from "axios"
import { useLocation } from 'react-router-dom';
import { useAppData } from "../Services/ContextProvider";
import {colors} from "../utils/colors";
import { FlowContextProvider } from "../Services/FlowContextProvider";

 function TrainInstance (props) {

     const [content,setContent] = useState({})
     const [count,setCount] = useState(0)
     const [solution, setSolution] = useState("")
     const [selected,setSelected] = useState([])
     const [focus,setFocus] = useState("")
     const [cursor,setCursor] = useState(0)
     const [result,setResult] = useState({})
     const [success,setSuccess] = useState(false);
     const { user } = useAppData();
     const location = useLocation();
     console.log("location ",location);
     console.log("content ", content )
     const {exercise_id} = location.state;
    //focus, selected, solution , success
     let state_ = {
        content :content,
        count : count, 
        result :result
    }
    console.log("state general",state_)



  

    
    
    async function validate(){
            console.log("validate")
            let valid = focus === content.content[cursor].solution.word;
            setSuccess(valid);
            setCursor(cursor +1);
            setSelected([...selected,{item : content.content[cursor],chosen : focus}]);
            
            //setSuccess(content.solution === result.chosen)
            setFocus("");
            //enter();
            setSolution(content.content[cursor].solution.word)
            //exit();

            //if finished --> Go to Train/
            //TODO
    }
        
 
        return(
            <FlowContextProvider>
                    <Quizz exercise_id={exercise_id}/>
            </FlowContextProvider>
        )
}
//
export default TrainInstance

