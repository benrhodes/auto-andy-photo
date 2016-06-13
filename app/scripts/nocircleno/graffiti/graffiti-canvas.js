/*global define */
define(

   ['nocircleno/geom/point'],

   function (Point) {

      return (function () {

         "use strict";

         var _canvas;
         var _enabled = true;
         var _init = false;
         var _brush;

         var prevPoint;
         var currentPoint;

         var _canvasPos;

         function draw(point1, point2) {
            _brush.draw(_canvas[0].getContext("2d"), point1, point2);
         }

         function onMouseUp(e) {
            e.preventDefault();
            var bodyEl = $("body");
            bodyEl.unbind("mousemove", onMouseMove);
            bodyEl.unbind("mouseup", onMouseUp);
            prevPoint = undefined;
         }

         function onMouseMove(e) {

            if (!prevPoint) {
               prevPoint = new Point();
            }

            prevPoint.set({x:currentPoint.get("x"), y:currentPoint.get("y")});
            currentPoint.set({x:e.clientX - _canvasPos.get("x"), y:e.clientY - _canvasPos.get("y")});

            draw(prevPoint, currentPoint);

         }

         function onMouseDown(e) {

            if (!_brush || !_enabled) {
               e.preventDefault();
               return;
            }

            var bodyEl = $("body");
            bodyEl.bind("mousemove", onMouseMove);
            bodyEl.bind("mouseup", onMouseUp);

            if (!currentPoint) {
               currentPoint = new Point();
            }

            if (_canvas.offset().left !== _canvasPos.get("x")) {
               _canvasPos.set({"x":_canvas.offset().left});
            }

            if (_canvas.offset().top !== _canvasPos.get("y")) {
               _canvasPos.set({"y":_canvas.offset().top});
            }

            currentPoint.set({x:e.clientX - _canvasPos.get("x"), y:e.clientY - _canvasPos.get("y")});

            draw(currentPoint);

         }

         return {

            enabled:function (enabledValue) {
               _enabled = enabledValue;
            },
            setCanvasEl:function (canvas) {
               _canvas = canvas;

               if (!_init) {

                  $(_canvas).bind("mousedown", onMouseDown);

                  _canvasPos = new Point({x:_canvas.offset().left, y:_canvas.offset().top});

               }


            },
            setBrush:function (brush) {
               _brush = brush;
            },
            clear:function () {
               _canvas[0].width = _canvas[0].width + 1 - 1;
            }

         };

      }());
   }
);