import React from "react";
import {useIntro} from "../Services/IntroContextProvider";

export default function FlowBar({steps}){
    const {step} = useIntro();
    let advance = Math.round((step/steps.length)*100);
    return(
        <div className="steps" style={{display:"flex", justifyContent:"flex-start", width:"80%", height :20, borderRadius:15, border: "1px solid black", overflow :"hidden"}}>
            <div className="flow_advancement" style={{width : `${advance}%`}}></div>
       </div>
    )
}