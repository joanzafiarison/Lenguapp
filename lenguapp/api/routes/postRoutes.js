const express= require("express")
const router = express.Router()
const fs = require('fs');


const db = require("../config/database")
const PostSchema = require("../models/post")
const Post = db.model("Posts",PostSchema)
/*USER POST*/
// post by user id

router.get("/feed", async function (req,res) {
    let posts = []
   try {
    posts = await Post.find()
   }
    catch(e) {
        console.log(e)
    }
   res.send(posts)
})

router.get("/user/:userId/posts",function (req,res){
    let rawdata = fs.readFileSync('./public/users.json');
    let users = JSON.parse(rawdata);
    selected = "no such user"
    for (user of users ) {
        if (user["id"] == req.params.userId){
            selected = user
        }
    }
    res.send(selected["posts"])
})

//create post
router.post("/user/:userId/post",function (req,res){

})

//create post
router.delete("/user/:userId/post",function (req,res){
    
})

//create post
router.put("/user/:userId/post",function (req,res){
    
})

/*POSTS*/


router.post("/post/:postId/comment",function (req,res){
    res.send("make a comment : "+req.params.postId)
})

router.delete("/post/:postId/comment",function (req,res){
    res.send("delete a comment : "+req.params.postId)
})

router.put("/post/:postId/comment",function (req,res){
    res.send("modify a comment : "+req.params.postId)
})


//commentaires d'un post
router.get("/post/:postId/comments",function (req,res){
    let rawdata = fs.readFileSync('./public/posts.json');
    let posts = JSON.parse(rawdata);
    selected = "no such post"
    for (post of posts ) {
        if (post["id"] == req.params.postId){
            selected = post["comments"]
        }
    }
    res.send(selected)
})
//post en entier
router.get("/post/:postId",async function (req,res){
    
    let post = {}

    try {
        post = await Post.find({_id : req.params.postId}); 
    }
    catch{
        console.log("post not found or error")
    }
    
    res.send(post)
})

module.exports = router