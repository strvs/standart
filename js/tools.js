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

    $('body').on('click', '.form-select-current', function() {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('focus')) {
            curSelect.removeClass('focus');
        } else {
            $('.form-select.focus').removeClass('focus');
            curSelect.addClass('focus');
        }
    });

    $('body').on('change click', '.form-select input', function() {
        var curSelect = $(this).parents().filter('.form-select');
        curSelect.removeClass('focus');
        var curSpan = $(this).parent().find('span');
        if (curSpan.hasClass('empty')) {
            curSelect.find('.form-select-current span').html(curSelect.find('.form-select-current').attr('data-placeholder'));
            curSelect.removeClass('full');
        } else {
            curSelect.find('.form-select-current span').html(curSpan.html());
            curSelect.addClass('full');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.form-select').length == 0) {
            $('.form-select.focus').removeClass('focus');
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

    $('.page-menu a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 50});
            e.preventDefault();
        }
    });

    $('.nav ul li.active').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length == 1) {
            if ($('.header-back-link').length == 1) {
                $('.header-back-link').append('<div class="header-photo-menu"><ul>' + curLi.find('ul').html() + '</ul></div>');
            } else {
                $('.header-photo').prepend('<div class="header-photo-menu"><ul>' + curLi.find('ul').html() + '</ul></div>');
            }
            $('.header-photo-menu a').wrapInner('<span></span>');
        }
    });

    $('.gallery').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.tabs-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.tabs');
            curTabs.find('.tabs-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = curTabs.find('.tabs-menu ul li').index(curLi);
            curTabs.find('.tabs-content.active').removeClass('active');
            curTabs.find('.tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.doctor-card-video-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
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

    $('.doctor-card-serts').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
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

    $('.schedule-item-header').click(function(e) {
        if ($(window).width() > 1199) {
            if (!$(e.target).hasClass('btn') && !$(e.target).hasClass('btn-border')) {
                $(this).parent().toggleClass('open');
            }
        } else {
            $(this).parent().addClass('open');
        }
    });

    $('.schedule-item-close').click(function(e) {
        $(this).parents().filter('.schedule-item').removeClass('open');
    });

    $('.price-item-header').click(function(e) {
        if ($(window).width() > 1199) {
            $(this).parent().toggleClass('open');
            $(window).trigger('resize');
        } else {
            $(this).parent().addClass('open');
        }
    });

    $('.price-item-close').click(function(e) {
        $(this).parents().filter('.price-item').removeClass('open');
    });

    $('.price-search form').each(function() {
        var curForm = $(this);
        curForm.find('input').attr('autocomplete', 'off');
        var validator = curForm.validate();
        validator.destroy();
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
            }
        });
        curForm.find('input').on('keyup', function() {
            var curValue = $('.price-search .form-input input').val().trim().toLowerCase();
            $('.price-item.hidden').removeClass('hidden');
            $('.price-item-position-title').each(function() {
                $(this).html($(this).html().replace(/<span>/g, '').replace(/<\/span>/g, ''));
            });
            $('.price-item-position').removeClass('hidden');
            $('.price-item-group').removeClass('hidden');
            if (curValue != '') {
                $('.price-item').each(function() {
                    var curItem = $(this);
                    var result = false;
                    var count = 0;
                    curItem.find('.price-item-position-title').each(function() {
                        var curText = $(this).text();
                        if (curText.toLowerCase().indexOf(curValue) != -1) {
                            result = true;
                            count++;

                            var reg = new RegExp(curValue, 'gi');
                            $(this).html($(this).html().replace(reg, function(str) {return '<span>' + str + '</span>'}));
                        } else {
                            var curPosition = $(this).parents().filter('.price-item-position');
                            curPosition.addClass('hidden');
                            var curGroup = curPosition.parents().filter('.price-item-group');
                            if (curGroup.find('.price-item-position').length == curGroup.find('.price-item-position.hidden').length) {
                                curGroup.addClass('hidden');
                            }
                        }
                    });
                    if (!result) {
                        curItem.addClass('hidden');
                        curItem.find('.price-item-header-count').html('').removeClass('visible');
                    } else {
                        curItem.find('.price-item-header-count').html(count).addClass('visible');
                    }
                });
                $('.price-search-clear').addClass('visible');
            } else {
                $('.price-search-clear').removeClass('visible');
                $('.price-item-header-count').html('').removeClass('visible');
            }
        });
    });

    $('.price-search-clear').click(function(e) {
        $('.price-search .form-input input').val('');
        window.setTimeout(function() {
            $('.price-search .form-input input').trigger('keyup');
            $('.price-search .form-input input').trigger('blur');
        }, 300);
        e.preventDefault();
    });

    $('.contacts-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.contacts-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.contacts-menu ul li').index(curLi);
            $('.contacts-tab.active').removeClass('active');
            $('.contacts-tab').eq(curIndex).addClass('active');
            myMap.geoObjects.removeAll();
            if (curIndex == 0) {
                myMap.geoObjects.add(myPlacemark1);
            }
            if (curIndex == 1) {
                myMap.geoObjects.add(myPlacemark2);
            }
            if (curIndex == 2) {
                myMap.geoObjects.add(myPlacemark3);
            }
        }
        e.preventDefault();
    });

    $('.video-filter input').change(function() {
        $('.video-item').each(function() {
            var curItem = $(this);
            var curType = curItem.find('.video-item-type').text();
            var result = false;
            $('.video-filter input:checked').each(function() {
                if ($(this).parent().find('span').text() == curType) {
                    result = true;
                }
            });
            if (result) {
                curItem.removeClass('hidden');
            } else {
                curItem.addClass('hidden');
            }
        });
    });

    $('.video-list').each(function() {
        if ($('.video-item').length > 18) {
            $('.video-list').data('curSize', 18);
            $('.video-list-more').addClass('visible');
        }
    });

    $('.video-list-more a').click(function(e) {
        var curSize = Number($('.video-list').data('curSize')) + 18;
        $('.video-list').data('curSize', curSize);
        $('.video-item:lt(' + curSize + ')').addClass('visible');
        if (curSize >= $('.video-item').length) {
            $('.video-list-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('.video-filter-title a').click(function(e) {
        $('.video-filter').toggleClass('open');
        e.preventDefault();
    });

    $('.test-question-variant a').click(function(e) {
        var curVariant = $(this).parent();
        var curQuestion = $(this).parents().filter('.test-question');
        if (!curQuestion.hasClass('open')) {
            curVariant.addClass('selected');
            curQuestion.addClass('open');
            if (!curVariant.hasClass('correct')) {
                curQuestion.addClass('failed');
            }
        }
        e.preventDefault();
    });

    $('.test-question').eq(0).addClass('active');

    $('.test-mobile-welcome-link a').click(function(e) {
        var curScroll = $(window).scrollTop();
        $('html').addClass('test-mobile-open');
        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        e.preventDefault();
    });

    $('.test-mobile-close, .test-results-link-close a').click(function(e) {
        $('html').removeClass('test-mobile-open');
        $('.wrapper').css({'top': 'auto'});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('.test-question-mobile-next a').click(function(e) {
        var curItem = $(this).parents().filter('.test-question');
        curItem.removeClass('active');
        curItem.next().addClass('active');
        e.preventDefault();
    });

    $('.test-question-mobile-result-link a').click(function(e) {
        $('.test').addClass('results');
        var curTrue = $('.test-question').length - $('.test-question.failed').length;
        var countAll = $('.test-question').length;
        $('.test-results-status-current').html(curTrue);
        $('.test-results-status-count').html(countAll);
        var newPercent = curTrue / countAll * 100;
        $('.test-results-title').each(function() {
            var curTitle = $(this);
            var curPercent = Number(curTitle.attr('data-percents'));
            if (newPercent >= curPercent) {
                $('.test-results-title.visible').removeClass('visible');
                curTitle.addClass('visible');
            }
        });
        e.preventDefault();
    });

    $('.test-results-link-record a').click(function(e) {
        $('html').removeClass('test-mobile-open');
        $('.wrapper').css({'top': 'auto'});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('.services-disease-header').click(function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.faq-item-header', function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.faq-item-text-more-link a', function(e) {
        $(this).parent().toggleClass('open');
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

        $('.contacts-menu').each(function() {
            $(this).mCustomScrollbar('destroy');
        });

        $('.service-principle-list').each(function() {
            $(this).mCustomScrollbar('destroy');
        });

        $('.laser-diseases').each(function() {
            $(this).mCustomScrollbar('destroy');
        });

        $('.laser-compare').each(function() {
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

        $('.contacts-menu').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });

        $('.service-principle-list').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });

        $('.laser-diseases').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });

        $('.laser-compare').each(function() {
            $(this).mCustomScrollbar({
                axis: 'x'
            });
        });
    }

    $('.submenu-mobile').remove();
    $('.nav ul li.open').removeClass('open');

    $('.cataract-how-list').each(function() {
        var curList = $(this);

        curList.find('.cataract-how-item-inner').css({'min-height': '0px'});

        curList.find('.cataract-how-item-inner').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.cataract-how-item-inner').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
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

    if (windowScroll > $('header').height()) {
        $('.side-panel').addClass('visible');
    } else {
        $('.side-panel').removeClass('visible');
    }

    $('.page-menu').each(function() {
        if (windowScroll >= $('.page-menu').offset().top) {
            $('.page-menu').addClass('fixed');
            if (windowScroll + $('.page-menu').find('.page-menu-inner').height() > $('.page').offset().top + $('.page').height()) {
                $('.page-menu-inner').css({'margin-top': ($('.page').offset().top + $('.page').height()) - (windowScroll + $('.page-menu-inner').height())});
            } else {
                $('.page-menu-inner').css({'margin-top': 0});
            }
        } else {
            $('.page-menu').removeClass('fixed');
            $('.page-menu-inner').css({'margin-top': 0});
        }
    });

    $('.page-menu li a').each(function() {
        var curLink = $(this);
        var curBlock = $(curLink.attr('href'));
        if (curBlock.length == 1) {
            if (windowScroll + windowHeight / 2 > curBlock.offset().top) {
                $('.page-menu li.active').removeClass('active');
                curLink.parent().addClass('active');
            }
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

        var doctorID = getUrlVar(linkWindow)['doctorID'];
        if (typeof(doctorID) !== 'undefined') {
            $('.window .form-select input[value="' + doctorID + '"]').prop('checked', true).trigger('change');
        }

        var phone = $('.service-callback-input input').val();
        if (typeof(phone) !== 'undefined' && phone !== '') {
            $('.window .form-input input.phoneRU').val(phone).trigger('change').trigger('blur');
        }

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

function getUrlVar(url) {
    var arrayVar = [];
    var valueAndKey = [];
    var resultArray = [];
    var urlVar = url.split('?')[1];
    if (typeof(urlVar) !== 'undefined') {
        arrayVar = urlVar.split('&');
        if (arrayVar[0] == '') return false;
        for (i = 0; i < arrayVar.length; i ++) {
            valueAndKey = arrayVar[i].split('=');
            resultArray[valueAndKey[0]] = valueAndKey[1];
        }
    }
    return resultArray;
}

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';
var captchaArray = [];

var onloadCallback = function() {
    $('.g-recaptcha').each(function() {
        var newCaptcha = grecaptcha.render(this, {
            'sitekey' : captchaKey,
            'callback' : verifyCallback,
        });
        captchaArray.push([newCaptcha, $(this)]);
    });
};

var verifyCallback = function(response) {
    for (var i = 0; i < captchaArray.length; i++) {
        if (grecaptcha.getResponse(captchaArray[i][0])) {
            var curInput = captchaArray[i][1].next();
            curInput.val(response);
            curInput.removeClass('error');
            curInput.parent().find('label.error').remove();
        }
    }
};