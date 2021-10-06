const express= require("express")
const router = express.Router()
const fs = require('fs');

/*EXERCISES*/ 
//exercices , make exercise set
router.get("/exercises/:exerciseId", function (req,res){
    let rd = fs.readFileSync("./public/exercises.json")
    exercises = JSON.parse(rd)
    selected ="no such exercise"
    for (ex of exercises) {
        if(ex["id"] == req.params.exerciseId){
            selected = ex
        }
    }
    res.send(selected)
})

//NLP  get traduction ,japanese :: omae wa mo shindeiru => tu es déjà mort
router.post("/traduction", function (req,res){
    res.send("traduction of is ")
    //make api call and get results
})

module.exports = router