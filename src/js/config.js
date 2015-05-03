'use strict';

require.config({
    baseUrl: '../js/app',
    paths: {
        jquery: '../../components/jquery/dist/jquery',
        modernizr: '../../components/modernizr/modernizr',
        respond: '../../../components/respond/respond.min',
        requireLib: '../../../components/requirejs/require',
        fontawesome: '../../components/fontawesome/fonts/*',
        'fontface-novecento-wide': '../../components/fontface-novecento-wide/fonts/**/*',
        html5shiv: '../../components/html5shiv/dist/html5shiv',
        requirejs: '../../components/requirejs/require',
        'sticky-kit': '../../components/sticky-kit/jquery.sticky-kit',
        FlowTypeJS: '../../components/FlowTypeJS/flowtype',
        fitvids: '../../components/fitvids/jquery.fitvids'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        modernizr: {
            exports: 'Modernizr'
        }
    },
    packages: [

    ]
});

// require([
//     'polyfills',
//     'menu'
// ]);

require(['helpers/alert'], function(Y) {
    Y.alert('alert');
});
