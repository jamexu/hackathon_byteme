var express = require('express');

var app = express();
var PORT = 8080;

// Routes
app.get('/', function (req, res) {
	res.send('OK');
});

// Start server
app.listen(PORT, function () {
	console.log('server started on port ' + PORT);
});
