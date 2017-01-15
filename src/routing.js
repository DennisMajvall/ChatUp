'use strict';

var channels = { 'general': {} };

var getRoutes = {};

var postRoutes = {
	'/send-message/': sendMessage,
	'/add-channel/': addChannel,
};

var errorChecks = {
	'/send-message/': sendMessageErrorCheck,
	'/add-channel/': addChannelErrorCheck,
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
}

function sendMessageErrorCheck(req) {
	if (!req.body.channelName)
		return 'MISSING_CHANNEL_NAME';
}

//  -----   Internal functions and variables   -----

var messages = [];
var listeners = [];
var timer = null;
var listenerTimeLimit = 25000;

/*	---  Explanation of internal functions  ---
	send message:
		put msg in array of messages
		send msg to everybody listening
		remove all listeners

	read message:
		if the listener has new messages
			send them
			remove them from listeners
		else
			put listener in array of listeners
			set timer countdown on the oldest listener + x seconds

	timer countdown completed:
		go through array of listeners
		if any listener has been waiting for x seconds
			send listener messages and remove listener

		if there are any listeners left
			set timer countdown on the oldest listener + x seconds
*/

function setNewTimeout() {
	if (timer) {
		clearTimeout(timer)
		timer = null;
	}

	if (listeners.length) {
		let timeToListen = Math.max(100, listeners[0].beginListeningTime + listenerTimeLimit - new Date().getTime());

		timer = setTimeout(onTimeoutTick, timeToListen);
	}
}

function onTimeoutTick() {
	let hasUnreadMessages = true;

	while (hasUnreadMessages && listeners.length) {
		hasUnreadMessages = sendUnreadMessages(listeners[0]);

		if (hasUnreadMessages) {
			listeners = listeners.slice(1);
		}
	}

	setNewTimeout();
}

function updateListeners() {
	if (!listeners.length)
		return;

	listeners.sort(function(a, b) {
		return a.latestMsgTime > b.latestMsgTime;
	});

	setNewTimeout();
}

// Returns true if unread messages were sent.
function sendUnreadMessages(listener) {
	let unreadMessages = [];

	for (let i = messages.length - 1; i >= 0; --i) {
		let msg = messages[i];

		if (msg.time > listener.latestMsgTime) {
			unreadMessages.unshift(msg);
		} else {
			break;
		}
	}

	let timeListened = new Date().getTime() - listener.beginListeningTime;

	if (unreadMessages.length || timeListened > listenerTimeLimit) {
		listener.res.json(unreadMessages);
		return true;
	}

	return false;
}

function readMessages(req, res) {
	var listener = {
		res: res,
		latestMsgTime: req.params.lastTime,
		beginListeningTime: new Date().getTime()
	};

	let hasUnreadMessages = sendUnreadMessages(listener);

	if (!hasUnreadMessages) {
		listeners.push(listener);
		updateListeners();
	}

	return true;
}

function sendMessageToAllListeners(msg) {
	for (let i = 0; i < listeners.length; ++i) {
		listeners[i].res.json(msg);
	}
	listeners = [];
}

module.exports = function(app) {
	function handleMessage(functionArray, name, req, res) {
		let msg = req.body;
		msg.time = new Date().getTime();
		msg.sender = req.cookies.username || 'Unknown';

		let errorMessage = name in errorChecks && errorChecks[name](req);

		if(errorMessage){
			res.json({ ERROR: errorMessage });
		} else {
			if (!functionArray[name](msg)) {
				res.json({});
				messages.push(msg);
				sendMessageToAllListeners(msg);
			}
		}
	}

	for (let name in getRoutes) {
		app.get(name, function(req, res) {
			handleMessage(getRoutes, name, req, res);
		});
	}

	for (let name in postRoutes) {
		app.post(name, function(req, res) {
			handleMessage(postRoutes, name, req, res);
		});
	}

	app.get('/read-messages/:lastTime', readMessages);
}
