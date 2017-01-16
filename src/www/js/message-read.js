$(function() {
	var messagesDiv = $('.messages');
	var lastSender = "";

	messageHandlerFunctions['chatMsg'] = handleChatMessage;

	function receiveMessage(message) {
		var newMsg = $(
			'<div>' +
				'<div class="message">' +
					getSenderAndTimestamp(message) +
					'<p>' + message.text + '</p>' +
				'</div>' +
			'</div>'
		).appendTo(messagesDiv);

		if (message.selfdestruct > 0) {
			setTimeout(function() {
				newMsg.remove();
			}, message.selfdestruct);
		}
	}

	function getSenderAndTimestamp(message) {
		if (lastSender !== message.sender)
			return '<p>' + message.sender + ' (' + formatTime(message.time) + ')' + '</p>';

		return '';
	}

	function handleChatMessage(msg) {
		receiveMessage(msg);
		lastSender = msg.sender;
		messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
	}
});
