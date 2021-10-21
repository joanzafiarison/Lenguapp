const express= require("express")
const router = express.Router()
const fs = require('fs');

const api = require("../services/apiConnect")


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
router.get("/exercises/", async function (req,res){
    let exercise = []
   try {
    exercise = await Exercise.find()
   }
    catch(e) {
        console.log(e)
    }
   res.send(exercise)
})
//get courses OK
router.get("/courses/", async function (req,res){
    let courses = []
   try {
    courses = await Course.find()
   }
    catch(e) {
        console.log(e)
    }
   res.send(courses)
})
//create a course OK
router.post("/course/", async function (req,res){
    const {theme,name,level,language,from} = req.body
    let courses = []
    let operation = {}
   try {
    courses = await Course.find({theme : theme, name : name , level : level, language : language , from : from  })
    // operation check si unique
    if (courses.length == 0){
        operation = await Course.create(req.body)
    }
    
   }
    catch(e) {
        console.log(e)
    }
   res.send(operation)
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
        sentences = await Sentence.find({sentence : sentence , language : language})
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
    const {content,user_id,type,theme} = req.body
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
        exercise_type : type,
        theme :theme
    }
    console.log("score in route",score_item)

    try {
        current_user = await User.find({_id : user_id}) 
        if(current_user.length == 1) {
            User.updateOne(
                {_id : user_id},
                {
                    $set : {
                        $push : {
                            scores : score_item
                        }
                    }
                }
            )
            .then((res) => console.log(res))
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
    res.send(`vous avez trouvé ${score} mots sur ${total}`)

})
module.exports = router