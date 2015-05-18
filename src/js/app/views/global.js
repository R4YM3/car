define(["jquery"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    'use strict';

    $(document).ready(function() {

        $(".js-hide").hide();

        $('.search.input_text').bind('blur', function() {
            $(".search.block").removeClass("focus");
            $(".followus.block").removeClass("hide");
        });

        $('.search.input_text').bind('focus', function() {
            $(".search.block").addClass("focus");
            $(".followus.block").addClass("hide");
        });

        if (code == 27) { // Escape
            $("input_text").off('blur'); // unbind the blur event
        }
    });

});
