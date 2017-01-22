$(function() {
	var messagesDiv = $('.messages');
	var lastSenderInChannel = {};
	var emojis = {
	":)" : "😊",
	":-)" : "😊",
	":(" : "😞",
	":-(" : "😞",
	":D" : "😃",
	":-D" : "😃",
	">:(" : "😠",
	">:-(" : "😠",
	":o" : "😮",
	":-o" : "😮",
	":P" : "😛",
	":-P" : "😛",
	":S" : "😖",
	":-S" : "😖",
	":*" : "😘",
	":-*" : "😘",
	"<3" : "❤"
}

	messageHandlerFunctions['chatMsg'] = handleChatMessage;

	function receiveMessage(message) {
		var parentDiv = getChannelMessagesDiv(message.channelName);
		var newMsg = $(
			'<div>' +
				'<div class="message">' +
					getSenderAndTimestamp(message) +
					'<p>' + decipherEmojis(message.text) + '</p>' +
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

	function decipherEmojis(message) {
	    for (var emoji in emojis) {
	        let index = message.indexOf(emoji);

	        if (index !== -1) {
	            message = message.substr(0, index) + emojis[emoji] + message.substr(index + emoji.length);
	        }
	    }

	    return message;
	}

});
