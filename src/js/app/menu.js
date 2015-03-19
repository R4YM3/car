define(['jquery'], function ($) {
    'use strict';

    $('.js-toggle-nav-main').on('click', function () {
        if (!$('.js-toggle-nav-main').hasClass('toggle-open')) {
            $('.js-toggle-nav-main').addClass('toggle-open')
        } else {
            $('.js-toggle-nav-main').removeClass('toggle-open')
        }
    });
});
