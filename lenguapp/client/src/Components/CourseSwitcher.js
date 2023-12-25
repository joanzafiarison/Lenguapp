import React, {useState, useEffect} from 'react';
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
    return(
        <div>
            <h1 data-testid="course_type">{type}</h1>
            <div style={{display : "flex", justifyContent : "flex-end", width : "100%"}}>
                <button>Enr.</button>
            </div>
            <div>
                <p style={{fontWeight : 600}}>{content.content.content}</p>
                <p>Audio</p>
                <p style={{fontSize : 14}}>{content.content.translation}</p>
            </div>
            <p>{content.content.composition ? content.content.composition.join("-") : ""}</p>
            <button onClick={()=> dispatch({cursor : cursor + 1, type :"NEXT_STEP"})}>Compris</button>
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
            <p>{item.map(el => (<span style={{ color : COLORS[el.fonction]}}>{el.value}</span>))}</p>
            <p>{item.map(el => (<span style={{ color : COLORS[el.fonction]}}>{el.fonction}</span>))}</p>
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
                {content.content.content.map((el) => (
                    <BuildingBlock item={el}/>
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

function CourseSwitcher() {
    const [content, setContent] = useState({});
    const { cursor } = useFlow();
    //const [cursor, setCursor] = useState(3);
    //console.log(content.content[cursor]);
    useEffect(() => {
        let course_id = "63eaee326dfe86b3e0e37490"
        axios.get(`http://localhost:5000/courses/${course_id}`)
            .then((res) => setContent(res.data))
    },[])
    function getComponent (item){
        switch(item.type){
            case "words" :
                return <Words type='words' content={item}  />
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
  return (
    <div>
        {content.content && cursor < content.content.length  ? getComponent(content.content[cursor]) : <FinishScreen name={content.name}/>}
    </div>
  )
}

export default CourseSwitcher