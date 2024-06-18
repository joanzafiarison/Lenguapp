
import axios from "axios";


let base_url = process.env.REACT_APP_BASE_URL;

const EXERCISE_URL = base_url+"/exercises";
const COURSE_URL = base_url+"/courses";
const SCORE_URL = base_url+"/scores";




export  async function getExercisesFeed(params){
    console.log("params ",params)
    return await axios.post(EXERCISE_URL, {
        type : params.type,
        lang : params.lang,
        theme : params.theme,
        level : params.level
    })

}

export async function getExerciseById(exercise_id){
    return  await axios.get(`${COURSE_URL}/${exercise_id}`);
}


export async function sendScore(content , selected, user){
    return await axios.post(SCORE_URL,
        {
            content : selected,
            user_id: user.user_id,
            type:content.type,
            theme : content.theme,
            language: content.language
    })
}

export  async function getCoursesFeed(params){
    console.log("params ",params)
    return await axios.post(COURSE_URL, {
        type : params.type,
        lang : params.lang,
        theme : params.theme,
        level : params.level
    })

}