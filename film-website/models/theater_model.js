var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TheaterSchema = new Schema({
	theater_name: {type: String, unique:true},
	theater_detail: {type:String},
	location: String,
	auditorium_count: String,
	auditorium: [{type: Schema.ObjectId, ref:'Auditorium'}]
}, {collection:'Theater'});

var Theater = mongoose.model('Theater', TheaterSchema);

var AuditoriumSchema = new Schema({
	theater_name: {type: String},
	Auditorium_name: {type: String},
	on_show: [{type: Schema.ObjectId, ref:'Show'}]
}, {collection:'Auditorium'});

var Auditorium = mongoose.model('Auditorium', AuditoriumSchema);

var ShowSchema = new Schema({
	theater_name: {type: String},
	theater_detail: {type:String},
	Auditorium_name: {type: String},
	film_name: {type: String},
	time_set: {type: Date},
	price: {type: String},
	seat: {type: String}
}, {collection:'Show'});

var Show = mongoose.model('Show', ShowSchema);