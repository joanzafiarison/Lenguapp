//disponibilité de .env

const express = require("express");
const cors = require("cors")
const path = require("path")

var corsOptions = {
  exposedHeaders: "Authorization"
}

const app = express(); 
app.use(cors(corsOptions));


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

/*1- middleware(cookie , JWT)*/ 
/*2-DB MONGO(CONNEXION OK)+ SCHEMAS(OK) + WRITE REQUETES(EN COURS) --- mongoose then MAKING DAO implementation*/
/*--- a   Auth(80%) reste Token , exercises , users , posts , friends , apiRoute , scoreRoutes */
/*3-React serving ==> OK*/
/*4-External routing ==> OK */
/*5-3 games  #andYouSay(quizz situationnel) #words(quizz) #buildSentences(mots par briques)*/
/*Rotation OK , score () , UI train */ 
/*6 - react router */
//serve build version of react app
app.use(express.static(path.join(__dirname,"client/build")))
app.use(express.static(path.join(__dirname,"client/public")))

//middleware to parse body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
    origin: true,
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

app.use('/',apiRouter);
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', friendRouter); 
app.use('/',authRouter)




app.listen(5000 , () => {
    console.log("server started on port 5000")
})
