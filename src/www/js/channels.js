var currentChannel = '';
var getChannelMessagesDiv = null;

$(function() {
	getChannelMessagesDiv = addChannelToClient;
	var channelTitle = $('.app-title h1').eq(0);
	var channelsDiv = $('.channel-names').eq(0);
	var messagesDiv = $('.messages').eq(0);
	var channelNames = [];

	initializeChannels();

	function initializeChannels() {
		getChannels(function() {
			var selectedChannel = localStorage.getItem('lastOpenChannel') || '#general';

			if (!channelNames)
				addChannelToClient(selectedChannel, true);

			setChannel(selectedChannel);
			startReadingMessages();
		});

		// Add Event listeners
		channelsDiv.on('click', 'p', function() {
			setChannel($(this).text());
		});
		messageHandlerFunctions['addChannel'] = function(msg) {
			addChannelToClient(msg.channelName, true);
		};
	}

	function animateChannelSwitch(channelName) {
		channelTitle.hide().text(channelName).fadeIn();

		messagesDiv.children('.channel-messages').hide();
		messagesDiv.children('.channel-messages[name="' + channelName + '"]').show();

		channelsDiv.find('p').removeClass('selected');
		channelsDiv.find('p[name="' + channelName + '"]').addClass('selected');
	}

	function setChannel(channelName) {
		if (currentChannel != channelName) {
			currentChannel = channelName;
			localStorage.setItem('lastOpenChannel', channelName);
			animateChannelSwitch(channelName);
		}
	}

	function getOrAddChannelMessagesDiv(channelName, calledByServer) {
		var channelDivs = messagesDiv.children('div[name="' + channelName + '"]');
		if (channelDivs.length == 0) {
			if (!calledByServer) {
				addChannelToServer(channelName, true);
			}
			return $('<div>').addClass('channel-messages').attr('name', channelName).hide().appendTo(messagesDiv);
		}

		return channelDivs.eq(0);
	}

	function addChannelToClient(channelName, calledByServer) {
		if (channelNames.indexOf(channelName) === -1) {
			channelNames.push(channelName);
			var pTag = $('<p>' + channelName + '</p>').attr('name', channelName).hide().fadeIn().appendTo(channelsDiv);
		}

		let result = getOrAddChannelMessagesDiv(channelName, calledByServer);

		if (!currentChannel)
			setChannel(channelName);

		return result;
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

	function getChannels(callback) {
		$.post('/get-channels/', function(msgResponse) {
			for (let name in msgResponse.channels) {
				addChannelToClient(name, true);
			}
			callback();
		});
	}
});
