import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import FlashCard from "../Components/FlashCard";
import {withContext} from "../Services/ContextWrapper"




function LearnPage (props) {
    const [text,setText] = useState("");
    const [urlToContent,setUrl]= useState("http://localhost:5000/exercises")
    const [params,setParams] = useState({
        "contentType" : "words",
        "language" : "malagasy",
        "theme" :"food",
        "level" : "beginner"
    });

    const [content,setContent] = useState([]);

    console.log("route",props.history.location.pathname);
    
    const routeName = props.history.location.pathname;

    function handleOption(e,option){
        console.log("handle",e.target.value)
        switch(option){
            case "type":
                setParams({...params,type: e.target.value});
                break;
            case "language":
                setParams({...params,language:e.target.value});
                break; 
            case "theme":
                setParams({...params,theme:e.target.value});
                break; 
            case "level":
                setParams({...params,language:e.target.value});
                break;
            case "text":
                setParams({...params,text:e.target.value});
                break;
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        let newContent = await getContent();
        setContent(newContent.data);
    }



    async function getContent(){
        console.log(params);
        return await axios.post(urlToContent, {
            type : params.contentType,
            language : params.language,
            theme : params.theme,
            level : params.level
        })

    }

    useEffect( async () => {
        console.log("useEffect content");

        if(routeName === "/courses"){
            setUrl("http://localhost:5000/courses");
        } 
        //ajouter les arguments type=words
        if(routeName === "/train"){
            setUrl("http://localhost:5000/exercises");
        }
        let contentData = await getContent(urlToContent);
        console.log("data",contentData.data)
        setContent(contentData.data)
    },[])
    /*
    useEffect(()=>{
        console.log("param effect",params);

    },[params])*/
    return (
     <div className="SearchContainer">
        <div id="searchbar">
            <form onSubmit={handleSubmit}>
                <p><input type="text" name="search" onChange={(e)=>handleOption(e,"text")} /></p>
                <p><input type='submit'value="rechercher"/></p>
            </form>
        </div>
        
        <div id="search">
            <div className="sidebar">
                <div>
                    <h3>Langue</h3>
                    <select name="language" id="language" onChange={(e)=>handleOption(e,"language")}>
                        <option value="english">Anglais</option>
                        <option value="french">Français</option>
                        <option value="deutch">Allemand</option>
                        <option value="malagasy">Malagasy</option>
                    </select>
                </div>
                <div>
                    <h3>Theme</h3>
                    <select name="theme" id="theme" onChange={(e)=>handleOption(e,"theme")}>
                        <option value="law">Droit</option>
                        <option value="economics">Economie</option>
                        <option value="Tourisme">Tourisme</option>
                        <option value="food">Nourriture</option>
                    </select>
                </div>
                <div>
                    <h3>Niveau</h3>
                    <select name="level" id="level" onChange={(e)=>handleOption(e,"level")}>
                        <option value="beginner">Débutant</option>
                        <option value="intermediate">Intérmédiaire</option>
                        <option value="advanced">Avancé</option>
                    </select>
                </div>
                <div>
                    <h3>Type</h3>
                    <select name="type" id="type" onChange={(e)=>handleOption(e,"type")}>
                        <option value="words">Mots & Phrases</option>
                        <option value="building">Construction</option>
                        <option value="and-you-say">And you say ...</option>
                        <option value="Pendu">Pendu</option>
                        <option value="Jeu">Jeu</option>
                    </select>
                </div>

            </div>
                    <div id="inline_search">
                        {content != null ?
                            content.map((exercise) => (
                                <FlashCard type={exercise.type} theme={exercise.theme} language={exercise.language} exercise_id={exercise._id}/>
                            ))
                            :
                            <p>Pas d'exercices crées pour le moment</p>
                        }
                    </div>
        </div>
     </div>
    )
}


export default withContext(LearnPage)