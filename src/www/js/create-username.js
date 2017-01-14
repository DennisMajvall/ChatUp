$(function() {
	var sendButton = $('input[name="submit-username"]');
	var inputTextbox = $('input[name="username-input"]');

	sendButton.on('click', onSaveUserName);

	inputTextbox.keyup(function(event){
    	if(event.keyCode == 13){
			onSaveUserName();
		}
	});

	function onSaveUserName(){
		var inputMsg = inputTextbox.val();

		if (!inputMsg.trim().length) {
			inputMsg = "Unknown";
		}

		createCookie("username", inputMsg);
	}
});