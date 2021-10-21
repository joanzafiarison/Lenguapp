import React , {useEffect, useState } from "react"
import {withContext} from "../Services/ContextWrapper"
import axios from "axios"
import {useLocation} from "react-router-dom"
import HtmlParser from "react-html-parser"

 function Learn (props) {
    const [step,setStep] = useState(0)
    const [course,setCourse] = useState({})
    const location = useLocation()
    const {course_id} = location.state

    useEffect( () => {
        axios.get(`http://localhost:5000/course/${course_id}`)
             .then((res) =>{
                setCourse(res.data)
                console.log("useEffect")
                console.log(res.data)
             } )
             .catch((e)=>console.log(e))
    },[step === 0])

    console.log("COURSE",course)
    
    
    return(
        <div className="mainElement">
            <div className="learn_meta">
                <p className="course_theme">{course.theme}</p>
                <p className="course_lang">{course.language}</p>
                {course.content != null ?
                    <p>{step+1}/{course.content.length}</p>
                    :
                    null
                }
            </div>
            

            <div className="course_content">

            {course.content != null ?
                <>  
                     <h2>{course.content[step].title}</h2>
                     {HtmlParser(course.content[step].content)}
                </>
                :
                null
            }
            </div>
    
            <button className ="btn" disabled = {step === 0 ? true :false} onClick ={() => setStep(step + 1)}>Suivant</button>
            <button className ="btn" disabled = {step === 0 ? true :false} onClick ={() => setStep(step - 1)}>Précédent</button>
            

        </div>
    )
}

export default withContext(Learn)


/*
{
    content.content.map((item) => (
                  <>
                    <p>{item.title}</p>
                    <p>{item.content}</p>
                  </>
        ))
}
*/ 