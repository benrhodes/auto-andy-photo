require.config({
   deps:["main"],
   baseUrl:"scripts/",
   modules:[
      {
         name:"main"
      }
   ],
   paths:{
      jquery:"vendor/jquery.min",
      underscore:"vendor/underscore-min",
      backbone:"vendor/backbone-min",
      handlebars:"vendor/handlebars.runtime",
      rgbColor:"vendor/rgbcolor",
      requestAnimationFrameShim:"vendor/request-animation-frame-shim"
   },
   shim:{
      underscore:{
         exports:"_"
      },
      backbone:{
         deps:["underscore", "jquery"],
         exports:"Backbone"
      },
      handlebars:{
         exports:"Handlebars"
      },
      rgbColor:{
         exports:"RGBColor"
      },
      requestAnimationFrameShim: {
         exports: "requestAnimationFrameShim"
      }
   }
});