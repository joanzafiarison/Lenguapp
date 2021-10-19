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

//NLP  get traduction ,japanese :: omae wa mo shindeiru => tu es déjà mort
router.post("/traduction", function (req,res){
    const {TextToTranslate,textToTranslate} = req.body
    //let msg = api(req.body)
    //console.log(msg)
    res.send("traduction ...")

    //apiCall to NLP
    //make api call and get results
})

module.exports = router