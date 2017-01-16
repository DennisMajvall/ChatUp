'use strict';

var channels = { 'general': {} };

var routes = {
	/*
	'/example-route-two/': {
		func: exampleDoStuff,
		errFunc: exampleDoStuffErrorCheck,	// optional
		method: 'POST' 						// optionally 'GET' (default: 'POST')
	},
	*/
	'/send-message/': {
		func: sendMessage,
		errFunc: sendMessageErrorCheck
	},
	'/add-channel/': {
		func: addChannel,
		errFunc: addChannelErrorCheck
	}
};

//  -----   Message functions   -----

function addChannel(msg) {
	msg.type = 'addChannel';
	channels[msg.channelName] = {};
}

function sendMessage(msg) {
	msg.type = 'chatMsg';
}

//  -----   Error Check functions   -----

function addChannelErrorCheck(req) {
	if (req.body.channelName in channels)
		return 'CHANNEL_NAME_ALREADY_EXISTS';
	if (!req.body.channelName)
		return 'CHANNEL_NAME_NOT_SPECIFIED';
}

function sendMessageErrorCheck(req) {
	if (!req.body.channelName)
		return 'MISSING_CHANNEL_NAME';
}

module.exports = routes;
