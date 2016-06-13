/*global define */
define(

   ['backbone', 'nocircleno/utils/conversions', 'nocircleno/math/angles', 'nocircleno/geom/point'],

   function (Backbone, Conversions, Angles, Point) {

      return Backbone.Model.extend({

         defaults:function () {
            return {
               centerPoint:new Point(),
               radius:0,
               angleMin:0,
               angleMax:0
            };
         },

         initialize:function () {
         },

         /**
          *   <code>getRandomPointOnCircle</code> method will return a random angle in degrees that is between the two passed angles.
          *
          *   @return An angle in degrees between the two passed angles.
          */
         getRandomPointOnCircle:function () {

            // convert to radians
            var randomAngleRadians = Conversions.radians(Angles.getRandomAngleBetweenTwoAngles(this.get("angleMin"), this.get("angleMax")));

            // calculate new point on circle
            var newPoint = new Point({x:this.get("radius") * Math.cos(randomAngleRadians), y:this.get("radius") * Math.sin(randomAngleRadians)});
            newPoint.set("x", newPoint.get("x") + this.get("centerPoint").get("x"));
            newPoint.set("y", newPoint.get("y") + this.get("centerPoint").get("y"));

            return newPoint;

         },

         toString:function () {
            return "(centerPoint=" + this.get("centerPoint").toString() + ", radius=" + this.get("radius") + ", angleMin=" + this.get("angleMin") + ", angleMax=" + this.get("angleMax") + ")";
         }

      });
   }
);