$(function() {
	var sendButton = $('input[name="submit-username"]');
	var inputTextbox = $('input[name="text-username"]');

	loadUsernameIntoPlaceholder();

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
		inputTextbox.attr('placeholder', inputMsg);

		animateSubmitButton();
	}

	function animateSubmitButton() {
		sendButton.val('OK').removeClass('btn-default').addClass('btn-success disabled');

		setTimeout(function(){
			sendButton.val('Change').removeClass('btn-success disabled').addClass('btn-default');
		}, 1000)
	}

	function loadUsernameIntoPlaceholder() {
		let username = readCookie("username");

		if (username)
			inputTextbox.attr('placeholder', username);
	}
});