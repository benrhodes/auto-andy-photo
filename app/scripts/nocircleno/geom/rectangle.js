/*global define */
define(

   ['backbone'],

   function (Backbone) {

      return Backbone.Model.extend({

         defaults:{
            x:0,
            y:0,
            width:0,
            height:0
         },

         validate:function (attrs) {
            if (isNaN(attrs.x) || isNaN(attrs.y) || isNaN(attrs.width) || isNaN(attrs.height)) {
               return "Numbers only please!";
            }
         },

         left:function (val) {

            if (val) {

               var currentRight = this.right();
               var newWidth = Math.abs(currentRight - val);
               this.set("width", newWidth);
               this.set("x", val);
            }

            return this.get("x");

         },

         right:function (val) {

            if (val) {
               this.set("width", val - this.get("x"));
            }

            return (this.get("x") + this.get("width"));

         },

         top:function (val) {

            if (val) {

               var currentBottom = this.bottom();
               var newHeight = Math.abs(currentBottom - val);
               this.set("height", newHeight);
               this.set("y", val);
            }

            return this.get("y");
         },

         bottom:function (val) {

            if (val) {
               this.set("height", val - this.get("y"));
            }

            return (this.get("y") + this.get("height"));

         },

         toString:function () {
            return "(x=" + this.get("x") + ", y=" + this.get("y") + ", w=" + this.get("width") + ", h=" + this.get("height") + ")";
         },

         toMinString:function () {
            return this.get("x") + "," + this.get("y") + "," + this.get("width") + "," + this.get("height");
         }

      });
   }
);