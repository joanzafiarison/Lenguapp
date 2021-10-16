const express= require("express")
const router = express.Router()
const fs = require('fs');


const db = require("../config/database")
const ExerciseSchema = require("../models/exercise")
const Exercise = db.model("Exercise",ExerciseSchema)

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

//NLP  get traduction ,japanese :: omae wa mo shindeiru => tu es déjà mort
router.post("/traduction", function (req,res){
    const {sentence} = req.body
    res.send("traduction of \""+sentence+"\" is ")
    //apiCall to NLP
    //make api call and get results
})

module.exports = router