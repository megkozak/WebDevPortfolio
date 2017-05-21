var express = require('express');
var router  = express.Router();

router.get('/', function(request, response) {
	response.render('portfolio/index', {
		sendThis: 'HI'
	});
});

module.exports = router;
