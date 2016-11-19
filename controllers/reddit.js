var parser = require('rss-parser');
var reddit = {};

reddit.getArticles = function (req, res) {
	title = "WELCOME TO /r/" + req.params.subreddit
	console.log(title)

	parser.parseURL('https://www.reddit.com/r/' + req.params.subreddit + '.rss', function(err, parsed) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
		  largeString = ''
			count = 0
			parsed.feed.entries.forEach(function(entry) {
					var pattern = /https:\/\/a\.thumbs\.redditmedia\.com\/(\w|_|-)+\.jpg/g;
					if (pattern.test(entry.content)) {
						  count += 1
							// console.log('Title: ' + entry.title)
							largeString += entry.title + '<br>'
							var img = entry.content.match(pattern);
							// console.log('img: ' + img)
							largeString += img + '<br><br>'
					}
			})
			res.send('Parsed ' + count + ' images. <br><br>' + largeString)
	})

};

reddit.scoreArticle = function (req, res) {
	var subreddit = req.body.subreddit;
	var score = req.body.score;
	var prevScore = req.db.get('scores.' + subreddit).value();

	if (isNumber(prevScore)) {
		score += prevScore;
	}

	req.db.set('scores.' + subreddit, score).value();

	res.send('OK');
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = reddit;
