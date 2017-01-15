var currentChannel = 'general';

$(function() {
	function setChannel(channelName) {
		currentChannel = channelName;
	}

	function addChannel(channelName) {
		$.post('/add-channel/', {
			channelName: channelName
		}, function(msgResponse) {
			if (msgResponse && 'ERROR' in msgResponse) {
				console.log('addChannel error:', msgResponse.ERROR)
			}
		});
	}
});