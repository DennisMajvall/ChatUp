$(document).ready(function() {
    $('.left-panel').on('mouseenter', function(e) {
        console.log('hej');
        $('.left-panel').addClass('expanded');
        $('.chat-area').addClass('decreased');
        $('.right-panel').addClass('decreased');
    });

    $('.left-panel').on('mouseleave', function(e) {
        console.log('hejdå');
            $('.left-panel').removeClass('expanded');    
            $('.chat-area').removeClass('decreased');
            $('.right-panel').removeClass('decreased');
    });
});