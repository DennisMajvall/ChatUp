$(function() {
	var sendButton = $('input[name="submit-message"]');
	var inputTextbox = $('input[name="text-message"]');
	var inputSelfdestructTime = $('input[name="time-destruct"]');
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
		var inputSelfdestruct = inputSelfdestructTime.val();

		if (!inputMsg.trim().length)
			return;

		if (!inputSelfdestruct)
			inputSelfdestruct = -1;
		else
			inputSelfdestruct = inputSelfdestruct * 60 * 1000;

		inputTextbox.val('');
		inputSelfdestructTime.val('');

		$.post('/send-message', {
			'text': inputMsg,
			'selfdestruct': inputSelfdestruct
			// we could send more parameters here.
		}, null, 'json');
	}

	function onReceiveMessage(message) {
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
        if (lastSender === message.sender) {
            return '';
        }

        return '<p>' + message.sender + " (" + formatTime(message.time) + ")" + '</p>';
    }

    function formatTime(timestamp){
	    var d = new Date(timestamp),
	        time = [d.getHours(), d.getMinutes(), d.getSeconds()];

	    time = time.map(function(t){
	      return t < 10 ? '0' + t : t;
	    });
	    return time.join(':');
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