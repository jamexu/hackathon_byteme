var express = require('express');
var reddit = require('./controllers/reddit');

var app = express();
var PORT = 8080;

// Routes
app.get('/', function (req, res) {
	res.send('OK');
});
app.get('/reddit/:subreddit', reddit.getArticles);

// Start server
app.listen(PORT, function () {
	console.log('server started on port ' + PORT);
});
