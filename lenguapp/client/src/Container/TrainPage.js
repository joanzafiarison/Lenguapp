import React , {useState,useContext,useEffect} from "react";
import FlashCard from "../Components/FlashCard";
import Sidebar from "../Components/Sidebar";
import { useAppData, useAppDispatch } from "../Services/ContextProvider";
import { getExercisesFeed } from "../Services/ApiContent";

function TrainPage (props) {
    const [exercises,setExercises] = useState([]);
    const { search } = useAppData();
    console.log("exercises", exercises)

    useEffect( () => {
        console.log("search ",search)
        async function loadData(){
            await getExercisesFeed(search)
             .then((res) => setExercises(res.data))
             .catch((err)=>alert(JSON.stringify(err)))
        }
        loadData();
    },[])

    async function handleSubmit(e) {
        e.preventDefault();
        await getExercisesFeed(search)
        .then((res) => setExercises(res.data))
        .catch((err)=>alert(JSON.stringify(err)))
    }

    return (
        <div className="SearchContainer">
            <div id="searchbar">
                <form onSubmit={handleSubmit}>
                    <p><input type="text" name="search"/></p>
                    <p><input type='submit'value="rechercher"/></p>
                </form>
            </div>
            
            <div id="search">
                <Sidebar type="exercise" />
                <div id="inline_search">
                    {exercises != null ?
                        exercises.map((exercise , k) => (
                            <FlashCard 
                                key={k}
                                type={exercise.type} 
                                cardType="train"
                                theme={exercise.theme}
                                language={exercise.language}
                                exercise_id={exercise._id}
                            />
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