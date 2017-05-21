var express 	= require('express');
var multer 		= require('multer');
var models  	= require('../models/index');
var Post    	= models.post;
var router  	= express.Router();
var sharp 		= require('sharp');
var Comment 	= models.comment;
var uploadHandler = multer({dest: 'public/images/posts'});

// Index.
router.get('/', function(request, response) {
	Post.findAll().then(function(posts) {
		response.render('blog/index', {
			posts: posts
		});
	});
});

// Search.
router.get('/search', function(request, response) {
	var query     = request.query.query;
	var condition = `%${query}%`;

	Post.findAndCountAll({
		where: {
			$or: {
				title: {
					$iLike: condition
				},
				body: {
					$iLike: condition
				}
			}
		}
	}).then(function(result) {
		response.render('blog/search', {
			query: query,
			count: result.count,
			posts: result.rows
		});
	});
});

// New.
router.get('/new', function(request, response) {
	// console.log("this is weird");
	response.render('blog/new', {
		post: {}
	});
});

// Create.
router.post('/', uploadHandler.single('image'), function(request, response) {
	// console.log("created posts");
	Post.create({
		title: request.body.title,
		body:  request.body.body,
		author: request.body.author,
		imageFilename: (request.file && request.file.filename)
	}).then(function(post) {
		sharp(request.file.path)
		.resize(300, 300)
		.max()
		.withoutEnlargement()
		.toFile(`${request.file.path}-thumbnail`, function() {
			response.redirect(`/blog/${post.id}`);
		});
	}).catch(function(error) {
		response.render('blog/new', {
			post:   request.body,
			errors: error.errors
		});
	});
});

// Show.
router.get('/:iden', function(request, response) {
	Post.findById(request.params.iden).then(function(post) {
		// console.log(post);
		// console.log("that was the post");
		response.render('blog/show', {
			post: post
		});
	});
});

// Comments.
// router.post('/:iden/comments', function(request, response) {
// 	Post.findById(request.params.iden).then(function(post) {
// 		post.createComment({
// 			body:   request.body.body,
// 			author: request.body.author,
// 		}).then(function(comment) {
// 			response.redirect(post.id);
// 		}).catch(function(error) {
// 			response.render('blog/show', {
// 				post:    post,
// 				comment: request.body,
// 				errors:  error.errors
// 			});
// 		});
// 	});
// });


module.exports = router;
