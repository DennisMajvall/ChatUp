var messageHandlerFunctions = {};

$(function() {
	var lastReadMsgTime = 0;
	
	waitForMessages();

	function handleMessageType(msg){
		if (msg.type in messageHandlerFunctions) {
			messageHandlerFunctions[msg.type](msg);
		} else {
			console.log('Unknown msg.type received:', msg.type);
		}
	}

	function waitForMessages() {
		$.getJSON('/read-messages/' + lastReadMsgTime, function(messages) {
			if (messages && messages.length) {
				messages.forEach(handleMessageType);
				lastReadMsgTime = messages[messages.length-1].time;
			}
			waitForMessages();
		});
	}
});