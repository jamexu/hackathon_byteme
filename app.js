var express = require('express');
var low = require('lowdb');
var bodyParser = require('body-parser');
var reddit = require('./controllers/reddit');

var app = express();
var PORT = 8080;

// Setup DB
const db = low('db.json');
db.defaults({
	scores: {}
}).value();

app.use(bodyParser.json());
app.use(function (req, res, next) {
	req.db = db;
	next();
})

// Routes
app.get('/', function (req, res) {
	res.send('OK');
});


app.get('/reddit/get/:subreddit', reddit.getArticles);
app.post('/reddit/score', reddit.scoreArticle)


// Start server
app.listen(PORT, function () {
	console.log('server started on port ' + PORT);
});
