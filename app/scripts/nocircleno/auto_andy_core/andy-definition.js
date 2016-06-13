/*global define */
define(

   ['backbone', 'nocircleno/geom/point', 'nocircleno/geom/rectangle', 'nocircleno/auto_andy_core/registration-point-location', 'nocircleno/auto_andy_core/faces'],

   function (Backbone, Point, Rectangle, RegistrationPointLocation, Faces) {

      return Backbone.Model.extend({

         defaults:function () {
            return {
               x:0,
               y:0,
               scale:1,
               containerScale:1,
               rotation:0,
               renderColor:"#000000",
               faceName:"",
               arcs:[],
               innerRectangle:new Rectangle(),
               outlineBounds:new Rectangle(),
               registrationPointLocation:RegistrationPointLocation.NATURAL,
               svg:"<svg></svg>",
               buildDirty:false
            };
         },

         addArc:function (arc) {
            this.get("arcs").push(arc);
            this.set("buildDirty", true);
         },

         removeArc:function (arc) {

            var arcs = this.get("arcs");
            var numArcs = arcs.length;
            var i;

            for (i = 0; i < numArcs; ++i) {

               if (arcs[i].equals(arc)) {

                  arcs.splice(i, 1);
                  break;

               }

            }

            this.set("buildDirty", true);

         },

         replaceArcAt:function (arc, index) {

            var arcs = this.get("arcs");

            if (arcs.length > index) {

               arcs[index].set("startPoint", arc.get("startPoint").clone());
               arcs[index].set("controlPoint", arc.get("controlPoint").clone());
               arcs[index].set("endPoint", arc.get("endPoint").clone());

               this.set("buildDirty", true);

            }

         },

         setRegistrationPointLocation:function (regLocation) {

            // store location
            this.set("registrationPointLocation", regLocation);

            var arcs = this.get("arcs");
            var numArcs = arcs.length;

            var left = 9999;
            var right = -9999;
            var top = 9999;
            var bottom = -9999;
            var i;
            var arcBounds;
            var xOffset;
            var yOffset;

            // calculate bounds of outline
            for (i = 0; i < numArcs; ++i) {

               arcBounds = arcs[i].getBoundingRect();

               left = arcBounds.left() < left ? arcBounds.left() : left;
               right = arcBounds.right() > right ? arcBounds.right() : right;
               top = arcBounds.top() < top ? arcBounds.top() : top;
               bottom = arcBounds.bottom() > bottom ? arcBounds.bottom() : bottom;

            }

            var outlineWidth = right - left;
            var outlineHeight = bottom - top;

            if (regLocation === RegistrationPointLocation.OUTLINE_TOP_LEFT) {

               for (i = 0; i < numArcs; ++i) {

                  arcs[i].get("startPoint").set("x", arcs[i].get("startPoint").get("x") - left);
                  arcs[i].get("startPoint").set("y", arcs[i].get("startPoint").get("y") - top);

                  arcs[i].get("controlPoint").set("x", arcs[i].get("controlPoint").get("x") - left);
                  arcs[i].get("controlPoint").set("y", arcs[i].get("controlPoint").get("y") - top);

                  arcs[i].get("endPoint").set("x", arcs[i].get("endPoint").get("x") - left);
                  arcs[i].get("endPoint").set("y", arcs[i].get("endPoint").get("y") - top);

               }

               this.set("outlineBounds", new Rectangle({x:0, y:0, width:outlineWidth, height:outlineHeight}));

               this.get("innerRectangle").set("x", this.get("innerRectangle").get("x") - left);
               this.get("innerRectangle").set("y", this.get("innerRectangle").get("y") - top);

            } else if (regLocation === RegistrationPointLocation.OUTLINE_CENTER) {

               xOffset = outlineWidth / 2 + left;
               yOffset = outlineHeight / 2 + top;

               for (i = 0; i < numArcs; ++i) {

                  arcs[i].get("startPoint").set("x", arcs[i].get("startPoint").get("x") - xOffset);
                  arcs[i].get("startPoint").set("y", arcs[i].get("startPoint").get("y") - yOffset);

                  arcs[i].get("controlPoint").set("x", arcs[i].get("controlPoint").get("x") - xOffset);
                  arcs[i].get("controlPoint").set("y", arcs[i].get("controlPoint").get("y") - yOffset);

                  arcs[i].get("endPoint").set("x", arcs[i].get("endPoint").get("x") - xOffset);
                  arcs[i].get("endPoint").set("y", arcs[i].get("endPoint").get("y") - yOffset);

               }

               this.set("outlineBounds", new Rectangle({x:left - xOffset, y:top - yOffset, width:outlineWidth, height:outlineHeight}));

               this.get("innerRectangle").set("x", this.get("innerRectangle").get("x") - xOffset);
               this.get("innerRectangle").set("y", this.get("innerRectangle").get("y") - yOffset);

            } else if (regLocation === RegistrationPointLocation.VISUAL_CENTER) {

               var innerRectCenter = new Point({x:(this.get("innerRectangle").left() + (this.get("innerRectangle").get("width") / 2)), y:(this.get("innerRectangle").top() + (this.get("innerRectangle").get("height") / 2))});

               xOffset = innerRectCenter.get("x");
               yOffset = innerRectCenter.get("y");

               for (i = 0; i < numArcs; ++i) {

                  arcs[i].get("startPoint").set("x", arcs[i].get("startPoint").get("x") - xOffset);
                  arcs[i].get("startPoint").set("y", arcs[i].get("startPoint").get("y") - yOffset);

                  arcs[i].get("controlPoint").set("x", arcs[i].get("controlPoint").get("x") - xOffset);
                  arcs[i].get("controlPoint").set("y", arcs[i].get("controlPoint").get("y") - yOffset);

                  arcs[i].get("endPoint").set("x", arcs[i].get("endPoint").get("x") - xOffset);
                  arcs[i].get("endPoint").set("y", arcs[i].get("endPoint").get("y") - yOffset);

               }

               this.set("outlineBounds", new Rectangle({x:left - xOffset, y:top - yOffset, width:outlineWidth, height:outlineHeight}));

               this.get("innerRectangle").set("x", this.get("innerRectangle").get("x") - xOffset);
               this.get("innerRectangle").set("y", this.get("innerRectangle").get("y") - yOffset);

            }

            // set dirty flag
            this.set("buildDirty", true);

         },

         getSVGPath:function () {

            var arcs = this.get("arcs");
            var numberOfArcs = arcs.length;
            var padding = " ";

            var pathData = "M " + arcs[0].get("startPoint").get("x") + " " + arcs[0].get("startPoint").get("y");

            for (var i = 0; i < numberOfArcs; i++) {
               pathData += padding + "Q " + arcs[i].get("controlPoint").get("x") + " " + arcs[i].get("controlPoint").get("y") + " " + arcs[i].get("endPoint").get("x") + " " + arcs[i].get("endPoint").get("y");
            }

            pathData += " z";

            return pathData;

         },

         toJSON:function (applyDropShadow, debug) {

            if (debug === undefined) {
               debug = false;
            }

            if (applyDropShadow === undefined) {
               applyDropShadow = false;
            }

            var renderColor = this.get("renderColor");
            var bodyPath = this.getSVGPath();
            var faceName = this.get("faceName");
            var innerRectangle = this.get("innerRectangle").toMinString();
            var rotation = this.get("rotation");
            var finalScale = this.get("containerScale") * this.get("scale");
            var context = {renderColor:renderColor, bodyPath:bodyPath};

            // debug data
            if (debug) {
               context.outerLeft = this.get("outlineBounds").left();
               context.outerTop = this.get("outlineBounds").top();
               context.outerWidth = this.get("outlineBounds").get("width");
               context.outerHeight = this.get("outlineBounds").get("height");
            }

            context.id = this.id;
            context.applyDropShadow = applyDropShadow;
            context.innerRect = innerRectangle;
            context.x = this.get("x"); // * finalScale;
            context.y = this.get("y"); // * finalScale;
            context.scale = finalScale;

            if (rotation !== 0) {

               var centerPoint = new Point();
               centerPoint.set("x", 0);
               centerPoint.set("y", 0);

               context.rotation = this.get("rotation") + ", " + centerPoint.get("x") + ", " + centerPoint.get("y");

               // debug data
               if (debug) {
                  context.centerX = centerPoint.get("x");
                  context.centerY = centerPoint.get("y");
               }

            } else {
               context.rotation = 0;
            }

            context.faceColor = "#ffffff";
            context.faceName = faceName;
            context.faceScale = 1;
            context.faceRotation = 0;
            context.facePath = Faces.getFaceSvg(faceName);
            context.faceXPos = this.get("innerRectangle").get("x") + ((this.get("innerRectangle").get("width") - Faces.getIntrinsicFaceWidth(faceName)) / 2);
            context.faceYPos = this.get("innerRectangle").get("y") + ((this.get("innerRectangle").get("height") - Faces.getIntrinsicFaceHeight(faceName)) / 2);

            return context;

         }

      });
   }
);