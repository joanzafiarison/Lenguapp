import React ,{useState,useEffect} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";
import axios from "axios";


const mockData = [
    {
        "element":"lait",
        "tags":["nourriture"],
        "traduction":"milk"
    },
    {
        "element":"bonjour tout le monde",
        "tags":["nourriture"],
        "décomposition" : ["Hello","every","world"],
        "traduction" :"Hello everybody"
    },
    {
        "element":"Je mange du pain",
        "tags":["nourriture"],
        "décomposition" : ["I","eat","bread"],
        "traduction" :"I am eating bread"
    }
]
function ContentCreate(){
    const {step} = useCourse();
    const [elements,setElements] = useState([])
    const [focus,setFocus] = useState({})
    useEffect(()=>{
        setElements(mockData);
    },[])
    const [overlay,setOverlay] = useState(false);
    return(
        <div className="centered">
            <h1>ContentCreata</h1>
            <div>
                <p><input type="text" name="query" placeholder="rechercher"/></p>
                <p><img alt="rechercher"/></p>
            </div>
            <div className="searchResult">
                <ul>
                {mockData.map(data=>(
                    <div className="search_element">
                        <p>{data.element}</p>
                        <p>{data.traduction}</p>
                        <h3>Tags</h3>
                        {data.tags.map(tag=>(
                            <div>{tag}</div>
                        ))}
                        <button onClick={()=>{setOverlay(!overlay);setFocus(data);}}>Voir</button>
                    </div>
                ))}
                </ul>
            </div>
            <div className="word_overlay" style={{display : overlay? "flex":"none"}}>
                <h1>{focus.element}</h1>
            </div>
        </div>
    )
}

export default ContentCreate;