$(function() {
	var sendButton = $('input[name="send-message"]');
	var inputTextbox = $('input[name="input"]');
	var lastReadMsgTime = 0;

	waitForMessages();

	sendButton.on('click', onSendMessage);

	function onSendMessage() {
		var inputMsg = inputTextbox.val();

		$.post('/send-message',
			{
				'text': inputMsg
				// we could send more parameters here.
			},
			function(data, error) {
		}, 'json');
	}

	function onReceiveMessages(messages) {
		console.log(data);

		if (data.length) {
			lastReadMsgTime = data[data.length-1].time;
		}
	}

	function waitForMessages() {
		$.getJSON('/read-messages/' + lastReadMsgTime, function(data) {
			onReceiveMessages(data);

			// Wait for new messages.
			waitForMessages();
		});
	}
});
