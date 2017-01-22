$(function(){
	let tooltipButtons = $('[tooltip-target]');

	tooltipButtons.each(function() {
		let me = $(this);
		let targetTooltip = $('tooltip#' + me.attr('tooltip-target'));

		me.on('click', function(event) {
			if (targetTooltip.is(':hidden')) {
				targetTooltip.css({ top: event.pageY, left: event.pageX });
				targetTooltip.show();
				$('body').on('click', onBodyClick);
			}

			return false;
		});

		function onBodyClick(event) {
			if (!$(event.target).closest(targetTooltip).length) {
				targetTooltip.hide();
				$('body').off('click', onBodyClick);

				return false;
			}
		}
	 });
});