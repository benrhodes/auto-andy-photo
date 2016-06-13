/*global define */
define(

   ['backbone'],

   function (Backbone) {

      return Backbone.Model.extend({

         defaults: {
            width: 100,
            height: 44,
            handleWidth: 42,
            handleHeight: 42,
            rangeMin: 2,
            rangeMax: 40,
            value: 16,
            startDragPointX:0,
            startDragPointY:0
         },

         validate: function(attr) {
            if(attr.value < this.rangeMin || attr.value > this.rangeMax) {
               return "Value is out of range";
            }
         }
      });
   }
);