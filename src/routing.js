'use strict';

var messages = [];
var listeners = [];

var get_routes = {
	'/read-messages/:lastTime': readMessagesRequest
};

var post_routes = {
	'/send-message': sendMessageRequest
};

function updateListeners() {
	res.json( messages );
}


function readMessagesRequest(req, res) {
	res.json( messages );
	return;
	var listener = {
		res: res,
		latestMsg: req.params.lastTime
	};
	listeners.push(listener);
	updateListeners();
}

function sendMessageRequest(req, res) {
	var msg = {
		text: req.body.text,
		timeReceived: new Date().getTime()
	}

	messages.push(msg);
	res.json({ok:"ok"});
}

module.exports = function(app) {
	for (var name in get_routes) {
		app.get(name, get_routes[name]);
	}
	for (var name in post_routes) {
		app.post(name, post_routes[name]);
	}
}
