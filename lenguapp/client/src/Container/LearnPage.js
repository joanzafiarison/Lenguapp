import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import LearningCard from "../Components/LearningCard"
import TrainCard from "../Components/TrainingCard"
import {withContext} from "../Services/ContextWrapper"

function LearnPage (props) {
    const [content,setContent] = useState([]);
    console.log("route",props.history.location.pathname);
    const routeName = props.history.location.pathname;

    useEffect( () => {
        let urlToContent = "http://localhost:5000/courses";
        if(routeName !== "/courses"){
            urlToContent= "http://localhost:5000/exercises";
        }
        axios.get(urlToContent)
             .then((res) => setContent(res.data))
    },[])

    return (
     <div className="SearchContainer">
        <div id="searchbar">
            <form>
                <p><input type="text" name="search"/></p>
                <p><input type='submit'value="rechercher"/></p>
            </form>
        </div>
        
        <div id="search">
            <div className="sidebar">
                <div>
                    <h3>Langue</h3>
                    <select name="language" id="language">
                        <option value="eng">Anglais</option>
                        <option value="fr">Français</option>
                        <option value="de">Allemand</option>
                    </select>
                </div>
                <div>
                    <h3>Theme</h3>
                    <select name="theme" id="theme">
                        <option value="law">Droit</option>
                        <option value="eco">Economie</option>
                        <option value="Tourisme">Tourisme</option>
                    </select>
                </div>
                <div>
                    <h3>Niveau</h3>
                    <select name="theme" id="theme">
                        <option value="beginner">Débutant</option>
                        <option value="intermediate">Intérmédiaire</option>
                        <option value="advanced">Avancé</option>
                    </select>
                </div>

            </div>
                {props.history.location.pathname === "/courses"? 
                    <LearningCard/> :
                    <div id="inline_search">
                    {content != null ?
                        content.map((exercise) => (
                            <TrainCard type={exercise.type} theme={exercise.theme} language="anglais" exercise_id={exercise._id}/>
                        ))
                        :
                        <p>Pas d'exercices crées pour le moment</p>
                    }
                </div>
                }
        </div>
     </div>
    )
}


export default withContext(LearnPage)