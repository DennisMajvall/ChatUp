$(document).ready(function() {
	var addMembersArea = $(".add-members-area");

	function showAddMembersArea(e) {
	    $('.add-members-button').on('click', function() {
	    	addMembersArea.css({ top:event.pageY, left: event.pageX });
	        addMembersArea.toggle();
	    });
	}

	function addMembers() {

	}

	showAddMembersArea();
});

