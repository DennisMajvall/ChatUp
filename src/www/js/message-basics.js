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
			function(messages, error) {
		}, 'json');
	}

	function onReceiveMessage(message) {
		$('body').append(
			'<div class="the-messages">' +
				'<p>' + message.text + '</p>' +
			'</div>'
		);
	}

	function waitForMessages() {
		$.getJSON('/read-messages/' + lastReadMsgTime, function(messages) {

			// Call onReceiveMessage once for every message if there are any.
			if (messages && messages.length) {
				messages.forEach(function(msg) {
					onReceiveMessage(msg);
					lastReadMsgTime = msg.time;
				});

				// Update the lastReadMsgTime
				lastReadMsgTime = messages[messages.length-1].time;
			}

			// Wait for new messages.
			waitForMessages();
		});
	}
});