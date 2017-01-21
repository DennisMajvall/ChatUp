$(function() {
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
});