var parser = require('rss-parser');
var Promise = require('bluebird');
var _ = require('underscore');
var reddit = {};

var subreddits = [
	"aww",
	"funny",
	"mildlyinteresting",
	"gifs",
	"earthporn",
	"wallpapers",
	"cityporn",
	"MostBeautiful",
	"pics",
	"lolcats"
];

reddit.getArticles = function (req, res) {
	var db = req.db;

	// SHIFT SCORE
	var scores = db.get('scores').value();
	var min = _.min(_.map(subreddits, function (subreddit) {
		var score = db.get('scores.' + subreddit).value();
		if (!isNumber(score)) {
			score = 0;
		}
		return score;
	}));

	var floor = 0;
	if (min <= 0) {
		floor = -1 * min + 1;
	}

	var histogram = _.flatten(_.map(subreddits, function (subreddit) {
		var arr = []
		var score = db.get('scores.' + subreddit).value();

		if (!isNumber(score)) {
			score = 0;
		}

		score += floor;

		// BUILD ARRAY
		for (i = 0; i < score; i++)
		{
			arr.push(subreddit)
		}
		return arr
	}));

	console.log(histogram)


	Promise.map(subreddits, function (subreddit) {
		return new Promise(function (resolve, reject) {
			parser.parseURL('https://www.reddit.com/r/' + subreddit + '.rss', function(err, parsed) {
				if (err) {
					reject();
				} else {
					resolve({
						subreddit: subreddit,
						parsed: parsed
					});
				}
			});
		});
	}).then(function (parsed) {

	});

	/*
	title = "WELCOME TO /r/" + req.params.subreddit

	parser.parseURL('https://www.reddit.com/r/' + req.params.subreddit + '.rss', function(err, parsed) {
		largeString = '';
		count = 0;

		parsed.feed.entries.forEach(function(entry) {
			count += 1;
			var entryTitle = entry.title;
			var url = entry.link;
			largeString += '<a href="' + url + '">' + entryTitle + '</a><br><br>';

			var gifv_pattern = /http:\/\/i\.imgur\.com\/(\w|_|-)+\.gifv/g;
			if (gifv_pattern.test(entry.content)) {
				var gifv = entry.content.match(gifv_pattern);
				console.log('gifv ' + gifv);
				largeString += '<video preload="auto" autoplay="autoplay" loop="loop" style="width: 200px; height: 200px;"><source src="' + gifv.toString().replace('.gifv', '.mp4') + '" type="video/mp4"></source></video><br><br>';
			} else {
				var thumbnail_pattern = /https:\/\/[a-z]\.thumbs\.redditmedia\.com\/(\w|_|-)+\.jpg/g;
				if (thumbnail_pattern.test(entry.content)) {
					var thumbnail = entry.content.match(thumbnail_pattern);
					largeString += '<img src="' + thumbnail + '" alt="' + entryTitle + '"><br><br>';
				}
			}
		});
		res.send(title + '<br>Parsed ' + count + ' images. <br><br>' + largeString);
	});*/
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
