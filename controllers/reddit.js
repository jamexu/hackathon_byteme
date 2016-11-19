var parser = require('rss-parser');
var reddit = {};

reddit.getArticles = function (req, res) {
	title = "WELCOME TO /r/" + req.params.subreddit
	console.log(title)

	parser.parseURL('https://www.reddit.com/.rss', function(err, parsed) {
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

reddit.likeArticle = function (req, res) {

};

module.exports = reddit;
