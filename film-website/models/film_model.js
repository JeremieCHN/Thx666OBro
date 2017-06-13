var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
	film_name: {type: String, unique:true},
	film_ename: String,
	type: String,
	film_classify: String,
	film_long: String,
	film_detail: String,
	picture_url: String,
	video_link: String,
	score: String,
	show_date: {type: Date},
	user_favourite: [{type: Schema.ObjectId, ref:'User', default: null}]
}, {collection:'Film'});

var Film = mongoose.model('Film', FilmSchema);
