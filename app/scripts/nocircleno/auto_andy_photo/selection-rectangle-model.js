/*global define */
define(

   ['backbone'],

   function (Backbone) {

      return Backbone.Model.extend({
         defaults:{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            rotation: 0,
            scale: 1,
            handleSize: 20,
            strokeColor: "#333333",
            fillColor: "#ffffff",
            rotationHandleYOffset: -48,
            rotationHandleRadius: 10,
            strokeSize: 4,
            minDimension: 20
         },
         initialize: function() {
            this.on("change:width change:height", this.cacheCommonCalculatedValues, this);
            this.cacheCommonCalculatedValues();
         },
         validate: function(attrs, options) {
            if (attrs.width < this.minDimension ||  attrs.height < this.minDimension) {
               return "Dimension is to small";
            }
         },
         cacheCommonCalculatedValues: function() {
            this.set("halfWidth", this.get("width") / 2 );
            this.set("halfHeight", this.get("height") / 2 );
            this.set("halfHandleSize", this.get("handleSize") / 2 );
         }

      });
   }
);