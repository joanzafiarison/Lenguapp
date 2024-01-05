import React, {useState, useEffect} from 'react';
import Quizz from './Exercises/Quizz';
import ResponseBox from './ResponseBox';
import { Link } from 'react-router-dom';
import { useFlow, useFlowDispatch } from "../Services/FlowContextProvider";
import axios from "axios";


// test 1 : Vérifier que le type varie
// lancer component switcher 
//appuyer sur le bouton pour passer a la suite et voir si cela change

//test 2 : idem mais avec vision sur le mot ou quelque chose d'autre


//test 3 : récupérer la partie exercice et vérifier le bon déroulement
function Words ({type, content}) {
    const {cursor} = useFlow();
    const dispatch = useFlowDispatch();
    //console.log("ct ",content)
    function validate(){
        console.log("cursor ",cursor)
        console.log("count ",content)
        if(cursor < 4){
            console.log("update cursor ",cursor)
            dispatch({cursor : cursor + 1, type :"NEXT_STEP"})
        }
    }
    return(
        <div>
            <h1 data-testid="course_type">{type}</h1>
            <div style={{display : "flex", justifyContent : "flex-end", width : "100%"}}>
                <button>Enr.</button>
            </div>
            <div>
                <p style={{fontWeight : 600}}>{content.content.content}</p>
                {content.content.romanized ? <p style={{fontWeight : 600}}>{content.content.romanized}</p> : null }
                <p>Audio</p>
                <p style={{fontSize : 14}}>{content.content.translation}</p>
            </div>
            <p>{content.content.composition ? content.content.composition.join("-") : ""}</p>
            <button onClick={()=> validate() }>Compris</button>
        </div>
    )
}

function BuildingBlock ({item}) {
    const COLORS = {
        "S" : "blue",
        "V" : "green",
        "O" : "red"
    }
    return(
        <li>
            <p style={{color : COLORS[item.fonction]}}>{item.value}</p>
            <p style={{color : COLORS[item.fonction]}}>{item.fonction}</p>
            <p>{item.translation}</p>
        </li>
    )

}

function BuildingBlockBis ({item}) {
    const COLORS = {
        "S" : "blue",
        "V" : "green",
        "O" : "red"
    }
    return(
        <div>
            <p>{item.map((el,k) => (<span key={k} style={{ color : COLORS[el.fonction]}}>{el.value}</span>))}</p>
            <p>{item.map((el,k) => (<span key={k} style={{ color : COLORS[el.fonction]}}>{el.fonction}</span>))}</p>
        </div>
    )

}

function Building ({content}) {
    const {cursor} = useFlow();
    const dispatch = useFlowDispatch();
    return(
        <div>
            <h1 data-testid="course_type">Building</h1>
            <div style={{display : "flex", justifyContent : "flex-end", width : "100%"}}>
                <button>Enr.</button>
            </div>
            <ul style={{display:"flex", justifyContent:"space-around"}}>
                {content.content.content.map((el, k) => (
                    <BuildingBlock key={k} item={el}/>
                ))}
            </ul>
            <BuildingBlockBis item={content.content.content}/>
            <p>{content.content.translation}</p>
            <p>{content.content.phonetics}</p>
            <p>Attachment : {content.content.attachment.audio}</p>
            <button onClick={()=> dispatch({cursor : cursor + 1, type :"NEXT_STEP"})}>Compris</button>
        </div>
    )
}

function FinishScreen ({name}){
    return(
        <div style={{minHeight : 300}}>
            <h1>{name} terminé</h1>
            <Link to="/user">Retour</Link>
        </div>
    )
}

function CourseSwitcher({course_id}) {
    const [content, setContent] = useState({});
    const [count, setCount] = useState(0);
    const [isExercise, setIsExercise] = useState(false);
    const [cards, setCards] = useState([]);
    const [screen , setScreen] = useState("");
    const { cursor, result , selected} = useFlow();
    const dispatch = useFlowDispatch();
    
    //const [cursor, setCursor] = useState(3);
    console.log("course content",content);
    console.log("cursor ", cursor);
    console.log("count ",count);
    console.log("screen ",screen)
    console.log('exercise ?', isExercise)
    console.log("cards",cards)
    //console.log("id ", course_id)
    useEffect(() => {
        //let course_id = "63eaee326dfe86b3e0e37490"
        axios.get(`http://localhost:5000/courses/${course_id}`)
            .then((res) => setContent(res.data))
    },[])

    useEffect(() => {
        if(content.content){
            setCount(content.content.length);
            setCards(content.content)
        }   
    },[content])

    useEffect(() =>{
        
        console.log("effect count ")
        if(count > 0 && cursor === count -1   ){
            if(isExercise){
                setScreen("end");
                console.log("selection ",selected)
                console.log("end screen");
            }
            else{
                setScreen("transition")
                console.log("transition screen")
                setCards(cards.sort(() =>  Math.random() - 0.5));
                setIsExercise(true);
                dispatch({cursor : 0, type :"NEXT_STEP"})
            }
        }
    },[cursor]);

    function ComponentFactory ({item}){
      const itemType = isExercise ? "exercise" : "content"
      console.log("screen ",screen);
      if (screen == "end") {
        return <ResponseBox result={result} />
      }
      else {
            switch(item.type)
                {
                    case "words" :
                        if (isExercise){
                            return <Quizz content={item} />
                        }
                        else {
                            return <Words type='words' content={item}  />
                        }
                    case "building" :
                        return <Building content={item}/>
                    case "sounds" :
                        return <Words type='sounds'  content={item}/>
                    case "writing" :
                        return <Words type='writing'  content={item}/>
                    default :
                        return <p>{JSON.stringify(item)}</p>
                }
        }
        
      }
  return (
    <div>
        {cards.length > 0  ? 
            <ComponentFactory item={cards[cursor]}/> 
            : null
        }
    </div>
  )
}

/*:
            <FinishScreen name={content.name}/> */
export default CourseSwitcher