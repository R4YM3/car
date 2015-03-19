require.config({
    baseUrl: '../js/app',
    paths: {
        'jquery': '../../../components/jquery/jquery.min',
        'modernizr': '../../../components/modernizr/modernizr',
        'respond': '../../../components/respond/respond.min',
        'requireLib': '../../../components/requirejs/require'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

// require([
//     'polyfills',
//     'menu'
// ]);

require(['helpers/alert'], function(Y){
    Y.alert('alert');
});
