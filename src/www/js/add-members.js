$(document).ready(function() {
	var addMembersArea = $(".add-members-area");

	function showAddMembersArea(e) {
	    $('.add-button').on('click', function() {
	    	addMembersArea.css({ top:event.pageY, left: event.pageX });
	        addMembersArea.toggle();
	    });
	}

	function addMembers() {

	}

	function clickCreateChannelButton() {
		$('.create-channel-button').on('click', function() {
			$('.create-channel-area').toggle();
		})
	}

	showAddMembersArea();
});

