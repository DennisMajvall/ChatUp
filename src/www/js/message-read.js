$(function() {
	var messagesDiv = $('.messages');
	var lastSenderInChannel = {};

	messageHandlerFunctions['chatMsg'] = handleChatMessage;

	function receiveMessage(message) {
		var parentDiv = getChannelMessagesDiv(message.channelName);
		var newMsg = $(
			'<div>' +
				'<div class="message">' +
					getSenderAndTimestamp(message) +
					'<p>' + message.text + '</p>' +
				'</div>' +
			'</div>'
		).appendTo(parentDiv);

		if (message.selfdestruct > 0) {
			setTimeout(function() {
				newMsg.remove();
			}, message.selfdestruct);
		}
	}

	function getSenderAndTimestamp(message) {
		if (lastSenderInChannel[message.channelName] !== message.sender)
			return '<p>' + message.sender + ' (' + formatTime(message.time) + ')' + '</p>';

		return '';
	}

	function handleChatMessage(message) {
		receiveMessage(message);
		lastSenderInChannel[message.channelName] = message.sender;
		messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
	}
});
