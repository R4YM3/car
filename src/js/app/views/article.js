define(["jquery", "sticky-kit"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    'use strict';

    var WindowHeight = $(window).height();
    var SocialShareHeight = $(".socialshare").height();
    var SocialShareOffset = WindowHeight - SocialShareHeight;

    var AuthorHeight = $(".socialshare").height();
    var AuthorOffset = WindowHeight - AuthorHeight;

    $(".socialshare")
        .addClass("sticky")
        .stick_in_parent({
            offset_top: SocialShareOffset,
        });

    $(".more")
        .addClass("sticky")
        .stick_in_parent({
            offset_top: AuthorHeight,
        });

    $(".author, .list.more")
        .addClass("sticky")
        .stick_in_parent();
});
