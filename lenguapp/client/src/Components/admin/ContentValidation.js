import React ,{useState} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";  


function ContentValidation(){
    const {step, content, options}= useCourse();
    console.log("contenu ",useCourse());
    const dispatch = useCourseDispatch();

    function handleSubmit(e){
        e.preventDefault(); 
        dispatch(
            {
                step : step+1,
                type:'nextStep'
            }
        )
        dispatch(
            {   
                options : options,
                type:'updateMeta'
            }
        )

        dispatch(
            {   
                content : content,
                type:'added'
            }
        )
    }

    return(
        <div className="centered">
            <h1>Récapitulatif</h1>
            {content.map(el=>(
                <div style={{backgroundColor:"grey", display:"flex", justifyContent:"space-around"}}>
                    <p>{el.element}</p>
                    <p>{el.traduction}</p>
                    <p>{el.id}</p>
                </div>
            ))}
            <button onClick={handleSubmit}>Suivant</button>
        </div>
    )
}

export default ContentValidation;