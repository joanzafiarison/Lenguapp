"use strict";

import React from "react";
import  {CourseProvider} from "../Services/CourseContextProvider";
import FlowBar from "../Components/admin/FlowBar";
import ContentSwitcher from "../Components/admin/ContentSwitcher";

function CreateCourse(){

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