const express= require("express")
const router = express.Router()

/*USER SCORES*/
// scores by user id
router.get("/user/:userId/scores",function (req,res){
    let rawdata = fs.readFileSync('./public/users.json');
    let users = JSON.parse(rawdata);
    selected = "no such user"
    for (user of users ) {
        if (user["id"] == req.params.userId){
            selected = user
        }
    }
    res.send(selected["scores"])
})
//add a score
router.post("/user/:userId/score", function (req,res) {

})

//delete a score
router.delete("/user/:userId/score/:scoreId", function (req,res) {

})


module.exports = router