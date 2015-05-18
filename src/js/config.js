'use strict';

require.config({
    baseUrl: '../js/app',
    paths: {
        jquery: '../../components/jquery/dist/jquery',
        modernizr: '../../components/modernizr/modernizr',
        respond: '/static/wtf/components/respond/respond.min',
        requireLib: '/static/wtf/components/requirejs/require',
        html5shiv: '../../components/html5shiv/dist/html5shiv',
        requirejs: '../../components/requirejs/require',
        'sticky-kit': '../../components/sticky-kit/jquery.sticky-kit',
        sticky: '../../components/sticky/index',
        FlowTypeJS: '../../components/FlowTypeJS/flowtype',
        fitvids: '../../components/fitvids/jquery.fitvids',
        fontawesome: '../../components/fontawesome/fonts/*',
        'fontface-novecento-wide': '../../components/fontface-novecento-wide/fonts/**/*'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        'sticky-kit': {
            deps: [
                'jquery'
            ],
            exports: 'sticky-kit'
        },
        sticky: {
            deps: [
                'jquery'
            ],
            exports: 'sticky'
        }
    },
    packages: [

    ]
});

// require([
//     'polyfills',
//     'menu'
// ]);

// require(['helpers/alert'], function(Y) {
//     Y.alert('alert');
// });
