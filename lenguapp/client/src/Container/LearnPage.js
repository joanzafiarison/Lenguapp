import React , {useState,useContext,useEffect} from "react"
import Sidebar from "../Components/Sidebar";
import FlashCard from "../Components/FlashCard";
import { useAppData , useAppDispatch } from "../Services/ContextProvider";
import { getCoursesFeed } from "../Services/ApiContent";

// MONGO --> va rechercher les thèmes existants / avec leur difficultés  
// endpoint /meta ... actualisé tous les X temps (perf)


function LearnPage (props) {
    const [text,setText] = useState("");
    const { search } = useAppData();
    const [content,setContent] = useState([]);
    
    //const routeName = props.history.location.pathname;

    async function handleSubmit(e){
        e.preventDefault();
        let newContent = await getCoursesFeed(search);
        if (newContent.data) {
            setContent(newContent.data);
        }
    }



    useEffect( () => {
        console.log("search ",search)
        async function loadData(){
            try {
                let contentData = await getCoursesFeed(search);
                console.log("data",contentData.data)
                if (contentData.data) {
                    setContent(contentData.data)
                }
                else {
                    console.log("no data found")
                }
                console.log("contenu ", content)
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
        
    },[])
  
    return (
     <div className="SearchContainer">
        <div id="searchbar">
            <form onSubmit={handleSubmit}>
                <p><input type="text" name="search" onChange={(e)=>setText(e.target.value)} /></p>
                <p><input type='submit'value="rechercher"/></p>
            </form>
        </div>
        
        <div id="search">
                    <Sidebar type="course" />
                    <div id="inline_search">
                        {content != null ?
                            content.map((exercise) => (
                                <FlashCard type={exercise.type} cardType="courses" theme={exercise.theme} language={exercise.language} exercise_id={exercise._id} key={exercise._id}/>
                            ))
                            :
                            <p>Pas d'exercices crées pour le moment</p>
                        }
                    </div>
        </div>
     </div>
    )
}


export default LearnPage