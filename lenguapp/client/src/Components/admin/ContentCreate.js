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
    const [overlayType,setOverlayType] = useState("view");
    const [overlay_preview, setOverlayPreview] = useState(false);
    console.log("current filters",options)
    console.log("content ", chosenElements)
    useEffect(()=>{
        //appel api avec les filtres
        searchWords();
    },[])
    

    function searchWords(){
        axios.post("http://localhost:5000/words/search",{
            lang : options.lang_src,
            theme : options.theme,
            level : options.level
            
        })
        .then((res) => {
            console.log("res",res.data)
            setElements(res.data);
         })
        .catch(console.log)
    }

    function addWord(word){
        
        let newElements = chosenElements;
        //filter
        if(newElements.findIndex(el => el.id == word.id) == -1){
            let new_word = {
                content : word,
                type : "words"
            }
            newElements.push(new_word);
            setChosenElements(newElements);
        }
    }

    function editWordContent(e){
        e.preventDefault();
        //retrouver l'index 
        let newElements = chosenElements;
        let element_index = newElements.findIndex(el => el.id == focus.id)
        //filter
        if(element_index !== -1){
            let new_word = {
                content : focus,
                type : e.target.value
            }
            newElements[element_index] = new_word;
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
                {elements.map(data=>(
                    <div className="search_element" key={data._id}>
                        <div>
                            <p>{data.word}</p>
                            <p>{data.word_id}</p>
                        </div>
                        <div>
                            {data.themes.map(tag=>(
                                <div className="tag_button">{tag.name}</div>
                            ))}
                        </div>
                        <button className="detail_button" onClick={()=>{setOverlay(!overlay);setFocus(data);}}>Voir</button>
                        <button className="add_button" onClick={()=>{setOverlay(!overlay); setOverlayType("add");setFocus(data);}}>Ajouter</button>
                    </div>
                ))}
                </ul>
            </div>
            <div className="word_overlay" style={{display : overlay && overlayType == "view" ? "flex":"none"}}>
                <h1>{focus.word}</h1>
                <button className="close_button" onClick={()=>setOverlay(false)}>X</button>
            </div>
            <div className="word_overlay" style={{display : overlay && overlayType == "add" ? "flex":"none"}}>
                <h1>{focus.word}</h1>
                <select onChange={(e)=>editWordContent(e)}>
                    <option value="word">Mots/phrases</option>
                    <option value="pronounciation">Prononciation</option>
                    <option value="listen">Ecoute</option>
                    <option value="writing">Ecrire</option>
                </select>
                <button onClick={()=> {setOverlay(!overlay); setOverlayType("view");addWord(focus, focus.id)}}>Ajouter</button>
                <button className="close_button" onClick={()=>{{setOverlay(false); setOverlayType("view")}}}>X</button>
            </div>
            <div className="preview_overlay" style={{display : overlay_preview? "flex":"none"}}>
                {chosenElements.map(el => (
                        <div className="word_item">
                            <p>{el.content.word}</p>
                            <p>{el.content.word_id}</p>
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