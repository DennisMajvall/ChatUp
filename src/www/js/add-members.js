$(function() {
	var addMembersArea = $(".add-members-area");

	function showAddMembersArea() {
	    $('.add-members-button').on('click', function(event) {
	    	addMembersArea.css({ top:event.pageY, left: event.pageX });
	        addMembersArea.toggle();

			if (addMembersArea.is(':visible'))
				$('body').on('click', onBodyClick);
			else
				$('body').off('click', onBodyClick);

			return false;
	    });
	}

	function onBodyClick(event) {
		addMembersArea.hide();
		$('body').off('click', onBodyClick);
		return false;
	}

	function addMembers() {

	}

	showAddMembersArea();
});

