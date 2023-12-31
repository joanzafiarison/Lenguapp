import React ,{useState,useEffect} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";
import axios from "axios";


const mockData = [
    {
        "id":23,
        "element":"lait",
        "traduction":"milk",
        "src":"fr",
        "dest":"eng",
        "type":"word",
        "tags":["nourriture"],
        
    },
    {
        "id":21,
        "element":"bonjour tout le monde",
        "type":"sentence",
        "src": "fr",
        "dest": "eng",
        "tags":["nourriture"],
        "décomposition" : ["Hello","every","world"],
        "traduction" :"Hello everybody"
    },
    {
        "id": 20,
        "element":"Je mange du pain",
        "type":"sentence",
        "src": "fr",
        "dest": "eng",
        "tags":["nourriture"],
        "décomposition" : ["I","eat","bread"],
        "traduction" :"I am eating bread"
    }
]
function ContentCreate(){
    const {step, options, content} = useCourse();
    const dispatch =useCourseDispatch()
    const [elements,setElements] = useState([])
    const [chosenElements,setChosenElements] = useState([])
    const [focus,setFocus] = useState({})
    const [search, setSearch] = useState("");
    const [overlay,setOverlay] = useState(false);
    const [overlay_preview, setOverlayPreview] = useState(false);
    console.log("current filters",options)
    console.log("search ",search);
    console.log("content ", content)
    useEffect(()=>{
        //appel api avec les filtres
        setElements(mockData);
    },[])
    

    function searchWords(e){
        e.preventDefault();
        console.log("appel api",search);
        axios.post("http://localhost:5000/search",{options})
             .then(res => console.log(res))
             .catch(console.log)
    }

    function addWord(word){
        
        let newElements = chosenElements;
        //filter
        if(newElements.findIndex(el => el.id == word.id) == -1){
            newElements.push(word);
            setChosenElements(newElements);
        }
    }


    function handleSubmit(e){
        e.preventDefault();
        dispatch({
            step : step+1,
            type:'nextStep'
        })
        dispatch({
            content : chosenElements,
            type : "added"
        })
        dispatch({
            options : options,
            type : "updateMeta"
        })
    }
    
    return(
        <div className="centered">
            <h1>Recupération d'éléments</h1>
            <div style={{display:"flex",margin:"1em"}}>
                <p><input type="text" name="query" placeholder="rechercher" onChange={(e)=>setSearch(e.target.value)}/></p>
                <button style={{backgroundColor:"green "}} onClick={searchWords}>Go</button>
            </div>
            <div className="searchResult">
                <ul>
                {mockData.map(data=>(
                    <div className="search_element">
                        <div>
                            <p>{data.element}</p>
                            <p>{data.traduction}</p>
                        </div>
                        <div>
                            {data.tags.map(tag=>(
                                <div className="tag_button">{tag}</div>
                            ))}
                        </div>
                        <button className="detail_button" onClick={()=>{setOverlay(!overlay);setFocus(data);}}>Voir</button>
                        <button className="add_button" onClick={()=>addWord(data)}>Ajouter</button>
                    </div>
                ))}
                </ul>
            </div>
            <div className="word_overlay" style={{display : overlay? "flex":"none"}}>
                <h1>{focus.element}</h1>
                <button onClick={()=>setOverlay(false)}>X</button>
            </div>
            <div className="preview_overlay" style={{display : overlay_preview? "flex":"none"}}>
                {chosenElements.map(el => (
                        <div className="word_item">
                            <p>{el.element}</p>
                            <p>{el.traduction}</p>
                        </div>
                    ))
                }
                <button onClick={()=>setOverlayPreview(false)}>X</button>
            </div>
            <p>Nombre de mots : {chosenElements.length}</p>
            <button className="detail_button" onClick={()=>setOverlayPreview(!overlay_preview)}>Prévisualiser</button>
            <button onClick={handleSubmit}>Suivant</button>
        </div>
    )
}

export default ContentCreate;