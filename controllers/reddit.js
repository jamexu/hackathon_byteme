var parser = require('rss-parser');
var reddit = {};

reddit.getArticles = function (req, res) {
	title = "WELCOME TO /r/" + req.params.subreddit
	console.log(title)

	parser.parseURL('https://www.reddit.com/.rss', function(err, parsed) {
			// console.log(parsed.feed.title);
			// parsed.feed.entries.forEach(function(entry) {
			// 		console.log(entry.title + ':' + entry.link);
			// })
			parsed.feed.entries.forEach(function(entry) {
					console.log(entry.title)
					console.log(entry.link)

			})
	})

};

reddit.likeArticle = function (req, res) {
	
};

module.exports = reddit;
