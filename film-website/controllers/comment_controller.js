var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
//var Reply = mongoose.model('Reply');

exports.get_comment = function(req, res) {
	Comment.find({film_name: req.query.film_name})
		.exec(function(err, comments) {
			console.log(comments.length);
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
				//return [];
			} else {
				console.log('ok');
				var commentdata = {data: []};
				for (comment in comments) {
					console.log(comment);
					var data = {
						username: comments[comment].username,
						content: comments[comment].content,
						timestamp: comments[comment].timestamp
					}
					commentdata.data.push(data);
				}
				res.status(200).json(commentdata);
				res.end();
				//return comments;
			}
		});
}


exports.add_comment = function(req, res) {
	var comment = new Comment({username: req.body.username});
	comment.set('film_name', req.body.film_name);
	console.log(req.body.film_name);
	comment.set('content', req.body.content);
	comment.save(function(err) {
		if(err) {
			console.log(err);
			res.status(404);
			res.end();
		} else {
			console.log('ok');
			res.status(200);
			res.end();
		}
	});
}

/*exports.add_reply = function(req, res) {

}*/