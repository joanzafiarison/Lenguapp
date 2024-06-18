require('dotenv').config();

const express = require('express');
const cors = require("cors");
const path = require('path');

const app = express();
//const { sql } = require('@vercel/postgres');

app.set('port', (process.env.PORT || 8081));
app.use(express.static('build'));
//app.use(express.static("build"));

//middleware to parse body : ERROR String is required at parse
/*app.use(express.json())
//app.use(express.urlencoded({ extended: true }))*/

var corsOptions = {
	//exposedHeaders: "Authorization",
	origin : true
  }

app.use(cors(corsOptions))


//DB connexion = require("./config/database")*
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
app.use('/', userRouter);
app.use('/', authRouter);
//const publicPath = path.join(__dirname, '..', 'build');
//app.use(express.static(publicPath));
//app.use('*', express.static(publicPath));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/about', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'));
});

app.get('/ressources', function (req, res) {
	res.json({"message" :"ok"})
});

app.listen(app.get('port'), function() {
	console.log('Express app vercel-express-react-demo is running on port', app.get('port'));
  });

module.exports = app;