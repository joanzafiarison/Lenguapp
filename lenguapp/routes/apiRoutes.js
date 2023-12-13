const express= require("express")
const router = express.Router()


const api = require("../services/apiConnect");

const {pipeFile} = require("../services/file_module");


const db = require("../config/database")
const ExerciseSchema = require("../models/exercise")
const Exercise = db.model("Exercise",ExerciseSchema)

const CourseSchema = require("../models/courses")
const Course = db.model("Course",CourseSchema)

const DicoSchema = require("../models/dico")
const Dico = db.model("Dictionnary",DicoSchema)

const SentenceSchema = require("../models/sentences")
const Sentence = db.model("Sentences",SentenceSchema)

const UserSchema = require("../models/user")
const User = db.model("Users",UserSchema)






/*EXERCISES*/ 
//exercices , make exercise set
router.get("/exercises/:exerciseId", async function (req,res){
    let exercise = []
   try {
    exercise = await Exercise.find({_id : req.params.exerciseId})
   }
    catch(e) {
        console.log(e)
    }
   res.send(exercise)
})
//get exercises
router.post("/exercises/", async function (req,res){
    let exercise = [];
    const {theme,type,level,lang} = req.body;
    console.log(req.body);
   try {
    exercise = await Exercise.find({
        language : lang,
        theme : theme,
        level : level,
        type : type
    })
    console.log("exercises", exercise)
   }
    catch(e) {
        console.log(e)
    }
   res.send(exercise)
})
//get courses OK
router.post("/courses/", async function (req,res){
    let courses = [];
    console.log("body ",req.body)
   try {
    courses = await Course.find({theme : "food"})
   }
    catch(e) {
        console.log(e)
    }
    console.log("cours ",courses);
   res.send(courses)
})
//create a course OK
router.post("/course/", async function (req,res){
    const {options , content} = req.body;
    const { theme, name, level, lang_dest,  lang_src} = options;
    let courses = []
    let operation = {}
   try {
    courses = await Course.find({theme : theme, name : name , level : level, language : lang_dest , from : lang_src })
    // operation check si unique
    if (courses.length == 0){
        console.log("le cours est inédit")
        console.log("contenu", content)
        //operation = await Course.create(req.body)
    }
    
   }
    catch(e) {
        console.log(e)
    }
   res.send(operation)
})

router.get("/course/:course_id", async(req,res) => {
    const {course_id} = req.params
    let result = {}
    try {
        result = await Course.findOne({_id : course_id})
    }
    catch (e) {
        console.log(e)
    }

    res.send(result)
})
//search the traduction for a word
router.post("/dico/", async function (req,res){
    const {word,lang} = req.body
    let word_info = []
   try {
    word_info = await Dico.find({word : word , lang : lang})
   }
    catch(e) {
        console.log(e)
    }
   res.send(word_info)
})

//create a dico element
router.post("/dico/create", async function (req,res){
    const {word,lang} = req.body
    let word_info = []
    let result = {}
   try {
    word_info = await Dico.find({word : word , lang : lang})
    if(word_info.length == 0){
        result = await Dico.create(req.body)
    }
   }
    catch(e) {
        console.log(e)
    }
   res.send(result)
})


//NLP  get traduction ,japanese :: omae wa mo shindeiru => tu es déjà mort
router.post("/traduction", function (req,res){
    const {TextToTranslate,textToTranslate} = req.body
    //let msg = api(req.body)
    //console.log(msg)
    res.send("traduction ...")

    //apiCall to NLP
    //make api call and get results
})
//get all sentences
router.post("/sentences/find", async (req,res) => {
    const {sentence, language } = req.body
    let sentences = []
    try {
        sentences = await Sentence.find({ language : language})
    }
    catch (e){
        console.log(e)
    }

    res.send(sentences)
})

// create sentence
router.post("/sentences/create", async (req,res) => {
    const {sentence, language } = req.body
    let sentences = []
    let result = {}
    try {
        sentences = await Sentence.find({sentence : sentence , language : language})
        if(sentences.length == 0) {
            result = await Sentence.create(req.body)
        }
    }
    catch (e){
        console.log(e)
    }

    res.send(result)
})

router.post("/scores/" , async (req,res) => {
    const {content, user_id, type, theme} = req.body
    console.log("scores in request")
    let total = content.length
    let score = 0
    for ( result of content) {
        if(result.item.solution === result.chosen ){
            score += 1
        }
    }
    let score_item = {
        score : score,
        total :total,
        type : type,
        theme :theme,
        language : "japanese"
    }
    console.log("score in route",score_item)

    try {
        current_user = await User.find({_id : user_id}) 
        if(current_user.length == 1) {
            User.updateOne(
                {_id : user_id},
                {
                    $set : {
                        "email" : "new@email.com"
                    }
                }
            )
            .then((res) => console.log("res ",res))
            .catch((e)=> console.log(e))
        }
    }
    catch (e){
        console.log(e)
    }

    
    //calcul {
    /*item: { word: 'décreter', words: [Array], solution: 'decree' },
    chosen: 'order'
  },*/
    res.send({
        score:score,
        total:total
    })

})

router.post('/publish', (req,res) => {
    const {options , content } = req.body;
    res.send({
        "status" :"ok"
    })
})

router.post('/resources', (req,res)=>{
    // add query parameter for resource for example profile.png
    // then check user directory and send 
    const LANG = {
        "english" : "eng",
        "malagasy" : "mg",
        "french" :"fr",
        "japanese" :"jp",
        "deutch" : "de",
        "swahili" :"sw"
    }
    const  { language, path } = req.body;
    let audioPath = "resources/audio/";

    if ( Object.keys(LANG).indexOf(language) != -1 && path != "") {
        audioPath += `${LANG[language]}/${path}`;
        pipeFile(req,res,"resources/audio/eng/eng_subvenir.mp3")
    }
    /*
    let audio = fs.readFileSync("resources/audio/mg_5.aac")
    console.log(audio)
    res.send("audio");*/

    })
module.exports = router