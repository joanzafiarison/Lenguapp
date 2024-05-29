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
            <h1>Titre : {options.name}</h1>
            <p>{options.theme}</p>
            <p>{options.level}</p>
            <p>De {options.lang_src} à {options.lang_dest}</p>
            <p>{content.length} élément{content.length > 1 ? "s" :""}</p>
            
            <div style={{flexDirection : "row"}}>
                {content.map(el=>(
                    <div style={{backgroundColor:"grey", display:"flex", justifyContent:"space-around", borderRadius :5, padding : 5, minWidth :50}}>
                        <p>{el.content.word.slice(0,10)}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Suivant</button>
        </div>
    )
}

export default ContentValidation;