/*global define */
define(

   ['nocircleno/utils/conversions', 'nocircleno/geom/point', 'nocircleno/geom/rectangle', 'nocircleno/geom/arc', 'nocircleno/auto_andy_core/generator-circle', 'nocircleno/auto_andy_core/andy-definition', 'nocircleno/auto_andy_core/faces'],

   function (Conversions, Point, Rectangle, Arc, GeneratorCircle, AndyDefinition, Faces) {

      return (function () {

         "use strict";

         var CURVE_ERROR_ADJUSTMENT = 5;
         var DRAW_DIRECTION_START = "drawDirectionStart";
         var DRAW_DIRECTION_RIGHT = "drawDirectionRight";
         var DRAW_DIRECTION_LEFT = "drawDirectionLeft";
         var DRAW_DIRECTION_UP = "drawDirectionUp";
         var DRAW_DIRECTION_DOWN = "drawDirectionDown";
         var DRAW_DIRECTION_STOP = "drawDirectionStop";

         var _drawSequenceIndex = 0;
         var _sequenceJustChanged = false;
         var _startPoint = null;
         var _drawPoint = null;
         var _prevDrawPoint = null;
         var _prevControlPoint = null;
         var _andyFactorySettings = null;

         var _drawSequence = [];
         _drawSequence.push(DRAW_DIRECTION_START);
         _drawSequence.push(DRAW_DIRECTION_RIGHT);
         _drawSequence.push(DRAW_DIRECTION_DOWN);
         _drawSequence.push(DRAW_DIRECTION_LEFT);
         _drawSequence.push(DRAW_DIRECTION_UP);
         _drawSequence.push(DRAW_DIRECTION_STOP);

         /*******************************************************************************
          Method   :       getGeneratorCircle()

          Purpose   :   This method will calculate the bounds of a circle to use
          with generate random point method.

          Params   :       seq -- seq id of character creation
          radius -- radius of circle.
          ********************************************************************************/
         var getGeneratorCircle = function (drawPoint, seq, radius) {

            var circleInfo = new GeneratorCircle();
            circleInfo.set("radius", radius);

            var minLimitAngel;
            var maxLimitAngel;
            var oppositeSide;
            var centerPoint;

            var genDimensions = _andyFactorySettings.get("generationDimensions");
            var outerPadding = _andyFactorySettings.get("outerPadding");
            var innerPadding = _andyFactorySettings.get("innerPadding");

            switch (seq) {

               case DRAW_DIRECTION_START:

                  circleInfo.set("angleMin", 181);
                  circleInfo.set("angleMax", -1);
                  circleInfo.set("centerPoint", drawPoint.clone());

                  break;

               case DRAW_DIRECTION_RIGHT:

                  circleInfo.set("angleMin", -89);
                  circleInfo.set("angleMax", 89);
                  circleInfo.set("centerPoint", new Point({x:drawPoint.get("x") + radius, y:drawPoint.get("y")}));

                  if ((circleInfo.get("centerPoint").get("y") - radius) < (genDimensions.get("y") - outerPadding)) {

                     if (circleInfo.get("centerPoint").get("y") < (genDimensions.get("y") - outerPadding)) {

                        // update y position of point
                        circleInfo.get("centerPoint").set("y", genDimensions.get("y") - outerPadding);

                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("y") - (genDimensions.get("y") - outerPadding));

                     minLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMin", -minLimitAngel);

                  }

                  if ((circleInfo.get("centerPoint").get("y") + radius) > (genDimensions.get("y") + innerPadding)) {

                     if (circleInfo.get("centerPoint").get("y") > (genDimensions.get("y") + innerPadding)) {
                        circleInfo.get("centerPoint").set("y", (genDimensions.get("y") + innerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("y") - (genDimensions.get("y") + innerPadding));

                     maxLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMax", maxLimitAngel);

                  }

                  break;

               case DRAW_DIRECTION_DOWN:

                  circleInfo.set("angleMin", 1);
                  circleInfo.set("angleMax", 179);
                  circleInfo.set("centerPoint", new Point({x:drawPoint.get("x"), y:drawPoint.get("y") + radius}));

                  if ((circleInfo.get("centerPoint").get("x") + radius) > (genDimensions.get("x") + genDimensions.get("width") + outerPadding)) {

                     if (circleInfo.get("centerPoint").get("x") > (genDimensions.get("x") + genDimensions.get("width") + outerPadding)) {
                        circleInfo.get("centerPoint").set("x", (genDimensions.get("x") + genDimensions.get("width") + outerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("x") - (genDimensions.get("x") + genDimensions.get("width") + outerPadding));

                     minLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMin", 90 - minLimitAngel);

                  }

                  if ((circleInfo.get("centerPoint").get("x") - radius) < (genDimensions.get("x") + genDimensions.get("width") - innerPadding)) {

                     if (circleInfo.get("centerPoint").get("x") < (genDimensions.get("x") + genDimensions.get("width") - innerPadding)) {
                        circleInfo.get("centerPoint").set("x", (genDimensions.get("x") + genDimensions.get("width") - innerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("x") - (genDimensions.get("x") + genDimensions.get("width") - innerPadding));

                     maxLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMax", 90 + maxLimitAngel);

                  }

                  break;

               case DRAW_DIRECTION_LEFT:

                  circleInfo.set("angleMin", -91);
                  circleInfo.set("angleMax", 91);
                  circleInfo.set("centerPoint", new Point({x:drawPoint.get("x") - radius, y:drawPoint.get("y")}));

                  if ((circleInfo.get("centerPoint").get("y") + radius) > (genDimensions.get("y") + genDimensions.get("height") + outerPadding)) {

                     if (circleInfo.get("centerPoint").get("y") > (genDimensions.get("y") + genDimensions.get("height") + outerPadding)) {
                        circleInfo.get("centerPoint").set("y", (genDimensions.get("y") + genDimensions.get("height") + outerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("y") - (genDimensions.get("y") + genDimensions.get("height") + outerPadding));

                     minLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMin", (90 + (90 - minLimitAngel)));

                  }

                  if ((circleInfo.get("centerPoint").get("y") - radius) < (genDimensions.get("y") + genDimensions.get("height") - innerPadding)) {

                     if (circleInfo.get("centerPoint").get("y") < (genDimensions.get("y") + genDimensions.get("height") - innerPadding)) {
                        circleInfo.get("centerPoint").set("y", (genDimensions.get("y") + genDimensions.get("height") - innerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("y") - (genDimensions.get("y") + genDimensions.get("height") - innerPadding));

                     maxLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMax", (270 - (90 - maxLimitAngel)));

                  }

                  break;

               case DRAW_DIRECTION_UP:

                  circleInfo.set("angleMin", 181);
                  circleInfo.set("angleMax", -1);
                  circleInfo.set("centerPoint", new Point({x:drawPoint.get("x"), y:drawPoint.get("y") - radius}));

                  if ((circleInfo.get("centerPoint").get("x") - radius) < (genDimensions.get("x") - outerPadding)) {

                     if (circleInfo.get("centerPoint").get("x") < (genDimensions.get("x") - outerPadding)) {
                        circleInfo.get("centerPoint").set("x", (genDimensions.get("x") - outerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("x") - (genDimensions.get("x") - outerPadding));

                     minLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMin", (180 + 90 - minLimitAngel));

                  }

                  if ((circleInfo.get("centerPoint").get("x") + radius) > (genDimensions.get("x") + innerPadding)) {

                     if (circleInfo.get("centerPoint").get("x") > (genDimensions.get("x") + innerPadding)) {
                        circleInfo.get("centerPoint").set("x", (genDimensions.get("x") + innerPadding));
                     }

                     oppositeSide = Math.abs(circleInfo.get("centerPoint").get("x") - (genDimensions.get("x") + innerPadding));

                     maxLimitAngel = Math.round(Conversions.degrees(Math.asin(oppositeSide / radius)));
                     circleInfo.set("angleMax", (360 + (maxLimitAngel - 90)));

                  }

                  break;

               default:
                  break;
            }

            return circleInfo;

         };

         var generatePoint = function (andyDef) {

            var generatorCircle;

            // calculate random radius
            var randomRadius = _andyFactorySettings.getRandomRadius();

            var cornerArc = false;

            // store local generation dims
            var genDims = _andyFactorySettings.get("generationDimensions");

            if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_START) {

               var genPoint = new Point({x:genDims.get("x"), y:genDims.get("y")});

               generatorCircle = getGeneratorCircle(genPoint, DRAW_DIRECTION_START, randomRadius);

               _startPoint = generatorCircle.getRandomPointOnCircle();
               _drawPoint = _startPoint.clone();

               // move to the next draw mode in the sequence
               _drawSequenceIndex++;

            } else {

               generatorCircle = getGeneratorCircle(_drawPoint, _drawSequence[_drawSequenceIndex], randomRadius);

               // store previous draw point
               _prevDrawPoint = _drawPoint.clone();

               // get point on circle
               _drawPoint = generatorCircle.getRandomPointOnCircle();

               // check to see if it is time to move to next direction
               if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_RIGHT) {

                  if (_drawPoint.get("x") > (genDims.get("x") + genDims.get("width"))) {

                     _drawSequenceIndex++;
                     _sequenceJustChanged = true;
                     cornerArc = true;

                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_DOWN) {

                  if (_sequenceJustChanged) {

                     // check to see if first generated point is ok
                     if (_prevDrawPoint.get("x") > _drawPoint.get("x")) {
                        _drawPoint.set("x", _prevDrawPoint.get("x") + CURVE_ERROR_ADJUSTMENT);
                     }

                     if (_prevDrawPoint.get("y") > _drawPoint.get("y")) {
                        _drawPoint.set("y", _prevDrawPoint.get("y") + CURVE_ERROR_ADJUSTMENT);
                     }

                     _sequenceJustChanged = false;

                  } else if (_drawPoint.get("y") > (genDims.get("y") + genDims.get("height"))) {

                     _drawSequenceIndex++;
                     _sequenceJustChanged = true;
                     cornerArc = true;

                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_LEFT) {

                  if (_sequenceJustChanged) {

                     // check to see if first generated point is ok
                     if (_prevDrawPoint.get("x") - CURVE_ERROR_ADJUSTMENT < _drawPoint.get("x")) {
                        _drawPoint.set("x", _prevDrawPoint.get("x") - CURVE_ERROR_ADJUSTMENT);
                     }

                     if (_prevDrawPoint.get("y") + CURVE_ERROR_ADJUSTMENT > _drawPoint.get("y")) {
                        _drawPoint.set("y", _prevDrawPoint.get("y") + CURVE_ERROR_ADJUSTMENT);
                     }

                     _sequenceJustChanged = false;

                  } else if (_drawPoint.get("x") < genDims.get("x")) {

                     _drawSequenceIndex++;
                     _sequenceJustChanged = true;
                     cornerArc = true;

                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_UP) {

                  if (_sequenceJustChanged) {

                     // check to see if first generated point is ok
                     if (_prevDrawPoint.get("x") - CURVE_ERROR_ADJUSTMENT < _drawPoint.get("x")) {
                        _drawPoint.set("x", _prevDrawPoint.get("x") - CURVE_ERROR_ADJUSTMENT);
                     }

                     if (_prevDrawPoint.get("y") - CURVE_ERROR_ADJUSTMENT < _drawPoint.get("y")) {
                        _drawPoint.set("y", _prevDrawPoint.get("y") - CURVE_ERROR_ADJUSTMENT);
                     }

                     _sequenceJustChanged = false;

                  } else if (_drawPoint.get("y") < genDims.get("y") || (Math.abs(_drawPoint.get("x") - _startPoint.get("x")) <= 20 && Math.abs(_drawPoint.get("y") - _startPoint.get("y")) <= 20)) {

                     _drawSequenceIndex++;
                     _sequenceJustChanged = true;
                     cornerArc = true;

                  }

               }

               // make sure the last point drawn is the start point
               if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_STOP) {
                  _drawPoint.set("x", _startPoint.get("x"));
                  _drawPoint.set("y", _startPoint.get("y"));
               }

               // calculate angle between new point and last
               var angle = Math.atan2((_drawPoint.get("y") - _prevDrawPoint.get("y")), (_drawPoint.get("x") - _prevDrawPoint.get("x")));

               // calculate point half way between two points
               var betweenPoint = _drawPoint.interpolate(_prevDrawPoint, 0.5);

               // calculate radius for curve between two points
               var curveRadius = _andyFactorySettings.getRandomCurveRadius();

               // calculate point to create curve between points
               var controlPoint = new Point();
               controlPoint.set("x", betweenPoint.get("x") - (Math.cos(1.57079633 + angle) * curveRadius));
               controlPoint.set("y", betweenPoint.get("y") - (Math.sin(1.57079633 + angle) * curveRadius));

               //////////////////////////////////////////////////////////////////
               // Check Curve Point against previous to avoid vector overlap
               //////////////////////////////////////////////////////////////////
               if (_prevControlPoint !== null) {

                  if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_STOP) {

                     if (andyDef.get("arcs")[0].get("startPoint").get("x") - CURVE_ERROR_ADJUSTMENT < _prevDrawPoint.get("x")) {
                        _prevDrawPoint.set("x", andyDef.get("arcs")[0].get("startPoint").get("x") - CURVE_ERROR_ADJUSTMENT);
                     }

                     if (andyDef.get("arcs")[0].get("startPoint").get("y") - CURVE_ERROR_ADJUSTMENT > _prevDrawPoint.get("y")) {
                        _prevDrawPoint.set("y", andyDef.get("arcs")[0].get("startPoint").get("y") - CURVE_ERROR_ADJUSTMENT);
                     }

                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").set("x", _prevDrawPoint.get("x"));
                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").set("y", _prevDrawPoint.get("y"));

                     // calculate angle between new point and last
                     angle = Math.atan2((_drawPoint.get("y") - _prevDrawPoint.get("y")), (_drawPoint.get("x") - _prevDrawPoint.get("x")));

                     // calculate point half way between two points
                     betweenPoint = _drawPoint.interpolate(_prevDrawPoint, 0.5);

                     // update last control point
                     controlPoint.set("x", betweenPoint.get("x") - (Math.cos(1.57079633 + angle) * curveRadius));
                     controlPoint.set("y", betweenPoint.get("y") - (Math.sin(1.57079633 + angle) * curveRadius));

                     ///////////////////////////////////////////////////////
                     // Update last Arc
                     ///////////////////////////////////////////////////////
                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").set("x", _prevDrawPoint.get("x"));
                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").set("y", _prevDrawPoint.get("y"));

                     // calculate angle between new point and last
                     angle = Math.atan2((andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").get("y") - andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("startPoint").get("y")), (andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").get("x") - andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("startPoint").get("x")));

                     // calculate point half way between two points
                     betweenPoint = andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("endPoint").interpolate(andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("startPoint"), 0.5);

                     // calculate radius for curve between two points
                     curveRadius = _andyFactorySettings.getRandomCurveRadius();

                     // update last control point
                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("controlPoint").set("x", betweenPoint.get("x") - (Math.cos(1.57079633 + angle) * curveRadius));
                     andyDef.get("arcs")[andyDef.get("arcs").length - 1].get("controlPoint").set("y", betweenPoint.get("y") - (Math.sin(1.57079633 + angle) * curveRadius));

                  }

               } else {

                  _prevControlPoint = new Point();

               }

               // store previous control point
               _prevControlPoint.set("x", controlPoint.get("x"));
               _prevControlPoint.set("y", controlPoint.get("y"));

               ///////////////////////////////////
               // Adjust inner rectangle
               ///////////////////////////////////
               if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_RIGHT) {

                  if (andyDef.get("innerRectangle").top() < _drawPoint.get("y")) {
                     andyDef.get("innerRectangle").top(_drawPoint.get("y"));
                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_DOWN) {

                  if (andyDef.get("innerRectangle").right() > _drawPoint.get("x")) {
                     andyDef.get("innerRectangle").right(_drawPoint.get("x"));
                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_LEFT) {

                  if (andyDef.get("innerRectangle").bottom() > _drawPoint.get("y")) {
                     andyDef.get("innerRectangle").bottom(_drawPoint.get("y"));
                  }

               } else if (_drawSequence[_drawSequenceIndex] === DRAW_DIRECTION_UP) {

                  if (andyDef.get("innerRectangle").left() < _drawPoint.get("x")) {
                     andyDef.get("innerRectangle").left(_drawPoint.get("x"));
                  }

               }

               ////////////////////////////////////////
               // ADD TO CHARACTER DEFINITION
               ////////////////////////////////////////
               andyDef.addArc(new Arc({startPoint:_prevDrawPoint.clone(), controlPoint:controlPoint.clone(), endPoint:_drawPoint.clone(), cornerArc:cornerArc}));

            }

         };

         var buildDefinition = function (regPointLocation, withColor, withFace) {

            // reset start point
            _startPoint = null;

            _prevControlPoint = null;

            // reset draw sequence index
            _drawSequenceIndex = 0;

            var andyDef = new AndyDefinition();

            if (withFace === undefined) {
               withFace = Faces.getRandomFace();
            }

            andyDef.set("faceName", withFace);

            if (withColor === undefined || withColor === -1) {
               andyDef.set("renderColor", _andyFactorySettings.getRandomColor());
            } else {
               andyDef.set("renderColor", withColor);
            }

            //andyDef.innerRectangle = this.andyFactorySettings.generationDimensions;
            andyDef.set("innerRectangle", new Rectangle({x:-500, y:-500, width:1000, height:1000}));

            var safeGuard = 0;

            // start drawing based on mode
            while (_drawSequence[_drawSequenceIndex] !== DRAW_DIRECTION_STOP && safeGuard < 300) {
               generatePoint(andyDef);
               safeGuard++;
            }

            // adjust art to registration point if specified
            if (regPointLocation) {
               andyDef.setRegistrationPointLocation(regPointLocation);
            }

            return andyDef;

         };

         return {

            setFactorySettings:function (andyFactorySettings) {
               _andyFactorySettings = andyFactorySettings;
            },
            makeDefinition:function (regPointLocation, withColor, withFace) {
               return  buildDefinition(regPointLocation, withColor, withFace);
            }

         };

      }());
   }
);