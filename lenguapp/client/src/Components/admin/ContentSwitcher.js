import React from "react"; 
import {useCourse } from "../../Services/CourseContextProvider";

import ContentCreate from "./ContentCreate";
import ContentMeta from "./ContentMeta";
import ContentValidation from "./ContentValidation";
import ContentPublish from "./ContentPublish";

export default function ContentSwitcher(){
    const {step} =  useCourse();


    function getComponent(){
        switch(step){
            case 0 :
                return <ContentMeta/>
            break;
            case 1 :
                return <ContentCreate/>
            break;
            case 2 :
                return <ContentValidation/>
            break; 
            case 3 :
                return <ContentPublish/>
            break;
            default :
                return "<h1>Error</h1>"
        }
    }
    return(
        <>
            {getComponent()}
        </>
    )
}