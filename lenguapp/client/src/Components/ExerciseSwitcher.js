import React from 'react';
import { useFlow, useFlowDispatch } from "../Services/FlowContextProvider";
import ResponseBox from './ResponseBox';




    /*
    setSelected([...selected,{item : content.content[cursor],chosen : focus}]);
        setSolution(content.content[cursor].solution.word);
    setSuccess(content.solution === result.chosen)
    setFocus("");*/

function Question () {
    const { cursor, result , content, focus, solution, selected, success} = useFlow();
    const dispatch = useFlowDispatch();
    console.log("c ",cursor);
    console.log("ct ",content.content.length);
    console.log("fc ",focus);
    console.log("solution ",solution);
    console.log("success ",success);
    console.log("result ",result)

    async function validate(){
        console.log("validate")
        let valid = focus === content.content[cursor].solution.word;
        //setSuccess(valid);
        dispatch({
            success : valid,
            type : "UPDATE_SUCCESS"
        })
        dispatch({
            cursor : cursor + 1,
            type : "NEXT_STEP"
        })
        
        
       
        //setCursor(cursor +1);
    
        dispatch({
            selected : [...selected,{item : content.content[cursor],chosen : focus}],
            type : "UPDATE_SELECTION"
        })
    
    
        dispatch({
            focus : "",
            type : "UPDATE_FOCUS"
        })
    
        //enter();
    
        console.log("sol ",content.content[cursor].solution.word)
        dispatch({
            solution : content.content[cursor].solution.word,
            type : "UPDATE_SOLUTION"
        })
        //exit();
    
        //if finished --> Go to Train/
        //TODO
    }

    return(
        <div className="words">
            { cursor < content.content.length ?
            <>
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
                            <button className={focus === wd.word ? 'choice focus' : 'choice'} key = {wd.word} onClick= {()=> dispatch({focus : wd.word, type: "UPDATE_FOCUS"})}>{wd.word}</button>
                        </div>
                    ))}
                </ul>
                <div className="right_side">
                    <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
                </div>
            </>
            : <ResponseBox result={result}/>
            }
            
        </div>
    )
}


function Building ({content}) {
    return(
        <div>
            <p>Build</p>
            <p>{content.type}</p>
            <p>{JSON.stringify(content)}</p>
        </div>
    )
}



const filterTypes = ( name) => {
    const QUIZZ_TYPES = ["words", "audio", "and-you-say"];
    const BUILD_TYPES = ["building"];

    if(QUIZZ_TYPES.indexOf(name) !== -1){
        return "quizz";
    }
    else {
        return "building"
    }
}

function ExerciseSwitcher() {
 const { content } = useFlow();
 //console.log("content switch ",content)
 
  function getComponent (item){
    const name = filterTypes(item.type);
    switch(name){
        case "quizz" :
            return <Question content={content}/>
        case "building" :
            return <Building content={content}/>
        case "result" :
            return <ResponseBox content={content}/>
        default :
            return <p>Error</p>
    }
  }
  return (
    <div>{getComponent(content)} </div>
  )
}

export default ExerciseSwitcher