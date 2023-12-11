"use strict";

import React ,{useState,useEffect,createContext} from "react";
import ContentMeta from "../Components/admin/ContentMeta";
import  {CourseProvider} from "../Services/CourseContextProvider";
import FlowBar from "../Components/admin/FlowBar";
import ContentSwitcher from "../Components/admin/ContentSwitcher";
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
    const [courseData,setCourseData] = useState({})
    return(
        <div style={{display:"flex",margin:30,flexDirection:"column",alignItems:"center"}}>
            <h1>Create Course</h1>
            <CourseProvider>
                <FlowBar/>
                <div className="stepContent">
                    <ContentSwitcher/>
                </div>
                
            </CourseProvider>
            
        </div>
    )
}


export default CreateCourse;