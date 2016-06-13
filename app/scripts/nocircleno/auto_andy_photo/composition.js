/*global define */
define(

   ['backbone'],

   function (Backbone) {

      return Backbone.Model.extend({

         defaults:function () {
            return {
               canvasWidth:0,
               canvasHeight:0,
               photoData:"",
               maskCanvas:undefined,
               andySvg:undefined
            };
         }

      });
   }
);