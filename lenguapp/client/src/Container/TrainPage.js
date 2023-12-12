import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import FlashCard from "../Components/FlashCard"

function TrainPage (props) {
    const [exercises,setExercises] = useState([])
    console.log("exercises", exercises)

    useEffect( () => {
        axios.get("http://localhost:5000/exercises")
             .then((res) => setExercises(res.data))
             .catch((err)=>alert(JSON.stringify(err)))
    })

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
                            <option value='mg'>Madagascar</option>
                            <option value="eng">Anglais</option>
                            <option value="fr">Français</option>
                            <option value="de">Allemand</option>
                        </select>
                    </div>
                    <div>
                        <h3>Theme</h3>
                        <select name="theme" id="theme">
                            <option value="presentation">Présentation</option>
                            <option value="food">Nourriture</option>
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
                <div id="inline_search">
                    {exercises != null ?
                        exercises.map((exercise) => (
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


export default TrainPage