import React ,{useState,useEffect} from "react";

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
]

function CreateCourse(){
    const [step,SetStep] = useState(0);
    return(
        <div style={{display:"flex",margin:30,flexDirection:"column",alignItems:"center"}}>
            <h1>Create Course</h1>
            <div className="steps" style={{display:"flex",width:"100vw",justifyContent:"space-around"}}>
                {steps.map(((st,k)=>(
                    <div className="step" style={{display:"flex",justifyContent:"space-between",width:"80px"}}>
                        <div key={step} style={{backgroundColor:step==k?"blue":"grey"}}>{k+1}</div>
                        <p>{st.text}</p>
                    </div>
                )))}
            </div>
            <div className="stepContent" style={{height:"300px",width:"200px",margin:150,backgroundColor:"cyan"}}>
                <p>Board {steps[step].text}</p>
                <button  onClick={()=>{if(step<3){SetStep(step+1)}}} style={{backgroundColor:"green"}}>Valider</button>
            </div>
            
        </div>
    )
}


export default CreateCourse;