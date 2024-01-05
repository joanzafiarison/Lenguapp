import React, { useState, useEffect } from 'react';
import { useFlow, useFlowDispatch } from "../Services/FlowContextProvider";
import ResponseBox from './ResponseBox';

const ALPHABET = {
    "mg" :  ["a","b","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"],
    "rm" :  ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}


    /*
    setSelected([...selected,{item : content.content[cursor],chosen : focus}]);
        setSolution(content.content[cursor].solution.word);
    setSuccess(content.solution === result.chosen)
    setFocus("");*/
function Pendu () {
    const { cursor, result, content,solution, selected} = useFlow();
    const [ focus, setFocus ] = useState([]);
    const [ toFound, setToFound ] = useState([]);
    const [ life, setLife ] = useState(5);
    const dispatch = useFlowDispatch();
    console.log(toFound)
    console.log(content)
    console.log("cursor in hangman ",cursor)

    useEffect(() =>{
        console.log("effect 1 ",content)
        if(content.content){
            //console.log("content effect ", content.content[cursor].word)
            setToFound(content.content[cursor].word.split(""));
            setFocus([]);
        }
        //
    },[])

    useEffect(() =>{
       let rest = toFound.filter( el => focus.indexOf(el) == -1);
       console.log("rest ",rest)
       if(rest.length == 0){
        console.log("success");
        dispatch({
            success : true,
            type : "UPDATE_SUCCESS"
        })
        dispatch({
            cursor : cursor + 1,
            type :"NEXT_STEP"
        })
        setLife(5)
       }
    },[focus])

    useEffect(() =>{
        if( life == 0){
            dispatch({
                success : false,
                type :"UPDATE_SUCCESS"
            }) //if life = O ==> game OVer
            dispatch({
                cursor : cursor + 1,
                type :"NEXT_STEP"
            })
        }
    },[life])

    function handleParts (part) {
        if(focus.indexOf(part) == -1){
            setFocus([...focus, part]);
            if (toFound.indexOf(part) == -1) {
                    setLife(life - 1);               
            }
        }
    }
    return (
        <div>
            {content && cursor < content.content.length ?
            <div>
                <canvas>Dessin</canvas>
                <p>Vie : {life}</p>
                <ul style={{display:"flex", justifyContent:"space-around", width:"100%"}}>
                    {toFound.map((letter,k) => (
                        <li key={k} style={{fontSize:24, margin :10, width : 20, borderBottom : "1px solid black"}}>{focus.indexOf(letter) !== -1 ? letter : ""}</li>
                    ))}
                </ul>
                <ul style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
                    {ALPHABET["mg"].map((alph, k) => (
                        <li key={k} style={{margin : 5, backgroundColor : focus.indexOf(alph) !== -1 ? "grey" : "green", borderRadius : 5, padding : 5}} onClick={() => handleParts(alph) }>{alph}</li>
                    ))}
                </ul>
            </div>
                : 
            <p>Hello</p>
            }
        </div>
    )
}

function Question () {
    const { cursor, result , content, focus, solution, selected, success} = useFlow();
    const dispatch = useFlowDispatch();
    //console.log("c ",cursor);
    //console.log("ct ",content.content.length);
    //console.log("fc ",focus);
    //console.log("solution ",solution);
    //console.log("success ",success);
    //console.log("result ",result)

    
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
            { content && cursor < content.content.length ?
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


function Building () {
    const { cursor, result , content, solution, selected, success} = useFlow();
    const [exerciseLength, setExerciseLength ] = useState(0);
    const [focus, setFocus ] = useState([]);
    const dispatch = useFlowDispatch();
    console.log(exerciseLength)
    console.log("content ",content)
    console.log("focus ",focus)

    useEffect(() =>{
        console.log("useeffect building")
        console.log("contenu", content)
        if(content.content){
            setExerciseLength(content.content[cursor].solution.word.split(" ").length);
        }
    },[])

    function handleParts(word){
        console.log("wd ",word)
        if(focus.indexOf(word) == -1 ){
            setFocus([...focus, word])
        }
        else {
            setFocus(focus.filter(w => w !== word))
        }
    }

    function validate(){
        let valid = focus.join(" ") === content.content[cursor].solution.word;
        console.log("valid", valid)
        dispatch({
            success : valid,
            type : "UPDATE_SUCCESS"
        })
        dispatch({
            cursor : cursor + 1,
            type : "NEXT_STEP"
        })
        dispatch({
            solution : content.content[cursor].solution.word,
            type : "UPDATE_SOLUTION"
        })
        
        
       
        //setCursor(cursor +1);
    
        dispatch({
            selected : [...selected,{item : content.content[cursor],chosen : focus}],
            type : "UPDATE_SELECTION"
        })
    
    
        dispatch({
            focus : [],
            type : "UPDATE_FOCUS"
        })
    }
    return(
        <>
        {content.content && cursor < content.content.length ?
        <div>
            
            <p>{content.name}</p>
            <p>{content.content[cursor].item.word}</p>
            <div className="build_parts">
                <ul style={{display : "flex", justifyContent :"space-around"}}>
                    {focus.map(wd => (
                        <li>{wd}</li>
                    ))}
                </ul>
            </div>
            <ul>
                {content.content[cursor].choices.map((wd, k) => (
                    <button key={k} className={ focus.indexOf(wd.word) !== -1 ? 'choice focus' : 'choice'} onClick={() => handleParts( wd.word)} >{wd.word}</button>
                ))}
            </ul>
            <div className="right_side">
                    <button className="btn" disabled = {focus === "" ? true : false} onClick = {() => validate()}>suivant !</button>    
            </div>
            
        </div>
         : <ResponseBox result={result} />
        }
        </>
    )
}



const filterTypes = ( name) => {
    const QUIZZ_TYPES = ["words", "audio", "and-you-say"];
    const BUILD_TYPES = ["building"];
    const SPECIAL_QUIZZ = ["hangman"];

    if(QUIZZ_TYPES.indexOf(name) !== -1){
        return "quizz";
    }
    else if (SPECIAL_QUIZZ.indexOf(name) !== -1){
        return "hangman";
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
            return <Building/>
        case "hangman" :
            return <Pendu content={content}/>
        default :
            return <p>Error</p>
    }
  }
  return (
    <div>{getComponent(content)} </div>
  )
}

export default ExerciseSwitcher