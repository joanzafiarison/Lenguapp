import ResponseBox from "../ResponseBox";
import { useFlow, useFlowDispatch } from "../../Services/FlowContextProvider";

export default function Quizz ({content}) {
    const { cursor, focus, solution, selected, success} = useFlow();
    const dispatch = useFlowDispatch();
    //console.log("c ",cursor);
    //console.log("ct ",content.content.length);
    //console.log("fc ",focus);
    //console.log("solution ",solution);
    //console.log("success ",success);
    //console.log("result ",result)
    console.log("ex content",content.exercise.choices)
    
    async function validate(){
        console.log("validate")
        let valid = focus === content.exercise.solution.word;
        console.log("valid ",valid)
        
        dispatch({
            success : valid,
            type : "UPDATE_SUCCESS"
        })
        dispatch({
            cursor : cursor + 1,
            type : "NEXT_STEP"
        })
        
        dispatch({
            selected : [...selected,{item : content,chosen : focus}],
            type : "UPDATE_SELECTION"
        })
    
        dispatch({
            focus : "",
            type : "UPDATE_FOCUS"
        })
        //enter();
    
        console.log("sol ",content.exercise.solution.word)
        dispatch({
            solution : content.exercise.solution.word,
            type : "UPDATE_SOLUTION"
        })
        //exit();
        //if finished --> Go to Train/
        //TODO
    }

    return(
        <div className="words">
            { content  ?
            <>
                <h2 style={{fontSize:22, margin :'0.8rem'}}>{content.content.word}</h2>
                
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
                    {content.exercise.choices.map((wd)=>(
                        <div>
                            <button className={focus === wd.word ? 'choice focus' : 'choice'} key = {wd.word} onClick= {()=> dispatch({focus : wd.word, type: "UPDATE_FOCUS"})}>{wd.word}</button>
                        </div>
                    ))}
                </ul>
                <div className="right_side">
                    <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                </div>
            </>
            : null
            }
            
        </div>
    )
}