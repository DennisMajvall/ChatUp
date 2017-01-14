$(function() {
	var sendButton = $('input[name="submit-username"]');
	var inputTextbox = $('input[name="text-username"]');

	sendButton.on('click', onSaveUserName);

	inputTextbox.keyup(function(event) {
    	if(event.keyCode == 13){
			onSaveUserName();
		}
	});

	function onSaveUserName() {
		if (sendButton.hasClass('disabled'))
			return;

		var inputMsg = inputTextbox.val();

		if (!inputMsg.trim().length) {
			inputMsg = "Unknown";
		}

		createCookie("username", inputMsg);

		inputTextbox.val('');

		animateSubmitButton();
	}

	function animateSubmitButton() {
		sendButton.val('OK').removeClass('btn-default').addClass('btn-success disabled');

		setTimeout(function(){
			sendButton.val('Change').removeClass('btn-success disabled').addClass('btn-default');
		}, 1000)
	}
});