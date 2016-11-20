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

		for (i = 0; i < score; i++) {
			arr.push(subreddit)
		}
		return arr
	}));

	// Build index map
	var indexes = {};
	_.each(subreddits, function (subreddit) {
		indexes[subreddit] = 0;
	});
	console.log(indexes);

	// Get Subreddit RSS
	Promise.map(subreddits, function (subreddit) {
		return new Promise(function (resolve, reject) {
			parser.parseURL('https://www.reddit.com/r/' + subreddit + '.rss', function(err, parsed) {
				if (err) {
					reject();
				} else {
					var data = _.map(parsed.feed.entries, function (entry) {
						var img = null;

						var gifv_pattern = /http:\/\/i\.imgur\.com\/(\w|_|-)+\.gifv/g;
						if (gifv_pattern.test(entry.content)) {
							var gifv = entry.content.match(gifv_pattern);
							img = gifv.toString().replace('.gifv', '.mp4');
						} else {
							var thumbnail_pattern = /https:\/\/[a-z]\.thumbs\.redditmedia\.com\/(\w|_|-)+\.jpg/g;
							if (thumbnail_pattern.test(entry.content)) {
								var thumbnail = entry.content.match(thumbnail_pattern);
								img = thumbnail;
							}
						}

						return {
							title: entry.title,
							url: entry.link,
							img: img ? img[0] : null
						}
					});

					resolve({
						subreddit: subreddit,
						data: data
					});
				}
			});
		});
	}).then(function (parsed) {

	});
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
