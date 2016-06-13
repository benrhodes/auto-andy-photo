/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates', 'nocircleno/graffiti/brush-mode', 'nocircleno/auto_andy_photo/visual-slider-model', 'nocircleno/auto_andy_photo/visual-slider-view'],

   function ($, _, Backbone, templates, BrushMode, VisualSliderModel, VisualSliderView) {


      return Backbone.View.extend(

         (function () {

            var _andyCanvasRef;
            var _shareCallback;
            var _clearCallback;
            var _maskCallback;
            var _maskModeCallback;
            var _maskBrushSizeCallback;
            var _maskingOn = false;
            var _that;

            function onShare(e) {
               e.preventDefault();
               if (_shareCallback) {
                  _shareCallback.call();
               }
               if(typeof(_gaq) !== "undefined") {
                  _gaq.push(['_trackEvent','Auto Andy Photo','Clicked Share Button', undefined, undefined, true]);
               }
            }

            function onClear(e) {
               e.preventDefault();
               if (_clearCallback) {
                  _clearCallback.call();
               }
               if(typeof(_gaq) !== "undefined") {
                  _gaq.push(['_trackEvent','Auto Andy Photo','Clear Mask Layer', undefined, undefined, true]);
               }
            }

            function onAddAndy(e) {
               e.preventDefault();
               var useRandomSetting = e.originalEvent.shiftKey;
               if (useRandomSetting) {
                  _andyCanvasRef.addAndy(true);
               } else {
                  _andyCanvasRef.addAndy(false);
               }

               if(typeof(_gaq) !== "undefined") {
                  _gaq.push(['_trackEvent','Auto Andy Photo','Add Andy Character', useRandomSetting.toString(), undefined, true]);
               }
            }

            function onMaskModeChange(e) {
               var maskModeHumanReadable;
               var addMaskButtonEl = $("#add_mask_button");
               var eraseMaskButtonEl = $("#erase_mask_button");

               if (e.target === addMaskButtonEl[0] && !addMaskButtonEl.hasClass("activeSubButton")) {

                  maskModeHumanReadable = "Add";
                  addMaskButtonEl.addClass("activeSubButton");
                  eraseMaskButtonEl.removeClass("activeSubButton");

                  if (_maskModeCallback) {
                     _maskModeCallback.call(_that, BrushMode.DRAW);
                  }

               } else if (e.target === eraseMaskButtonEl[0] && !eraseMaskButtonEl.hasClass("activeSubButton")) {

                  maskModeHumanReadable = "Erase";
                  addMaskButtonEl.removeClass("activeSubButton");
                  eraseMaskButtonEl.addClass("activeSubButton");

                  if (_maskModeCallback) {
                     _maskModeCallback.call(_that, BrushMode.ERASE);
                  }

               }

               if(typeof(_gaq) !== "undefined") {
                  _gaq.push(['_trackEvent','Auto Andy Photo','Change Mask Mode','Mode: ' + maskModeHumanReadable, undefined, true]);
               }
            }

            function onMask(e) {

               e.preventDefault();

               var maskFeatureHumanReadable;
               var maskButtonEl = $("#mask_button");
               var maskOptionEl = $("#mask_options_container");
               var addAndyButtonEl = $("#add_andy_button");

               // turn off
               if (maskButtonEl.hasClass("activeButton")) {
                  maskButtonEl.removeClass("activeButton");
                  maskButtonEl.addClass("mask_button_mask_mode_off");
                  maskOptionEl.removeClass("visible_mask_options");
                  addAndyButtonEl.removeAttr("disabled");
                  addAndyButtonEl.addClass("add_andy_mask_mode_off");

                  _maskingOn = false;

                  if (_maskCallback) {
                     _maskCallback.call(this, false);
                  }

                  maskFeatureHumanReadable = "Off";

               // turn on
               } else {

                  _maskingOn = true;

                  maskButtonEl.addClass("activeButton");
                  maskButtonEl.removeClass("mask_button_mask_mode_off");
                  maskOptionEl.addClass("visible_mask_options");
                  addAndyButtonEl.attr("disabled", true);
                  addAndyButtonEl.removeClass("add_andy_mask_mode_off");

                  if (_maskCallback) {
                     _maskCallback.call(this, true);
                  }

                  maskFeatureHumanReadable = "On";
               }

               if(typeof(_gaq) !== "undefined") {
                  _gaq.push(['_trackEvent','Auto Andy Photo','Mask Feature','Turned ' + maskFeatureHumanReadable, undefined, true]);
               }
            }

            return {

               tagName:"div",

               id:"menu_container",

               initialize:function () {
                  _that = this;
                  this.template = templates.menu_view;
               },

               initUI:function () {

                  $("#menu_button_container").hide();
                  $("#add_andy_button").bind("click", onAddAndy);
                  $("#clear_work_button").bind("click", onClear);
                  $("#share_work_button").bind("click", onShare);

                  $("#mask_button").bind("click", onMask);
                  $("#add_mask_button").bind("click", onMaskModeChange);
                  $("#erase_mask_button").bind("click", onMaskModeChange);
                  this.brushSizeSlider.model.on("change:value", this.onBrushSizeChange, this);
               },

               onBrushSizeChange: function() {
                  var brushSize = Number(this.brushSizeSlider.model.get("value"));

                  if (_maskBrushSizeCallback) {
                     _maskBrushSizeCallback.call(this, brushSize);
                  }

                  if(typeof(_gaq) !== "undefined") {
                     _gaq.push(['_trackEvent','Auto Andy Photo','Mask Brush Size Changed', "Brush Size: " + brushSize, undefined, true]);
                  }
               },

               showControls:function () {
                  $("#menu_button_container").show();
               },

               setAndyCanvasRef:function (andyCanvasRef) {
                  _andyCanvasRef = andyCanvasRef;
               },

               addEventListener:function (type, eventHandler) {

                  switch (type) {
                     case "SHARE":
                        _shareCallback = eventHandler;
                        break;
                     case "MASK":
                        _maskCallback = eventHandler;
                        break;
                     case "MASK_MODE":
                        _maskModeCallback = eventHandler;
                        break;
                     case "BRUSH_SIZE":
                        _maskBrushSizeCallback = eventHandler;
                        break;
                     case "CLEAR":
                        _clearCallback = eventHandler;
                        break;
                  }

               },

               getViewHeight:function () {
                  return $("#menu_container").height() + 4;
               },

               setFocusedAndy:function (andyRef) {
                  var andyTransformButtonsEl = $("#andy_transform_buttons");
                  if (andyRef) {
                     andyTransformButtonsEl.css("display", "inline");
                  } else {
                     andyTransformButtonsEl.css("display", "none");
                  }

               },

               isMaskingOn:function () {
                  return _maskingOn;
               },

               render:function () {

                  var html = this.template();
                  $(this.el).empty().html(html);

                  this.brushSizeSlider = new VisualSliderView({model:new VisualSliderModel()});
                  $(this.el).find("#bush_size_container").append(this.brushSizeSlider.render().el);

                  return this;

               }

            };

         }()));
   }
);