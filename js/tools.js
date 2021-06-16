SmoothScroll({
    animationTime    : 800,
    stepSize         : 75,

    accelerationDelta : 30,
    accelerationMax   : 2,

    keyboardSupport   : true,

    arrowScroll       : 50,

    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    touchpadSupport   : true,
});

$(document).ready(function() {

    $('.main-history-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false
    });

    $('.main-doctors-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(this).scrollTop();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.main-fear').each(function() {
        var curBlock = $(this);

        var curPosition = windowScroll + windowHeight;

        var curStart = curBlock.offset().top;
        var curStop = curBlock.offset().top + windowHeight;
        var curPersent = (curPosition - curStart) / (curStop - curStart);

        if (curPersent >= 0) {
            if (curPersent <= 1) {
                curBlock.find('.main-fear-light').css({'opacity': curPersent});
            } else {
                curBlock.find('.main-fear-light').css({'opacity': 1});
            }
        } else {
            curBlock.find('.main-fear-light').css({'opacity': 0});
        }
    });

});