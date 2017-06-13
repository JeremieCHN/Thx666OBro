var express = require('express');

module.exports = function(app) {
	var user = require('../controllers/user_controller.js');
	var film = require('../controllers/film_controller.js');
	var sms = require('../controllers/ihuyi.js');
	var send_message = new sms();

	app.use('/static', express.static('./static'));

    app.get('/', function(req, res) {
        console.log('request to route /');
        res.render('home/home');
        //res.send('Hello World');
    });
    app.get('/movielist', function(req, res) {
        console.log('request to route /');
        res.render('movielist/movielist');
        //res.send('Hello World');
    });

	app.post('/', function(req,res) {
		console.log('post to /');
		res.render('home/home');
	});

	app.get('/login', function(req, res) {
		console.log('request to login page');
		if(req.session.user) {
			res.redirect('/');
		}
		else {
			//res.sendfile('./views/auth/login.html');
			res.render('auth/login');
		}
	});

	app.post('/login', user.login);

	app.get('/register', function(req, res){
		console.log('request to register page');
		if(req.session.user) {
			res.redirect('/');
		}
		else {
			res.render('auth/register');
		}
	});

	app.post('/register', user.register);

	app.post('/check_tel', user.check_tel);

	app.get('/logout', user.logout);

	app.post('/upload', user.upload);
	//app.post('/preview_pic', user.preview_pic);

	app.get('/get_avatar', user.get_avatar);

	//app.get('/add', film.addfilm);
	app.get('/getFilmList', film.getFilmList);
	//app.get('/getFilmLink', film.getFilmLink);
	app.get('/getFilmProfile', film.getFilmProfile);
}
