require('dotenv').config();

const express = require('express');
const app = express();
//const { sql } = require('@vercel/postgres');

const bodyParser = require('body-parser');
const path = require('path');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 8081));
//app.use(express.static('build'));
app.use(express.static("build"));

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