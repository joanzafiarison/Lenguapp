const express = require("express");

const path = require("path")
const router = express.Router()
const app = express(); 

const apiRouter = require('./routes/apiRoutes')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes') 
const friendRouter = require('./routes/friendRoutes')
const authRouter = require('./routes/authRoutes')

/*BONUS*/
/*Live socket interaction*/ 
/*Test on network response*/ 
/*Scrapping jobs to get legal vocabulary in medium or easy websites"*/

/*1-Oauth*/ 
/*2-MAKING DAO implementation*/
/*3-React serving*/
/*4-External routing ==> OK */
/*5-3 games  #andYouSay(quizz situationnel) #words(quizz) #buildSentences(mots par briques)*/

app.use(express.static(path.join(__dirname,"public")))

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/',apiRouter);
app.use('/', friendRouter); 
app.use('/',authRouter)

app.listen(5000 , () => {
    console.log("server started on port 5000")
})
