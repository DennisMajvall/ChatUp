var currentChannel = '';

$(function() {
	var channelTitle = $('.app-title h1').eq(0);
	var channelsDiv = $('.channel-names').eq(0);
	var channelNames = [];

	initializeChannels();

	function initializeChannels() {
		let defaultChannel = '#general';

		messageHandlerFunctions['addChannel'] = handleAddChannel;

		channelsDiv.on('click', 'p', function() {
			setChannel($(this).text());
		});

		addChannelToServer(defaultChannel, true, function() {
			setTimeout(function() {
				setChannel(defaultChannel);
			}, 1000);
		});
	}

	function setChannel(channelName) {
		if (currentChannel != channelName) {
			currentChannel = channelName;
			channelTitle.hide().text(channelName).fadeIn();
		}
	}

	function addChannelToDOM(channelName) {
		channelNames.push(channelName);
		$('<p>' + channelName + '</p>').hide().fadeIn().appendTo(channelsDiv);
	}

	function handleAddChannel(msg) {
		if (channelNames.indexOf(msg.channelName) === -1) {
			addChannelToDOM(msg.channelName);

			if (currentChannel == '') {
				setChannel(msg.channelName);
			}
		}
	}

	function addChannelToServer(channelName, ignoreErrors, onSuccessCallback) {
		$.post('/add-channel/', {
			channelName: channelName
		}, function(msgResponse) {
			if ('ERROR' in msgResponse) {
				if (!ignoreErrors) {
					console.log('addChannel:', channelName, 'error:', msgResponse.ERROR)
				}
			} else if(onSuccessCallback) {
				onSuccessCallback();
			}
		});
	}
});
