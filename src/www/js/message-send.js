$(function() {
	var sendButton = $('input[name="submit-message"]');
	var inputTextbox = $('input[name="text-message"]');
	var inputSelfdestructTime = $('input[name="time-destruct"]');

	sendButton.on('click', sendMessage);

	inputTextbox.keyup(function(event){
		if(event.keyCode == 13){
			sendMessage();
		}
	});

	function sendMessage() {
		var inputMsg = inputTextbox.val();
		var inputSelfdestruct = inputSelfdestructTime.val() || 0;

		if (!inputMsg.trim().length)
			return;

		inputSelfdestruct *= 60 * 1000;

		inputTextbox.val('');
		inputSelfdestructTime.val('');

		$.post('/send-message/', {
			text: inputMsg,
			selfdestruct: inputSelfdestruct,
			channelName: currentChannel
		}, null, 'json');
	}
});
