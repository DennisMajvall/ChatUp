$(document).ready(function() {
        console.log('abc');
    $('.right-panel').on('mouseenter', function(e) {
        console.log('hej');
        $('.right-panel').addClass('expanded');
        $('.chat-area').addClass('decreased');
        $('.left-panel').addClass('decreased');
    });

    $('.right-panel').on('mouseleave', function(e) {
        //setTimeout(function() {
        console.log('hejdå');
            $('.right-panel').removeClass('expanded');    
            $('.chat-area').removeClass('decreased');
            $('.left-panel').removeClass('decreased');

        //}, 300);
    });
});