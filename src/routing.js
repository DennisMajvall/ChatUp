'use strict';

var messages = [];

var get_routes = {
	'/read-messages/:lastTime': function(req, res) {
		res.json( messages );
	}
};

var post_routes = {
	'/send-message/:message': function(req, res) {
		messages.push({ text: req.params.message });
		res.json({ok:"messaged recieved"});
	}
};

module.exports = function(app) {
	for (var name in get_routes) {
		app.get(name, get_routes[name]);
	}
	for (var name in post_routes) {
		app.post(name, post_routes[name]);
	}
}
