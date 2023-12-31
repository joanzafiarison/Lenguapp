import React , {useEffect, useState } from "react"
import axios from "axios"
import {useLocation} from "react-router-dom";
import CourseSwitcher from "../Components/CourseSwitcher";
import { FlowContextProvider } from "../Services/FlowContextProvider";

 function Learn (props) {
    const [step,setStep] = useState(0)
    const [course,setCourse] = useState({})
    const location = useLocation()
    const {course_id} = location.state

    /*
    useEffect( () => {
        axios.get(`http://localhost:5000/course/${course_id}`)
             .then((res) =>{
                setCourse(res.data)
                console.log("useEffect")
                console.log(res.data)
             } )
             .catch((e)=>console.log(e))
    },[step === 0])

    console.log("COURSE",course)*/
    
    
    return(
        <div className="mainElement">
            <FlowContextProvider>
                <CourseSwitcher/>
            </FlowContextProvider>
        </div>
    )
}

export default Learn;
