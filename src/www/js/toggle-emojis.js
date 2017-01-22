var settings = {
	"useEmojis" : true
}

$(function(){

	$('body').on('click', '.emojisOn', toggleOnOff);

	var buttonParent = $('.on-off-emojis');

	$(
		'<label class="switch">' +
	  		'<input type="checkbox">' +
	  		'<div class="slider round">' +
	  		'</div>'
		'</label>'
	).appendTo(buttonParent);

	function toggleOnOff() {
		settings.useEmojis = $('input.checkbox_check').attr(':checked');
	}

});
