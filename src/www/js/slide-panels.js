$(function() {
	// LEFT PANEL
    $('.left-panel').on('mouseenter', function(e) {
        $('.left-panel').addClass('expanded');
        $('.chat-area').addClass('decreased');
        $('.right-panel').addClass('decreased');
    });

    $('.left-panel').on('mouseleave', function(e) {
        $('.left-panel').removeClass('expanded');    
        $('.chat-area').removeClass('decreased');
        $('.right-panel').removeClass('decreased');
    });

	// RIGHT PANEL
    $('.right-panel').on('mouseenter', function(e) {
        $('.right-panel').addClass('expanded');
        $('.chat-area').addClass('decreased');
        $('.left-panel').addClass('decreased');
    });

    $('.right-panel').on('mouseleave', function(e) {
        $('.right-panel').removeClass('expanded');    
        $('.chat-area').removeClass('decreased');
        $('.left-panel').removeClass('decreased');
    });
});