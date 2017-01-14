'use strict';

var messages = [];
var listeners = [];
var timer = null;
var listenerTimeLimit = 25000;

var get_routes = {
	'/read-messages/:lastTime': readMessagesRequest
};

var post_routes = {
	'/send-message': sendMessageRequest
};

/*	-----------   Basic explanation   ----------
		This comment may be removed later.

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

		if (msg.timeReceived > listener.latestMsgTime) {
			unreadMessages.push(msgToJSON(msg));
		} else {
			break;
		}
	}

	let timeListened = new Date().getTime() - listener.beginListeningTime;

	if (unreadMessages.length || timeListened > listenerTimeLimit) {
		listener.res.json(unreadMessages.reverse());
		return true;
	}

	return false;
}

function readMessagesRequest(req, res) {
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
}

function msgToJSON(msg) {
	return {
		text: msg.text,
		sender: msg.sender,
		time: msg.timeReceived
	};
}

function sendMessageToAllListeners(msg) {
	let jsonMsg = msgToJSON(msg);

	for (let i = 0; i < listeners.length; ++i) {
		listeners[i].res.json(jsonMsg);
	}

	listeners = [];
}

function sendMessageRequest(req, res) {
	var msg = {
		text: req.body.text,
		sender: req.cookies.username || 'Unknown',
		timeReceived: new Date().getTime()
	}

	res.json({ sendMessageRequest:"OK" });

	messages.push(msg);
	sendMessageToAllListeners(msg);
}

module.exports = function(app) {
	for (var name in get_routes) {
		app.get(name, get_routes[name]);
	}
	for (var name in post_routes) {
		app.post(name, post_routes[name]);
	}
}
