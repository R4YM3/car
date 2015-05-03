define(['jquery'], function($) {
    'use strict';

    $('body').addClass('test');

    var Methods = {
        alert: function($value) {
            window.alert($value);
        }
    };

    return Methods;
});
