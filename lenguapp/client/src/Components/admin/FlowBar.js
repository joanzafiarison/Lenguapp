import React ,{useContext} from "react";
import {useCourse,useCourseDispatch} from "../../Services/CourseContextProvider";

const steps = [
    {
        "name":"meta",
        "text":"Définir le type de contenu"
    }
    ,
    {
        "name":"create",
        "text":"choisir mes éléments"
    },
    {
        "name":"validation",
        "text":"Validation des règles"
    },
    {
        "name":"publish",
        "text":"Publier"
    }
];

export default function FlowBar(){
    const {step} = useCourse();
    return(
        <div className="steps" style={{display:"flex",width:"100vw",justifyContent:"space-around"}}>
            {steps.map(((st,k)=>(
                <div className="step" style={{display:"flex",justifyContent:"space-between"}}>
                    <div key={step} style={{backgroundColor:step==k?"blue":"grey"}}>{k+1}</div>
                    <p style={{padding: "1rem", border: step ==k ? "3px solid blue" :"grey", borderRadius: 10, fontSize: 14}}>{st.text}</p>
                </div>
            )))}
       </div>
    )
}