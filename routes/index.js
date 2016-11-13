var express = require('express');
var router = express.Router(),
fs = require('fs');

router.get('/', function(req, res) {
	res.render('index', { title: 'Stand Out Talent' });
});

router.get('/kiosk/:label', function(req, res) {
	var label = req.params.label;

	res.render('index', { title: label });
});

router.get('/slides/:label', function(req, res) {
	var label = req.params.label;

	loadDirectory(label, function(result) {
		console.log(result);
		res.json(result);
	});
});

function loadDirectory(directory, callback) {
	var imageArray = [];

	console.log(__dirname);

	var baseDirectory = __dirname + "/../public/img/slides/" + directory + "/";

	fs.readdir(baseDirectory, function(err, files) {
		if (err) {
			console.error(err);
			callback(['/img/logo.png']);
		} else {
			files.forEach(function(f) {
				if (f.indexOf('.') === 0 return;
				console.log('Adding: ' + f);
				imageArray.push('/img/slides/' + directory + '/' + f);
			});
			callback(imageArray);
		}
	});
}

module.exports = router;
