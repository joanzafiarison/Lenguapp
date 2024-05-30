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
function Words ({type}) {
    const {cursor, content} = useFlow();
    const [count, setCount] = useState(content.content.length);
    const dispatch = useFlowDispatch();
    const [currentElement, setCurrentElement ] = useState(content.content[cursor])
    //console.log("ct ",currentElement)
    //console.log("conter",count)
    console.log("lenght", count)
    console.log("update cursor ",cursor)
    function validate(){
       
        if(cursor  < count ){   
            dispatch({cursor : cursor + 1, type :"NEXT_STEP"})
        }
    }

    return(
        <div>
            <h1 data-testid="course_type">{currentElement.type}</h1>
            <div style={{display : "flex", justifyContent : "flex-end", width : "100%"}}>
                <button>Enr.</button>
            </div>
            <div>
                <p style={{fontWeight : 600}}>{currentElement.content.word}</p>
                {currentElement.content.romanized ? <p style={{fontWeight : 600}}>{currentElement.content.romanized}</p> : null }
                <p>Audio</p>
                <p style={{fontSize : 14}}>{currentElement.content.translation}</p>
            </div>
            <p>{currentElement.content.composition ? currentElement.content.composition.join("-") : ""}</p>
            <button onClick={()=> validate()}>Compris</button>
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
        <div className="response_box">
            <h1>{name} terminé</h1>
            <Link to="/courses">Retour</Link>
        </div>
    )
}

function CourseSwitcher({course_id}) {
    const [isExercise, setIsExercise] = useState(false);
    const [cards, setCards] = useState([]);
    const [screen , setScreen] = useState("");
    const { cursor, result , selected, content} = useFlow();
    const [count, setCount] = useState(0);
    const dispatch = useFlowDispatch();
    
    //const [cursor, setCursor] = useState(3);
  
    //console.log("screen ",screen)
    console.log('exercise ?', isExercise)
    console.log("cards",cards)
    console.log("count", count)

    function fisherYates( array ){
        let count = array.length,
            randomnumber,
            temp;
        let new_array = array;
        while( count ){
            randomnumber = Math.random() * count-- | 0;
            temp = new_array[count];
            new_array[count] = new_array[randomnumber];
            new_array[randomnumber] = temp
        }
        return new_array;
    }
    //console.log("id ", course_id)
    useEffect(() => {
        //let course_id = "63eaee326dfe86b3e0e37490"
        axios.get(`http://localhost:5000/courses/${course_id}`)
            .then((res) => {
                //get Exercise
                let course_data = {...res.data}
                let exercises = fisherYates([...res.data.content])

                //Shuffle content and add type exercise
                exercises = exercises.map(ex =>  {
                    //get choices --get words
                    let choices = [{"word":"rand"},{"word":"rand1"},{"word": "rand"},{"word":"rand"}]
                    return Object.assign({}, ex, {
                      ...ex , type : "exercise", exercise : { choices : choices, solution : "rand1"}
                    });
                });

                //add new content to course_data
                let new_content = course_data.content.concat(exercises)
                course_data.content = new_content;
                

                console.log("shuffle",exercises);
                console.log("full",course_data);
                dispatch({content : course_data , type :"UPDATE_CONTENT"})
                
            })
    },[])

    useEffect(() => {
        if(content.content){
            setCards(content.content)
            setCount(content.content.length)
        }  
    },[content])

    useEffect(() =>{
        
        console.log("cursor ", cursor);
        if(content.content){
            if( cursor < count ){
                setScreen("transition");
                //dispatch({cursor : 0, type :"NEXT_STEP"})
            }
            else{
                setScreen("end");
            }
        }
       
    },[cursor]);

    function ComponentFactory ({item}){
      const itemType = isExercise ? "exercise" : "content"
     
      if (cursor === count) {
        return <FinishScreen />
      }
      else {
            switch(item.type)
                {
                    case "words" :
                        return <Words type='words' />
                    case "exercise" :
                        return <Quizz content={item} />
                    case "building" :
                        return <Building content={item}/>
                    case "sounds" :
                        return <Words type='sounds' />
                    case "writing" :
                        return <Words type='writing' />
                    default :
                        return <p>{item.type}</p>
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