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

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('focus', '.form-input input', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

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

    $('.main-equipment-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-equipment-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-equipment-menu ul li').index(curLi);
            $('.main-equipment-tab.active').removeClass('active');
            $('.main-equipment-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-contacts-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-contacts-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-contacts-menu ul li').index(curLi);
            $('.main-contacts-tab.active').removeClass('active');
            $('.main-contacts-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-slider-list').each(function() {
        $('#main-slider-status-count').html($('.main-slider-item').length);
    });

    $('.main-slider-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false
    }).on('setPosition', function(event, slick) {
        $('#main-slider-status-current').html($('.main-slider-list').slick('slickCurrentSlide') + 1);
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#main-slider-status-current').html(nextSlide + 1);
    });

    $('.main-video-link').click(function(e) {
        $('html').addClass('main-video-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-video').length == 0) {
            $('html').removeClass('main-video-open');
        }
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

        var curStart = curBlock.offset().top + windowHeight * 3/4;
        var curStop = curBlock.offset().top + windowHeight;
        var curPersent = (curPosition - curStart) / (curStop - curStart);

        if (curPersent >= 0) {
            if (curPersent <= 1) {
                curBlock.find('.main-fear-light').css({'opacity': curPersent});
                curBlock.find('.main-fear-icon').css({'top': -90 * curPersent});
                curBlock.find('.main-fear-text').css({'top': 330 - 25 * curPersent});
            } else {
                curBlock.find('.main-fear-light').css({'opacity': 1});
                curBlock.find('.main-fear-icon').css({'top': -90});
                curBlock.find('.main-fear-text').css({'top': 305});
            }
        } else {
            curBlock.find('.main-fear-light').css({'opacity': 0});
            curBlock.find('.main-fear-icon').css({'top': 0});
            curBlock.find('.main-fear-text').css({'top': 330});
        }
    });

});

function initForm(curForm) {
    curForm.find('.form-input input').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    var curFormOptions = {
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    };

    curForm.validate(curFormOptions);
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}