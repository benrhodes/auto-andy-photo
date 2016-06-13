require.config({

    deps: ["main-tests"],

    baseUrl: "scripts/",

    paths: {
        jquery: "vendor/jquery.min",
        underscore: "vendor/underscore-min",
        backbone: "vendor/backbone-min",
        handlebars:"vendor/handlebars.runtime",
        rgbColor: "vendor/rgbcolor"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        handlebars: {
            exports: "Handlebars"
        },
        rgbColor: {
            exports: "RGBColor"
        }
    }

});