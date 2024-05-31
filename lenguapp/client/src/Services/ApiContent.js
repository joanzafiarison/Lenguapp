
import axios from "axios";

const EXERCISE_CONTENT = "/exercises";
const COURSE_CONTENT = "/courses";
//process.env.REACT_APP_API_BASE_URL

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