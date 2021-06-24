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
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    variableWidth: true,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.main-doctors-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    variableWidth: true,
                    adaptiveHeight: true
                }
            }
        ]
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
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
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

    $('.main-reviews-list-inner').each(function() {
        $('#main-reviews-status-count').html($('.main-reviews-item').length);
    });

    $('.main-reviews-more').each(function() {
        if ($('.main-reviews-item').length > 1) {
            $('.main-reviews-more').addClass('visible');
        }
    });

    $('.main-reviews-more a').click(function(e) {
        var curCount = $('.main-reviews-item:visible').length + 3;
        $('.main-reviews-item:lt(' + curCount + ')').addClass('visible');
        curCount = $('.main-reviews-item:visible').length;
        if (curCount == $('.main-reviews-item').length) {
            $('.main-reviews-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('.main-reviews-list-inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: 'unslick'
            }
        ]
    }).on('setPosition', function(event, slick) {
        $('.main-reviews-author').html($('.main-reviews-list-inner .slick-slide:not(.slick-cloned)').eq($('.main-reviews-list-inner').slick('slickCurrentSlide')).find('.main-reviews-item-author').html());
        $('.main-reviews-author').removeClass('hidden');
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.main-reviews-author').addClass('hidden');
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.main-reviews-author').html($('.main-reviews-list-inner .slick-slide:not(.slick-cloned)').eq(currentSlide).find('.main-reviews-item-author').html());
        $('.main-reviews-author').removeClass('hidden');
    });

    $('.nav ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length != 0) {
            curLi.addClass('with-submenu');
        }
    });

    $('.nav ul li a').click(function(e) {
        if ($(window).width() < 1200) {
            var curLi = $(this).parent();
            if (curLi.find('ul').length > 0) {
                $('.submenu-mobile').remove();
                if (curLi.hasClass('open')) {
                    curLi.removeClass('open');
                } else {
                    $('.nav ul li.open').removeClass('open');
                    curLi.addClass('open');
                    $('.wrapper').append('<div class="submenu-mobile"><div class="submenu-mobile-list"><ul>' + curLi.find('ul').html() + '</ul></div></div>');
                }
                e.preventDefault();
            }
        }
    });

    $('.footer-menu-title a').click(function(e) {
        if ($(window).width() < 1200) {
            $(this).parent().parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $('.mobile-menu-link').click(function(e) {
        $('.submenu-mobile').remove();
        $('.nav ul li.open').removeClass('open');
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
        }
        e.preventDefault();
    });

});

$(window).on('load resize', function() {

    if ($(window).width() > 1199) {
        $('.main-ratings-list').each(function() {
            $(this).mCustomScrollbar('destroy');
        });

        $('.main-contacts-menu').each(function() {
            $(this).mCustomScrollbar('destroy');
        });
    } else {
        $('.main-ratings-list').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });

        $('.main-contacts-menu').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });
    }

    $('.submenu-mobile').remove();
    $('.nav ul li.open').removeClass('open');

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

    if (windowScroll > $('header').height()) {
        $('.side-panel').addClass('visible');
    } else {
        $('.side-panel').removeClass('visible');
    }

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