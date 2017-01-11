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

	function onReceiveMessages(messages) {
		console.log(messages);

		if (messages.length) {
			lastReadMsgTime = messages[messages.length-1].time;
		}
		
		$('body').append(
			'<div class="the-messages">' +
				'<p>' + messages.text + '</p>' +
			'</div>');
	}

	function waitForMessages() {
		$.getJSON('/read-messages/' + lastReadMsgTime, function(messages) {
			onReceiveMessages(messages);
			// Wait for new messages.
			waitForMessages();
		});
	}
});