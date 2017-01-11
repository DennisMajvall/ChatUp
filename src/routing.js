'use strict';

var routes = {
	'/send-message/:message': function(req, res) {
		console.log('lol');
		res.json({ok:"messaged recieved"});
	},
	'/read-messages/:lastTime': function(req, res) {
		console.log('read_lol_read');
		res.json({ok:"no messages"});
	},
};

module.exports = function(app) {
	for (var name in routes) {
		app.get(name, routes[name]);
	}
}
