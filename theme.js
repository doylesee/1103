// Set height
function setHeight(the_selector) {
    var a_height = 0;
    $(the_selector).css('height','auto');
    $(the_selector).each(function() {    
        if ($(this).outerHeight() > a_height) {
            a_height = $(this).outerHeight();
        }
    });
    $(the_selector).attr('style','height: '+a_height+'px;');
}

// Responsive videos
function setrespvideos() {
    var $allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com'], iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed").not('.no-resize-video');
    $allVideos.each(function() {
        $(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
    });
    $(window).resize(function() {
        $allVideos.each(function() {
            newHeight = $(this).width() * $(this).attr('data-aspectRatio');
            $(this).attr('style','height: '+newHeight+'px !important');
        });
    }).resize();
}

function showhidesubitems() {
    // escape header subnav
    if ( $('.header__menu').hasClass('child-item-active') ) {
        $('.header__menu').removeClass('child-item-active');
        $('.parent-item').attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
        $('.parent-item').removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');
    }
}

$(document).ready(function() {
    // Setting responsive videos
    setrespvideos();

    $(window).resize(function(){
        // Screen section: set min-height same as window height
        $('.screen-section').css('min-height',$(window).height()+'px');

        // Same height containers
        var same_height_counter = 0;
        var same_height_class_new = '';
        if ( $('.same-height-parent-js').length > 0 ) {
            $('.same-height-parent-js').each( function() {
                same_height_counter++;
                if ( $(this).find('.same-height-item-js').length > 0 ) {
                    $(this).find('.same-height-item-js').each( function() {
                        same_height_class_new = 'same-height-item--'+same_height_counter;
                        $(this).addClass(same_height_class_new);
                    });
                    setHeight('.'+same_height_class_new);
                }
            });
        }
    }).resize();

    $(window).scroll(function() {
        // Header section sticky
        if ($(window).scrollTop() > $('.header-anchor.js').offset().top) {
            $('.header-outer, .template-content').addClass('fixed');
        } else {
            $('.header-outer, .template-content').removeClass('fixed');
        }
    }).scroll();

    // Mobile menu
    $('.header__menu-mobile-button').click(function() {
        if ( $('.header__menu.active').length > 0 ) {
            $('.header__menu-mobile-button a').attr('aria-expanded','false');
            $('.header__menu').attr('aria-hidden','true');
        }
        else {
            $('.header__menu-mobile-button a').attr('aria-expanded','true');
            $('.header__menu').attr('aria-hidden','false');
        }
        $('.header__menu').toggleClass('active');
    });
    // START Web-accessible dropdown menu
    $('.parent-item').click(function(event) {
        if ($(this).hasClass('active')) {
            // remove aria and active classes to existing item
            $('.header__menu').removeClass('child-item-active');
            $(this).attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
            $(this).removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');
        }
        else {
            // remove aria and active classes to existing items
            $('.parent-item').attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
            $('.parent-item').removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');

            // add aria and active classes to clicked item
            $('.header__menu').addClass('child-item-active');
            $(this).attr('aria-expanded','true').next('.child-item').attr('aria-hidden','false');
            $(this).addClass('active').next('.child-item').addClass('active').parent('li').addClass('active');
        }
    });
    $('.child-item__back-link').click(function() {
        $('.header__menu').removeClass('child-item-active');
        $(this).parents('.child-item').attr('aria-hidden','true').removeClass('active').prev('.parent-item').attr('aria-expanded','false').removeClass('active');
    });
    // Set aria-hidden for header__menu and header_menu so screen reader can read/detect menu items
    if ($('.width-detector').width() >= 1024) {
        $('.header__menu, .header__menu').attr('aria-hidden','false');
    }
    else {
        $('.header__menu, .header__menu').attr('aria-hidden','true');
        $('.header__menu').removeClass('child-item-active');
        $('.parent-item').attr('aria-expanded','false').removeClass('active');
        $('.child-item').attr('aria-hidden','true').removeClass('active').parent('li').removeClass('active');
    }
    // ESC key - to escape header subnav
    document.addEventListener('keydown', function(event){
        if ( (event.key === "Escape") || (event.keyCode === 27) ){
            showhidesubitems();
        }
    });
    const v_menu = $('.header__menu');
    $(document).mouseup(function (e) {
        if ( (!v_menu.is(e.target) && v_menu.has(e.target).length === 0) ) {
            showhidesubitems();
        }
    });
    // END Web-accessible dropdown menu
});

$(window).on('load', function() {
    $(window).resize();
});