/*global define */
define(
   ['backbone', 'nocircleno/geom/point', 'nocircleno/geom/rectangle'],

   function (Backbone, Point, Rectangle) {

      return Backbone.Model.extend({

         defaults:function () {
            return {
               startPoint:new Point(),
               controlPoint:new Point(),
               endPoint:new Point(),
               cornerArc:false
            };
         },

         initialize:function () {

         },

         equals:function (arcRef) {

            var refStartPoint = arcRef.get("startPoint");
            var refControlPoint = arcRef.get("controlPoint");
            var refEndPoint = arcRef.get("endPoint");

            var startPoint = this.get("startPoint");
            var controlPoint = this.get("controlPoint");
            var endPoint = this.get("endPoint");

            return (refStartPoint.equals(startPoint) && refControlPoint.equals(controlPoint) && refEndPoint.equals(endPoint));

         },

         getBoundingRect:function () {

            var rect = new Rectangle();

            rect.left(Math.min(this.get("startPoint").get("x"), this.get("controlPoint").get("x"), this.get("endPoint").get("x")));
            rect.right(Math.max(this.get("startPoint").get("x"), this.get("controlPoint").get("x"), this.get("endPoint").get("x")));
            rect.top(Math.min(this.get("startPoint").get("y"), this.get("controlPoint").get("y"), this.get("endPoint").get("y")));
            rect.bottom(Math.max(this.get("startPoint").get("y"), this.get("controlPoint").get("y"), this.get("endPoint").get("y")));

            return rect;

         },

         toString:function () {
            return "(Start Point=" + this.get("startPoint") + ", Control Point=" + this.get("controlPoint") + ", End Point: " + this.get("endPoint") + ", Corner Arc: " + this.get("cornerArc").toString() + " )";
         }

      });
   }
);