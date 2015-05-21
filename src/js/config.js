'use strict';

var componentsDir = '../../../';

require.config({
    baseUrl: '../js/app',
    paths: {
        jquery: componentsDir + 'components/jquery/dist/jquery',
        modernizr: componentsDir + 'components/modernizr/modernizr',
        respond: '/static/wtf/components/respond/respond.min',
        requireLib: '/static/wtf/components/requirejs/require',
        html5shiv: componentsDir + 'components/html5shiv/dist/html5shiv',
        requirejs: componentsDir + 'components/requirejs/require',
        'sticky-kit': componentsDir + 'components/sticky-kit/jquery.sticky-kit',
        sticky: componentsDir + 'components/sticky/index',
        FlowTypeJS: componentsDir + 'components/FlowTypeJS/flowtype',
        fitvids: componentsDir + 'components/fitvids/jquery.fitvids',
        fontawesome: componentsDir + 'components/fontawesome/fonts/*',
        'fontface-novecento-wide': componentsDir + 'components/fontface-novecento-wide/fonts/**/*'
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
