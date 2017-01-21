'use strict';

var channels = {};

var routes = {
	/*
	'/example-route-two/': {
		func: exampleDoStuff,
		errFunc: exampleDoStuffErrorCheck,	// optional
		method: 'POST' 		// optionally 'GET' (default: 'POST'),
		passAlong: bool 	// optional, The msg shall be sent to listeners, (default: true)
								false = the msg will be the response (if no error)) 
	},
	*/
	'/send-message/': {
		func: sendMessage,
		errFunc: sendMessageErrorCheck
	},
	'/add-channel/': {
		func: addChannel,
		errFunc: addChannelErrorCheck
	},
	'/get-channels/': {
		func: getChannels,
		passAlong: false
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

function getChannels(msg) {
	msg.channels = channels;
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
