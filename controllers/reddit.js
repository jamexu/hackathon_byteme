var parser = require('rss-parser');
var reddit = {};

reddit.getArticles = function (req, res) {
	title = "WELCOME TO /r/" + req.params.subreddit

	parser.parseURL('https://www.reddit.com/r/' + req.params.subreddit + '.rss', function(err, parsed) {
		  largeString = ''
			count = 0

			parsed.feed.entries.forEach(function(entry) {
				  count += 1
					var entryTitle = entry.title
					var url = entry.link
					largeString += '<a href="' + url + '">' + entryTitle + '</a><br><br>'

					var gifv_pattern = /http:\/\/i\.imgur\.com\/(\w|_|-)+\.gifv/g;
					if (gifv_pattern.test(entry.content)) {
							var gifv = entry.content.match(gifv_pattern)
							console.log('gifv ' + gifv)
							largeString += '<video preload="auto" autoplay="autoplay" loop="loop" style="width: 200px; height: 200px;"><source src="' + gifv.toString().replace('.gifv', '.mp4') + '" type="video/mp4"></source></video><br><br>'
					}
					else {
							var thumbnail_pattern = /https:\/\/[a-z]\.thumbs\.redditmedia\.com\/(\w|_|-)+\.jpg/g;
							if (thumbnail_pattern.test(entry.content)) {
									var thumbnail = entry.content.match(thumbnail_pattern)
									largeString += '<img src="' + thumbnail + '" alt="' + entryTitle + '"><br><br>'
							}
					}
			})
			res.send(title + '<br>Parsed ' + count + ' images. <br><br>' + largeString)
	})

};

reddit.likeArticle = function (req, res) {

};

module.exports = reddit;
