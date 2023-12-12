import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import Sidebar from "../Components/Sidebar";
import FlashCard from "../Components/FlashCard";

// MONGO --> va rechercher les thèmes existants / avec leur difficultés  
// endpoint /meta ... actualisé tous les X temps (perf)
const meta_language = {
    "malagasy" : {
        "themes" : [
            {
                "name" : "food",
                "level" : ["beginner", "intermediate"],
                "type" : ["AndYouSay","words"]
            }
        ]
    },
    "japanese" : {
        "themes" : [
            {
                "name" : "greeting",
                "level" : ["beginner", "intermediate"],
                "type" : ["AndYouSay","words"]
            }
        ]
    },
    "english" : {
        "themes" : [
            {
                "name" : "economics",
                "level" : ["beginner"],
                "type" : ["AndYouSay","words"]
            },
            {
                "name" : "law",
                "level" : ["beginner"],
                "type" : ["AndYouSay","words"]
            },
        ]
    },
    "french" : {
        "themes" : [
            {
                "name" : "greeting",
                "level" : ["beginner", "intermediate"],
                "type" : ["AndYouSay","words"]
            }
        ]
    },
}


function LearnPage (props) {
    const [text,setText] = useState("");
    const [params,setParams] = useState({
        "contentType" : "words",
        "language" : "english",
        "theme":"law",
        "level" : "beginner"
    });

    const [content,setContent] = useState([]);
    
    //const routeName = props.history.location.pathname;
    

    function handleOption(e,option){
        switch(option){
            case "contentType":
                setParams({...params,contentType: e.target.value});
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
        let newContent = await getContent("http://localhost:5000/exercises");
        if (newContent.data) {
            setContent(newContent.data);
        }
    }



    async function getContent(urlToContent){
        console.log("params ",params)
        return await axios.post(urlToContent, {
            type : params.contentType,
            language : params.language,
            theme : params.theme,
            level : params.level
        })

    }

    useEffect( async () => {

        let contentData = await getContent("http://localhost:5000/exercises");
        console.log("data",contentData.data)
        if (contentData.data) {
            setContent(contentData.data)
        }
        else {
            console.log("no data found")
        }

        //load meta
    },[])
  
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
                        <option value="greeting">Rencontre</option>
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
                    <select name="type" id="type" onChange={(e)=>handleOption(e,"contentType")}>
                        <option value="words">Mots & Phrases</option>
                        <option value="building">Construction</option>
                        <option value="and_you_say">And you say ...</option>
                        <option value="Pendu">Pendu</option>
                        <option value="Jeu">Jeu</option>
                    </select>
                </div>

            </div>
                    <div id="inline_search">
                        {content != null ?
                            content.map((exercise) => (
                                <FlashCard type={exercise.type} theme={exercise.theme} language={exercise.language} exercise_id={exercise._id} key={exercise._id}/>
                            ))
                            :
                            <p>Pas d'exercices crées pour le moment</p>
                        }
                    </div>
        </div>
     </div>
    )
}


export default LearnPage