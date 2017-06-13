var mongoose = require('mongoose');
var Film = mongoose.model('Film');
//var Show = mongoose.model('Show');
var Comment = mongoose.model('Comment');

exports.addfilm = function(req, res) {
	var type = "1";
	var film_name = "神偷奶爸3";
	var film_ename = "Despicable Me 3";
	var film_classify = "喜剧,动画,冒险";
	var film_long = "美国 / 90分钟";
	var film_detail = "影片将延续前两部的温馨搞笑风格，聚焦格鲁和露西的婚后生活，继续讲述格鲁和三个女儿的爆笑故事。";
	var picture_url = "/static/films/images/coming/despicable.jpg";
	var video_link = "https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=f050603jqm8&auto=0";
	var show_date = new Date("2017,7,7");

	console.log("adding");
	var film = new Film({film_name: film_name});
		film.set('type', type);
		film.set('film_ename', film_ename);
		film.set('film_detail', film_detail);
		film.set('picture_url', picture_url);
		film.set('video_link', video_link);
		film.set('show_date', show_date);
		film.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				res.status(404);
				res.end();
			} else {
				console.log("ok");
				//req.session.msg = 'success';
				res.status(200).json(data);
				res.end();
			}
		});
}


exports.getFilmList = function(req, res) {
	var type = req.query.type;
	//console.log(req);
	//console.log(type);
	Film.find({type: type})
		.exec(function(err, films){
			if(!films) {
				res.status(404);
				res.end();
			} else {
				//console.log(films);
				var data = {data: []};
				for (film in films) {
					//console.log(films[film]);
					var filmdata = {
						film_name: films[film].film_name,
						picture_url: films[film].picture_url
					}
					data.data.push(filmdata);
				}
				//console.log(data);
				//console.log(data[0]);
				res.status(200).json(data);
				res.end();
			}
		});
}


exports.getFilmLink = function(req, res) {
	var film_name = req.body.film_name;
	Film.findOne({film_name: film_name})
		.exec(function(err, film) {
			if(err) {
				res.status(404);
				res.end();
			} else {
				res.status(200).json({video_link: film.video_link});
				res.end();
			}
		});
}


exports.getFilmProfile = function(req, res) {
	var film_name = req.query.film_name;
	Film.findOne({film_name: film_name})
		.exec(function(err, film) {
			if(err) {
				res.status(404);
				res.end();
			} else {
				console.log(film);
				console.log(film.type);
				var data = {
					//type: film.type,
					film_name : film.film_name,
					film_ename : film.film_ename,
					film_classify : film.film_classify,
					film_long : film.film_long,
					film_detail : film.film_detail,
					picture_url : film.picture_url,
					video_link : film.video_link,
					show_date : film.show_date,
					score: film.score
				}
				console.log(data);
				res.status(200).json(data);
				res.end();
			}
		});
}

exports.getList = function(req, res) {
	Film.find().exec(function(err, films) {
		if(err) {
			res.status(404);
			res.end();
		} else {
			var filmlist = {filmlist: []};
			for(film in films) {
				var data = {
					type: films[film].type,
					film_name : films[film].film_name,
					film_ename : films[film].film_ename,
					film_classify : films[film].film_classify,
					film_long : films[film].film_long,
					film_detail : films[film].film_detail,
					picture_url : films[film].picture_url,
					video_link : films[film].video_link,
					show_date : films[film].show_date,
					score: films[film].score
				}
				filmlist.filmlist.push(data);
			}
			res.status(200).json(filmlist);
			res.end();
		}
	});
}


exports.getFilmDetail = function(req, res) {
	var film_name = req.query.film_name;
	Film.findOne({film_name:film_name})
		.exec(function(err, film) {
			if(err) {
				res.status(404);
				res.end();
			} else {
				var data = {};
				data.film_msg = {
					type: film.type,
					film_name : film.film_name,
					film_ename : film.film_ename,
					film_classify : film.film_classify,
					film_long : film.film_long,
					film_detail : film.film_detail,
					picture_url : film.picture_url,
					video_link : film.video_link,
					show_date : film.show_date,
					score: film.score
				};
				//data.theaters = Show.get_theater(film.film_name);
				data.comment = Comment.get_comment(film.film_name);
				res.status(200).json(data);
				res.end();
			}
		});
}

exports.changeFilmScore = function(req, res) {
	var film_name = req.body.film_name;
	Film.findOne({film_name: film_name})
		.exec(function(err, film) {
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				//console.log(req.body.score);
				film.set('score', req.body.score);
				film.save(function(err) {
					if(err) {
						console.log(err);
						res.status(404);
						res.end();
					} else {
						console.log("change success");
						res.status(200);
						res.end();
					}
				});
			}
		});
}
