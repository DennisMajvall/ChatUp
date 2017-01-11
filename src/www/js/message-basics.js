$(function() {
	var sendButton = $('input[name="send-message"]').on('click', onSendMessage);
	var inputTextbox = $('input[name="input"]');

	function onSendMessage() {
		var inputMsg = inputTextbox.val();

		$.post('/send-message', { 'text': inputMsg }, function(data, error) {
			console.log(data);
			onReadMessage();
		}, 'json');
	}

	function onReadMessage() {
		$.getJSON('/read-messages/lol', function(data) {
			console.log(data[0]);
		});
	}
});
