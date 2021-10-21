import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import TrainCard from "../Components/Cards"
import {withContext} from "../Services/ContextWrapper"

function TrainPage (props) {
    const [exercises,setExercises] = useState([])

    useEffect( () => {
        axios.get("http://localhost:5000/exercises")
             .then((res) => setExercises(res.data))
    })

    return (
        <div id="search">
            <div id="search_bar">
                <p>Langue :</p>
                <select name="language" id="language">
                    <option value="eng">Anglais</option>
                    <option value="fr">Français</option>
                    <option value="de">Allemand</option>
                </select>
                <p>Theme :</p>
                <select name="theme" id="theme">
                    <option value="law">Droit</option>
                    <option value="eco">Economie</option>
                    <option value="Tourisme">Tourisme</option>
                </select>
            </div>
            <div id="inline_search">
                {exercises != null ?
                    exercises.map((exercise) => (
                        <TrainCard type={exercise.type} theme={exercise.theme} language="anglais" id={exercise._id}/>
                    ))
                    :
                    <p>Pas d'exercices crées pour le moment</p>
                }
            </div>
        </div>
    )
}


export default withContext(TrainPage)