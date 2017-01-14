$(function() {
	var sendButton = $('input[name="send-message"]');
	var inputTextbox = $('input[name="input"]');
	var messagesDiv = $('.messages');
	var lastReadMsgTime = 0;
	var lastSender = "";

	waitForMessages();

	sendButton.on('click', onSendMessage);

	inputTextbox.keyup(function(event){
    	if(event.keyCode == 13){
			onSendMessage();
		}
	});

	function onSendMessage() {
		var inputMsg = inputTextbox.val();

		if (!inputMsg.trim().length)
			return;

		inputTextbox.val('');

		$.post('/send-message', {
			'text': inputMsg
			// we could send more parameters here.
		}, null, 'json');
	}

	function onReceiveMessage(message) {
        messagesDiv.append(
            '<div>' +
                '<div class="message">' +
                    getSenderAsHTML(message) +
                    '<p>' + message.text + '</p>' +
                '</div>' + 
            '</div>'
        );
    }

    function getSenderAsHTML(message) {
        if (lastSender === message.sender) {
            return '';
        }

        return '<p>' + message.sender + '</p>';
    }

	function waitForMessages() {
		$.getJSON('/read-messages/' + lastReadMsgTime, function(messages) {

			// Call onReceiveMessage once for every message if there are any.
			if (messages && messages.length) {
				messages.forEach(function(msg) {
					onReceiveMessage(msg);
					lastSender = msg.sender;
				});
				
				messagesDiv.scrollTop(messagesDiv[0].scrollHeight);

				// Update the lastReadMsgTime
				lastReadMsgTime = messages[messages.length-1].time;
			}

			// Wait for new messages.
			waitForMessages();
		});
	}
});