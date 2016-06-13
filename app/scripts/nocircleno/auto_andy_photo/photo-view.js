/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates'],

   function ($, _, Backbone, templates) {

      return Backbone.View.extend(

         (function () {

            "use strict";

            var _viewHeight = 100;
            var _intrinsicWidth = -1;
            var _intrinsicHeight = -1;
            var _photoScale = 1;
            var _lastPhotoScale;
            var _onSizeChangeEventHandler;

            function updateViewSize() {

               var previewEl = $("#preview");

               $("#background_container").height(_viewHeight);

               if (previewEl.height()) {

                  $("#background").height(_viewHeight);

                  if (_intrinsicWidth === -1) {
                     _intrinsicWidth = previewEl.width();
                     _intrinsicHeight = previewEl.height();
                  }

                  if (_lastPhotoScale) {
                     _lastPhotoScale = _photoScale;
                     _photoScale = _viewHeight / _intrinsicHeight;
                  } else {
                     _photoScale = _viewHeight / _intrinsicHeight;
                     _lastPhotoScale = _photoScale;
                  }

                  previewEl.attr("width", _photoScale * _intrinsicWidth);
                  previewEl.attr("height", _viewHeight);

                  if (_onSizeChangeEventHandler) {
                     _onSizeChangeEventHandler.call();
                  }

               }

            }

            function isImageTypeSupported(imageType) {
               switch (imageType) {
                  case "image/jpeg":
                  case "image/png":
                  case "image/gif":
                     return true;
                  default:
                     return false;
               }
            }

            function imageReady() {
               var previewEl = $("#preview");
               previewEl.show();
               updateViewSize();
               previewEl.hide();
               previewEl.fadeIn(400);
            }

            function handleReaderLoad(e) {

               _intrinsicWidth = -1;
               _intrinsicHeight = -1;

               _lastPhotoScale = undefined;

               var previewEl = $("#preview");
               previewEl.removeAttr("width");
               previewEl.removeAttr("height");

               previewEl.attr("src", e.target.result);

               previewEl.hide();
               $("#dropbox").css("opacity", 0);
               $("#background").show();

               setTimeout(imageReady, 100);

            }

            function handleFiles(files) {

               var file = files[0];
               var fileType = file.type;

               if(isImageTypeSupported(fileType)) {

                  if (typeof(_gaq) !== "undefined") {
                     _gaq.push(['_trackEvent', 'Auto Andy Photo', 'Added Photo', 'File Type: ' + fileType, undefined, true]);
                  }

                  var reader = new FileReader();

                  // init the reader event handlers
                  reader.onload = handleReaderLoad;

                  // begin the read operation
                  reader.readAsDataURL(file);

               } else {
                  if (typeof(_gaq) !== "undefined") {
                     _gaq.push(['_trackEvent', 'Auto Andy Photo', 'Added Unsupported Photo', 'File Type: ' + fileType, undefined, true]);
                  }
               }

            }

            return {

               tagName: "div",

               id: "background_container",

               events: {
                  "dragover #dropbox": "noopHandler",
                  "drop #dropbox": "drop"
               },

               initialize: function () {
                  this.template = templates.photo_view;
               },

               addEventListener: function (type, eventHandler) {

                  if (type === "PREVIEW_CHANGE") {
                     _onSizeChangeEventHandler = eventHandler;
                  }

               },

               dimView: function (dim) {
                  var previewEl = $("#preview");
                  if (dim) {
                     previewEl.addClass("dimPreview");
                  } else {
                     previewEl.removeClass("dimPreview");
                  }

               },

               getPreviewScale: function () {
                  return _photoScale;
               },

               getIntrinsicWidth: function () {
                  return _intrinsicWidth;
               },

               getIntrinsicHeight: function () {
                  return _intrinsicHeight;
               },

               getPreviewWidth: function () {
                  if (_intrinsicWidth !== -1) {
                     return _intrinsicWidth * _photoScale;
                  } else {
                     return 0;
                  }
               },

               hasPhoto: function () {
                  return _intrinsicWidth !== -1;
               },

               getPreviewHeight: function () {
                  if (_intrinsicHeight !== -1) {
                     return _intrinsicHeight * _photoScale;
                  } else {
                     return 0;
                  }
               },

               setPos: function (x, y) {
                  var backgroundContainerEl = $("#background_container");
                  backgroundContainerEl.css("left", x);
                  backgroundContainerEl.css("top", y);
               },

               setViewHeight: function (viewHeight) {
                  _viewHeight = viewHeight;
                  updateViewSize();
               },

               getPhotoData: function () {
                  return $("#preview").attr("src");
               },

               noopHandler: function (e) {
                  e.stopPropagation();
                  e.preventDefault();
               },

               browse: function (e) {
                  e.preventDefault();
               },

               hidePhoto: function (hide) {
                  if (hide) {
                     $("#dropbox").css("opacity", 0.5);
                     $("#background").hide();
                  } else {
                     $("#dropbox").css("opacity", 0);
                     $("#background").show();
                  }
               },

               drop: function (e) {

                  e.stopPropagation();
                  e.preventDefault();

                  var files = e.originalEvent.dataTransfer.files;

                  // If anything is wrong with the dropped files, exit.
                  if (files && files.length > 0) {

                     var count = files.length;

                     // Only call the handler if 1 or more files was dropped.
                     if (count > 0) {
                        handleFiles(files);
                     }

                  }

               },

               render: function () {
                  var html = this.template();
                  $(this.el).append(html);
                  return this;
               }

            };

         }()));
   }
);