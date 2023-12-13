
import axios from "axios";

const EXERCISE_CONTENT = "http://localhost:5000/exercises";
const COURSE_CONTENT = "http://localhost:5000/courses";

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
        type : params.contentType,
        lang : params.language,
        theme : params.theme,
        level : params.level
    })

}