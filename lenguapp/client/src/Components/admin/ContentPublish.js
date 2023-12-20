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
        "status":"succeed"
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
    const { options, content} = useCourse();
    const [status_, setStatus] = useState(status)

    useEffect( () => {
        console.log("options ",options);
        console.log("content ",content);
        const fetchData = async () => {
            return await axios.post("http://localhost:5000/course/create",{options, content})
                                //.then(res=>console.log(res))
                                //.catch(console.log)
        }

        function levelOk () {
            //fonction qui check si les mots sont bien du bon level
            let newStatus = [...status];
            setTimeout(() => {
                newStatus[0].status = options.level === "beginner" ? "succeed" : "failed";                
                setStatus(newStatus)
            },3000)

        }

        function themeOk () {
            // fonction qui check si les mots sont bien du bon thème
            let newStatus = [...status];
            
            setTimeout(() => {
                newStatus[1].status = options.theme == "economics" ? "succeed" :"failed";
                setStatus(newStatus)
            },8000)
        }

        function publishedOk () {
            let newStatus = [...status];
            //publication des données et vérifier si les données sont corrects
            setTimeout(async () => {
                let resp = await fetchData()
                console.log("publish request",resp);
                newStatus[4].status = resp.data.status === "ok" ? "succeed" : "failed";
                setStatus(newStatus)
            },10000)
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
                <h2>{options.name}</h2>
            </div>
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