/*global define */
define(

   ['jquery', 'underscore', 'backbone',
      'nocircleno/graffiti/brush-diamond',
      'nocircleno/graffiti/brush-mode',
      'nocircleno/graffiti/graffiti-canvas'],

   function ($, _, Backbone, BrushDiamond, BrushMode, GraffitiCanvas) {


      return Backbone.View.extend(

         (function () {

            "use strict";

            var _viewWidth = 0,
               _viewHeight = 0,
               _viewPrevWidth = 0,
               _viewPrevHeight = 0,
               _brush,
               _patternImg,
               _patternCanvas,
               _imageCache,
               _ctx;

            function updateViewSize() {

               var maskCanvasEl = $("#mask_canvas");

               _imageCache = maskCanvasEl[0].toDataURL("image/png");
               _ctx = maskCanvasEl[0].getContext('2d');

               maskCanvasEl.attr("width", _viewWidth + "px");
               maskCanvasEl.attr("height", _viewHeight + "px");

               if (_viewPrevWidth > 0) {

                  var maskImg = new Image();
                  maskImg.onload = function () {
                     _ctx.drawImage(this, 0, 0, Number(_viewWidth), Number(_viewHeight));
                  };

                  maskImg.src = _imageCache;

               }
            }

            return {

               tagName:"canvas",

               id:"mask_canvas",

               events:{
                  "dragenter":"onDragEnter"
               },

               onDragEnter:function (e) {
                  e.preventDefault();
                  this.hideView(true);
               },

               initialize:function () {

                  _patternCanvas = document.createElement("canvas");

                  _brush = BrushDiamond;
                  _brush.size(24);
                  _brush.pattern(_patternCanvas);

                  GraffitiCanvas.enabled(false);
                  GraffitiCanvas.setBrush(_brush);
                  GraffitiCanvas.setCanvasEl(this.$el);

               },

               enableView:function (enable) {
                  var maskCanvasEl = $("#mask_canvas");
                  if (enable) {
                     maskCanvasEl.css("pointer-events", "all");
                  } else {
                     maskCanvasEl.css("pointer-events", "none");
                  }

                  GraffitiCanvas.enabled(enable);

               },

               hideView:function (hide) {
                  var maskCanvasEl = $("#mask_canvas");

                  if (hide) {
                     maskCanvasEl.hide();
                  } else {
                     maskCanvasEl.show();
                  }
               },

               fadeView: function(fade) {
                  var maskCanvasEl = $("#mask_canvas");

                  if (fade) {
                     maskCanvasEl.addClass("fadeOut");
                  } else {
                     maskCanvasEl.removeClass("fadeOut");
                  }
               },

               clearMask:function () {
                  var maskCanvasEl = $("#mask_canvas");
                  maskCanvasEl[0].width = maskCanvasEl[0].width + 1 - 1;
               },

               setPos:function (x, y) {
                  var maskCanvasEl = $("#mask_canvas");
                  maskCanvasEl.css("left", x);
                  maskCanvasEl.css("top", y);
               },

               changeSize:function (viewWidth, viewHeight) {

                  _viewPrevWidth = _viewWidth;
                  _viewPrevHeight = _viewHeight;

                  _viewWidth = viewWidth;
                  _viewHeight = viewHeight;

                  updateViewSize();

               },

               getMaskCanvas:function () {
                  return $("#mask_canvas")[0];
               },

               setMaskMode:function (mode) {
                  _brush.mode(mode);
               },

               setMaskBrushSize:function (brushSize) {
                  _brush.size(brushSize);

                  var cursorImg = _brush.generateBrushCursor();
                  var cursorCss = "url(" + cursorImg + ") " + (brushSize / 2) + " " + (brushSize / 2) + ", crosshair";

                  $("#mask_canvas").css("cursor", cursorCss);

               },

               setPatternData:function (imgData, width, height) {

                  _patternImg = new Image();
                  _patternImg.onload = function () {
                     $(_patternCanvas).attr("width", width + "px");
                     $(_patternCanvas).attr("height", height + "px");
                     var imgCtx = _patternCanvas.getContext("2d");
                     imgCtx.drawImage(this, 0, 0, width, height);
                  };

                  _patternImg.src = imgData;

               },

               render:function () {
                  return this;
               }

            };

         }()));
   }
);