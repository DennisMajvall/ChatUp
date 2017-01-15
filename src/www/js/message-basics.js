$(function() {
	var sendButton = $('input[name="submit-message"]');
	var inputTextbox = $('input[name="text-message"]');
	var inputSelfdestructTime = $('input[name="time-destruct"]');
	var messagesDiv = $('.messages');
	var lastSender = "";

	messageHandlerFunctions['chatMsg'] = handleChatMessage;

	sendButton.on('click', sendMessage);

	inputTextbox.keyup(function(event){
    	if(event.keyCode == 13){
			sendMessage();
		}
	});

	function sendMessage() {
		var inputMsg = inputTextbox.val();
		var inputSelfdestruct = inputSelfdestructTime.val();

		if (!inputMsg.trim().length)
			return;

		if (!inputSelfdestruct)
			inputSelfdestruct = -1;
		else
			inputSelfdestruct = inputSelfdestruct * 60 * 1000;

		inputTextbox.val('');
		inputSelfdestructTime.val('');

		$.post('/send-message/', {
			text: inputMsg,
			selfdestruct: inputSelfdestruct,
			channelName: currentChannel
			// we could send more parameters here.
		}, null, 'json');
	}

	function receiveMessage(message) {
        messagesDiv.append(
            '<div>' +
                '<div class="message">' +
                    getSenderAndTimestamp(message) +
                    '<p>' + message.text + '</p>' +
                '</div>' + 
            '</div>'
        );
    }

    function getSenderAndTimestamp(message) {
        if (lastSender === message.sender)
            return '';
		else
        	return '<p>' + message.sender + ' (' + formatTime(message.time) + ')' + '</p>';
    }

	function handleChatMessage(msg) {
		receiveMessage(msg);
		lastSender = msg.sender;
		messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
	}
});