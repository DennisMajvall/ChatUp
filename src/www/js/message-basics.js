$(function() {
	var sendButton = $('input[name="send-message"]').on('click', onSendMessage);
	var inputTextbox = $('input[name="input"]');

	function onSendMessage() {
		var inputMsg = inputTextbox.val();
		$.getJSON('/send-message/' + inputMsg, function(data) {
			console.log(data);
		});
	}

	function onReadMessage() {
		$.getJSON('/read-messages/lol', function(data) {
			console.log(data[0]);
		});
	}
});
