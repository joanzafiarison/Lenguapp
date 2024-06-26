const express= require("express")
const {spawn} = require('child_process');
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



const LANG = {
    "eng" : "english",
    "mg":"malagasy",
    "fr" : "french",
    "jp" :"japanese",
    "de" :"deutch",
    "sw" :"swahili"
}


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
    console.log("exercises", JSON.stringify(exercise))
   }
    catch(e) {
        console.log(e)
    }
   res.send(exercise)
})

router.post("/exercise/create", async function (req,res){
    const {options , content} = req.body;
    const { theme, name, level, lang_dest,  lang_src} = options;
    let exercises = []
    let operation = {}
   try {
    exercises = await Exercise.find({theme : theme, name : name , level : level, language : lang_dest , from : lang_src })
    // operation check si unique
    if (exercises.length == 0){
        console.log("le cours est inédit")
        console.log("contenu", content)
        operation = await Exercise.insert({})
    }
    
   }
    catch(e) {
        console.log("duplicate", e)
    }
   res.send(operation)
})

//get courses OK
router.post("/courses/", async function (req,res){
    let courses = [];
    const {theme, level} = req.body;
    console.log("body ",req.body)
   try {
    courses = await Course.find({theme : theme, level : level})
   }
    catch(e) {
        console.log(e)
    }
    console.log("cours ",courses);
   res.send(courses)
})
//create a course OK
router.post("/course/create", async function (req,res){
    const {options , content} = req.body;
    const { theme, name, type, level, lang_dest,  lang_src} = options;
    let courses = []
    let operation = {}
    console.log("create course?")
   try {
    courses = await Course.find({theme : theme, name : name , level : level, language : lang_dest , from : lang_src })
    // operation check si unique
    if (courses.length == 0){
        console.log("le cours est inédit")
        console.log("contenu", content)
        operation = await Course.create({...options, content : content})
    }
    
   }
    catch(e) {
        console.log("duplicate", e)
    }
   res.send(operation)
})



router.get("/courses/:course_id", async(req,res) => {
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
router.post("/words/search/", async function (req,res){
    const {lang, theme, level} = req.body
    let word_info = []
   try {
    if ( Object.keys(LANG).indexOf(lang) != -1 ) {
        word_info = await Dico.find({
            lang : LANG[lang],
            theme : theme,
            level :level
        })
    }
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
    const {TextToTranslate,lang} = req.body
    //let msg = api(req.body)
    //console.log(msg)
    res.send("traduction ...")

    //apiCall to NLP
    //make api call and get results
})

//NLP  get POS
router.post("/pos", function (req,res){
    const {text, lang} = req.body

    var dataToSend;
    // spawn new child process to call the python script
    //const nlpUtils = spawn('py', ['-m','../utils/python/text2pos.py', text, lang]);
    const nlpUtils = spawn('ls');
    // collect data from script
    //console.log(nlpUtils)
    nlpUtils.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    nlpUtils.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    })
    // send data to browser
    res.send(dataToSend);
   

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
    const {content, user_id, type, theme, language } = req.body
    //TODO UserId Avec session
    let op = {"message" : "exercise record created"};
    console.log("scores in request")
    let total = content.length;
    let score = 0;
    for ( result of content) {
        if(result.item.solution.word === result.chosen ){
            score += 1
        }
    }
    op["score"] = score;
    op["total"] = total;
    let score_item = {
        score : score,
        total :total,
        content : content,
        type : type,
        theme :theme,
        language : language
    }
    console.log("score in route", score_item)
    if ( user_id !== ""){
        try {
            current_user = await User.find({_id : user_id}) 
            //Recupérer données sur les résultats TODO
            //+1, reussite
            //-1, echec
            //level?
            if(current_user.length == 1) {
                await User.updateOne(
                    {_id : user_id},
                    {
                        $push : {
                            "scores" : score_item
                        }
                    }
                )
            }
        }
        catch (e){
            throw new Error(e);
        }
    } else {
        op["message"] = "User_id not defined";
    }

    //calcul {
    /*item: { word: 'décreter', words: [Array], solution: 'decree' },
    chosen: 'order'
  },*/
    res.send(op);

})

router.post('/publish', (req,res) => {
    const {options , content } = req.body;
    console.log(options)
    res.send({
        "status" :"ok"
    })
})

router.post('/resources', (req,res)=>{
    // add query parameter for resource for example profile.png
    // then check user directory and send 
    const  { language, path } = req.body;
    let audioPath = "resources/audio/";

    if ( Object.keys(LANG).indexOf(language) != -1 && path != "") {
        audioPath += `${language}/${path}`;
        pipeFile(req,res, audioPath)
    }
    /*
    let audio = fs.readFileSync("resources/audio/mg_5.aac")
    console.log(audio)
    res.send("audio");*/

    })
module.exports = router