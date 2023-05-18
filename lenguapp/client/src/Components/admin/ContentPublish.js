import React ,{useState,useEffect} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";
import axios from "axios";



const status = [
    {
        "desc":"check the level",
        "step":"level",
        "status":"loading"
    },
    {
        "desc":"check the theme",
        "step":"theme",
        "status":"loading"
    },
    {
        "desc":"check the language",
        "step":"language",
        "status":"failed"
    },
    {
        "desc":"check new words",
        "step":"new_words",
        "status":"succeed"
    },
    {
        "desc":"published",
        "step":"publish",
        "status":"loading"
    },
];

function ContentPublish(){
    const {step, options, content} = useCourse();
    const [status_, setStatus] = useState(status)

    useEffect( () => {
        const fetchData = async () => {
            return await axios.post("http://localhost:5000/publish",{options, content})
                                .then(res=>console.log(res))
                                .catch(console.log)
        }

        function levelOk () {
            let newStatus = [...status];
            newStatus[0].status = "succeed";
            setTimeout(() => setStatus(newStatus),3000)
        }

        function themeOk () {
            let newStatus = [...status];
            newStatus[1].status = "succeed";
            setTimeout(() => setStatus(newStatus),8000)
        }

        function publishedOk () {
            let newStatus = [...status];
            newStatus[4].status = "failed";
            setTimeout(() => setStatus(newStatus),10000)
        }
        levelOk()
        themeOk()
        publishedOk()

    },[])

    console.log(useCourse())
    return(
        <div className="centered">
            <h1>Publication du contenu</h1>
            <div>
                <ul>
                    {status_.map(stat=>(
                        <li style={{display: "flex", margin : 10}}>
                            <p>{stat.desc}</p>
                            {stat.status === "loading" ?
                                <div className="lds-dual-ring"></div>
                                : null 
                            }
                            {stat.status === "succeed" ?
                                <div className="lds-success"></div>
                                : null 
                            }
                            {stat.status === "failed" ?
                                <div className="lds-failed"></div>
                                : null 
                            }
                        </li>
                    ))}
                </ul>
            </div>
            <button>Retour A l'accueil</button>
        </div>
    )
}

export default ContentPublish;