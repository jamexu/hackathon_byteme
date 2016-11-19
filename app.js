var express = require('express');
var low = require('lowdb');
var reddit = require('./controllers/reddit');

var app = express();
var PORT = 8080;

// Setup DB
const db = low('db.json');
db.defaults({
	likes: {},
	dislikes: {}
}).value();

// Add DB to middleware
app.use(function (req, res, next) {
	req.db = db;
	next();
})

// Routes
app.get('/', function (req, res) {
	res.send('OK');
});

app.get('/reddit/get/:subreddit', reddit.getArticles);
app.post('/reddit/like', reddit.likeArticle)

// Start server
app.listen(PORT, function () {
	console.log('server started on port ' + PORT);
});
