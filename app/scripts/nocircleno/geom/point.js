/*global define */
define(

   ['backbone'],

   function (Backbone) {

      var Point = Backbone.Model.extend({

         defaults:function () {
            return {
               x:0,
               y:0
            };
         },

         initialize:function () {
         },

         validate:function (attrs) {

            if (isNaN(attrs.x) || isNaN(attrs.y)) {
               return "Numbers only please!";
            }

         },

         equals:function (refPoint) {
            return (refPoint.get("x") === this.get("x") && refPoint.get("y") === this.get("y"));
         },

         interpolate:function (otherPoint, ratio) {

            return new Point({x:(ratio * this.get("x") + (1 - ratio) * otherPoint.get("x")),
               y:(ratio * this.get("y") + (1 - ratio) * otherPoint.get("y"))});

         },

         toString:function () {
            return "(x=" + this.get("x") + ", y=" + this.get("y") + ")";
         }

      });

      return Point;

   }
);