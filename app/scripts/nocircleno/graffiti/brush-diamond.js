/*global define */
define(

   ['nocircleno/graffiti/brush-mode'],

   function (BrushMode) {

      return (function () {

         "use strict";

         var _size = 8,
            _halfSize,
            _fourthSize,
            _eighthSize,
            _sixteenthSize,
            _color = "#000000",
            _alpha = 1,
            _mode = BrushMode.DRAW,
            _pattern,
            _patternObj;

         function updateBrushSize(brushSize) {

            // set brush size
            _size = brushSize;

            // calculate divisions
            _halfSize = _size * 0.5;
            _fourthSize = _size * 0.25;
            _eighthSize = _size * 0.125;
            _sixteenthSize = _size * 0.0625;

         }

         updateBrushSize(_size);

         return {

            draw:function (ctx, point1, point2) {

               if (_mode === BrushMode.ERASE) {
                  ctx.globalCompositeOperation = "destination-out";
               } else {
                  ctx.globalCompositeOperation = "source-over";
               }

               if (_pattern) {
                  _patternObj = ctx.createPattern(_pattern, "repeat");
               }

               if (point2) {

                  var vPoint1;
                  var vPoint2;

                  if (point1.get("x") < point2.get("x")) {
                     vPoint1 = point1;
                     vPoint2 = point2;
                  } else {
                     vPoint1 = point2;
                     vPoint2 = point1;
                  }

                  if (Math.abs(point2.get("x") - point1.get("x")) > Math.abs(point2.get("y") - point1.get("y"))) {

                     ctx.beginPath();
                     ctx.moveTo(vPoint1.get("x"), vPoint1.get("y") - _halfSize);
                     ctx.lineTo(vPoint2.get("x"), vPoint2.get("y") - _halfSize);
                     ctx.lineTo(vPoint2.get("x") + _halfSize, vPoint2.get("y"));
                     ctx.lineTo(vPoint2.get("x"), vPoint2.get("y") + _halfSize);
                     ctx.lineTo(vPoint1.get("x"), vPoint1.get("y") + _halfSize);
                     ctx.lineTo(vPoint1.get("x") - _halfSize, vPoint1.get("y"));
                     ctx.lineTo(vPoint1.get("x"), vPoint1.get("y") - _halfSize);
                     if (_pattern) {
                        ctx.fillStyle = _patternObj;
                     } else {
                        ctx.fillStyle = _color;
                     }
                     ctx.fill();

                  } else {

                     if (point1.get("y") < point2.get("y")) {
                        vPoint1 = point1;
                        vPoint2 = point2;
                     } else {
                        vPoint1 = point2;
                        vPoint2 = point1;
                     }


                     ctx.beginPath();
                     ctx.moveTo(vPoint1.get("x") + _halfSize, vPoint1.get("y"));
                     ctx.lineTo(vPoint2.get("x") + _halfSize, vPoint2.get("y"));
                     ctx.lineTo(vPoint2.get("x"), vPoint2.get("y") + _halfSize);
                     ctx.lineTo(vPoint2.get("x") - _halfSize, vPoint2.get("y"));
                     ctx.lineTo(vPoint1.get("x") - _halfSize, vPoint1.get("y"));
                     ctx.lineTo(vPoint1.get("x"), vPoint1.get("y") - _halfSize);
                     ctx.lineTo(vPoint1.get("x") + _halfSize, vPoint1.get("y"));

                     if (_pattern) {
                        ctx.fillStyle = _patternObj;
                     } else {
                        ctx.fillStyle = _color;
                     }

                     ctx.fill();

                  }

                  // single point
               } else {

                  ctx.beginPath();
                  ctx.moveTo(point1.get("x"), point1.get("y") - _halfSize);
                  ctx.lineTo(point1.get("x") + _halfSize, point1.get("y"));
                  ctx.lineTo(point1.get("x"), point1.get("y") + _halfSize);
                  ctx.lineTo(point1.get("x") - _halfSize, point1.get("y"));
                  ctx.lineTo(point1.get("x"), point1.get("y") - _halfSize);
                  if (_pattern) {
                     ctx.fillStyle = _patternObj;
                  } else {
                     ctx.fillStyle = _color;
                  }
                  ctx.fill();

               }

            },
            generateBrushCursor:function () {

               var canvas = document.createElement("canvas");
               $(canvas).attr("width", _size);
               $(canvas).attr("height", _size);

               var ctx = canvas.getContext('2d');

               ctx.strokeStyle = "#666666";
               ctx.beginPath();
               ctx.moveTo(0, _halfSize);
               ctx.lineTo(_halfSize, 0);
               ctx.lineTo(_size, _halfSize);
               ctx.lineTo(_halfSize, _size);
               ctx.lineTo(0, _halfSize);
               ctx.closePath();
               ctx.lineWidth = 2;
               ctx.stroke();

               ctx.strokeStyle = "#dddddd";
               ctx.beginPath();
               ctx.moveTo(0, _halfSize);
               ctx.lineTo(_halfSize, 0);
               ctx.lineTo(_size, _halfSize);
               ctx.lineTo(_halfSize, _size);
               ctx.lineTo(0, _halfSize);
               ctx.closePath();
               ctx.lineWidth = 1;
               ctx.stroke();

               var img = canvas.toDataURL("image/png");

               canvas = undefined;

               return img;


            },
            size:function (brushSize) {

               if (brushSize > 0) {
                  updateBrushSize(brushSize);
               }

            },
            color:function (colorVal) {
               _color = colorVal;
            },
            pattern:function (patternVal) {
               _pattern = patternVal;
            },
            alpha:function (alphaVal) {

               if (alphaVal < 0) {
                  alphaVal = 0;
               } else if (alphaVal > 1) {
                  alphaVal = 1;
               }

               _alpha = alphaVal;
            },
            mode:function (drawingMode) {
               if (drawingMode === BrushMode.DRAW || drawingMode === BrushMode.ERASE) {
                  _mode = drawingMode;
               }
            }

         };

      }());
   }
);