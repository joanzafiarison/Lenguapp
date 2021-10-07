const express = require("express");

const path = require("path")
const router = express.Router()
const app = express(); 


connexion = require("./config/database")


const apiRouter = require('./routes/apiRoutes')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes') 
const friendRouter = require('./routes/friendRoutes')
const authRouter = require('./routes/authRoutes')

/*BONUS*/
/*Live socket interaction*/ 
/*Test on network response*/ 
/*Scrapping jobs to get legal vocabulary in medium or easy websites"*/

/*1-Oauth --- JWT--- , cookie session -- middleware*/ 
/*2-DB MONGO(CONNEXION OK)+ SCHEMAS(OK) + WRITE REQUETES(TODO) --- mongoose then MAKING DAO implementation*/
/*3-React serving ==> OK*/
/*4-External routing ==> OK */
/*5-3 games  #andYouSay(quizz situationnel) #words(quizz) #buildSentences(mots par briques)*/
/*6 - react router */
//serve build version of react app
app.use(express.static(path.join(__dirname,"..","build")))
app.use(express.static(path.join(__dirname,"public")))

//middleware to parse body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/',apiRouter);
app.use('/', friendRouter); 
app.use('/',authRouter)

app.listen(5000 , () => {
    console.log("server started on port 5000")
})
