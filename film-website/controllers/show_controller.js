var mongoose = require('mongoose');
var Show = mongoose.model('Show');

exports.get_theater = function(film_name) {
	Show.find({film_name: film_name})
		.exec(function(err, shows) {
			if(err) {
				return [];
			} else {
				var theater = [];
				for (show in shows) {
					var showdata = {
						theater_name: shows[show].theater_name;
						theater_detail: shows[show].theater_detail;
					}
					var tmp = true;
					for(th in theateer) {
						console.log(th);
						if (th.theater_name == showdata.theater_name) {
							tmp = false;
						}
					}
					if(tmp)	theater.push(showdata);
					console.log(theater);
				}
				return theater;
			}
		});
}