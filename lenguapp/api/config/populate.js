const fs = require("fs");
connexion = require("./database.js");
const ExerciseSchema = require("../models/exercise");
const Exercise = connexion.model("Exercise",ExerciseSchema);


//dictionnaire
//sentences
    //words
    //composition
    //struct
//exercise
//cours
let test_path = "../resources/populate/mg/exercise/food-1.json";
function insertWordsFromFile() {
    fs.readFile(test_path, "utf8", async (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(JSON.parse(data));
        await Exercise.insertMany(JSON.parse(data));

      });
    //extract from JSON
    //match keys
}

insertWordsFromFile();
