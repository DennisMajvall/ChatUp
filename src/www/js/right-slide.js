$(document).ready(function() {
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