var currentChannel = '';
var getChannelMessagesDiv = null;

$(function() {
	getChannelMessagesDiv = getChannelCenter;
	var channelTitle = $('.app-title h1').eq(0);
	var channelsDiv = $('.channel-names').eq(0);
	var messagesDiv = $('.messages').eq(0);
	var channelNames = [];
	var channels = { /*left, center */};

	initializeChannels();
	initializeAddChannel();

	function initializeChannels() {
		getChannels(function() {
			setChannel(localStorage.getItem('lastOpenChannel') || '#general');
			startReadingMessages();
		});

		// Add Event listeners
		channelsDiv.on('click', 'p', function() {
			setChannel($(this).text());
		});

		messageHandlerFunctions['addChannel'] = function(msg) {
			addChannelToClient(msg.channelName);
		};
	}

	function initializeAddChannel() {
		// create-channel floating box
		var createChannelArea = $('.create-channel-area').eq(0);

		$('.create-channel-button').on('click', function(event) {
			createChannelArea.css({ top: event.pageY, left: event.pageX });
			createChannelArea.toggle();
		});

		// create-channel input
		var sendButton = $('input[name="create-channel-button"]').eq(0);
		var inputTextbox = $('input[name="create-channel-input"]').eq(0);

		sendButton.on('click', createNewChannel);

		inputTextbox.keyup(function(event){
			if(event.keyCode == 13){
				createNewChannel();
			}
		});

		$('create-channel-area').on('click', 'create-channel-input', function() {
			setChannel($(this).text());
		});

		function createNewChannel() {
			var channelName = inputTextbox.val();

			inputTextbox.val('');

			if (!channelName.trim().length)
				return;

			setChannel(channelName);
		}
	}

	function getChannelCenter(channelName) {
		if (!(channelName in channels)) {
			addChannelToClientAndServer(channelName);
		}

		return channels[channelName].center;
	}

	function setChannel(channelName) {
		if (!(channelName in channels)) {
			addChannelToClientAndServer(channelName);
		}

		if (channelName in channels && currentChannel != channelName) {
			currentChannel = channelName;
			localStorage.setItem('lastOpenChannel', channelName);
			animateChannelSwitch(channelName);
		}
	}

	function animateChannelSwitch(channelName) {
		channelTitle.hide().text(channelName).fadeIn();

		messagesDiv.children('.channel-messages').hide();
		channels[channelName].center.show();

		channelsDiv.find('p').removeClass('selected');
		channels[channelName].left.addClass('selected');
	}

	function createLeftPanelChannel(channelName) {
		return $('<p>' + channelName + '</p>')
			.attr('name', channelName)
			.hide()
			.fadeIn()
			.appendTo(channelsDiv);
	}

	function createCenterPanelChannel(channelName) {
		return $('<div>')
			.addClass('channel-messages')
			.attr('name', channelName)
			.hide()
			.appendTo(messagesDiv);
	}

	function addChannelToClientAndServer(channelName) {
		addChannelToClient(channelName);
		addChannelToServer(channelName);
	}

	function addChannelToClient(channelName) {
		if (!(channelName in channels)) {
			channels[channelName] = {
				'left': createLeftPanelChannel(channelName),
				'center': createCenterPanelChannel(channelName)
			};
		}
	}

	function addChannelToServer(channelName) {
		let showErrors = false;

		$.post('/add-channel/', {
			channelName: channelName
		}, function(msgResponse) {
			if (showErrors && 'ERROR' in msgResponse) {
				console.log('addChannel:', channelName, 'error:', msgResponse.ERROR)
			}
		});
	}

	function getChannels(callback) {
		$.post('/get-channels/', function(msgResponse) {
			for (let name in msgResponse.channels) {
				addChannelToClient(name);
			}
			callback();
		});
	}
});
