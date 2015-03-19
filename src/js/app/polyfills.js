define(['modernizr'], function (m) {
    'use strict';
    
    m.load({
        test: m.mq('only all'),
        nope: 'respond.js'
    });
});