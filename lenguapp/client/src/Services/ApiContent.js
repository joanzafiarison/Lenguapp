
import axios from "axios";


let base_url = process.env.REACT_APP_BASE_URL;

const EXERCISE_CONTENT = base_url+"/exercises";
const COURSE_CONTENT = base_url+"/courses";




export  async function getExercisesFeed(params){
    console.log("params ",params)
    return await axios.post(EXERCISE_CONTENT, {
        type : params.type,
        lang : params.lang,
        theme : params.theme,
        level : params.level
    })

}

export  async function getCoursesFeed(params){
    console.log("params ",params)
    return await axios.post(COURSE_CONTENT, {
        type : params.type,
        lang : params.lang,
        theme : params.theme,
        level : params.level
    })

}