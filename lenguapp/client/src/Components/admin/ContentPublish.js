import React ,{useState} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";



const status = ["check the level","check the theme","check the language","check new words","published!"];
function ContentPublish(){
    return(
        <div className="centered">
            <h1>ContentPublish</h1>
            <div>
                <ul>
                    {status.map(stat=>(
                        <li>
                            <p>{stat}</p>
                            <img alt="check"/>
                        </li>
                    ))}
                </ul>
            </div>
            <button>Retour A l'accueil</button>
        </div>
    )
}

export default ContentPublish;