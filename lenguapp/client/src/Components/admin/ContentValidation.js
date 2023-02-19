import React ,{useState} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";  

const MockData = ["",""]
function ContentValidation(){
    const {step}= useCourse();
    const dispatch = useCourseDispatch();
    return(
        <div className="centered">
            <h1>ContentValidation</h1>
            {MockData.map(el=>(
                <div style={{backgroundColor:"blue"}}>
                    Element de l'exercice cours
                </div>
            ))}
            <button onClick={()=>{dispatch({step : step+1,type:'nextStep'})}}>Suivant</button>
        </div>
    )
}

export default ContentValidation;