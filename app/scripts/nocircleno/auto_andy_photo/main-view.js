/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'requestAnimationFrameShim',
      'nocircleno/auto_andy_photo/menu-view',
      'nocircleno/auto_andy_photo/mask-view',
      'nocircleno/auto_andy_photo/photo-view',
      'nocircleno/auto_andy_photo/andy-canvas-view',
      'nocircleno/auto_andy_photo/share-view',
      'nocircleno/auto_andy_photo/andy-canvas-model',
      'nocircleno/auto_andy_photo/composition'],

   function ($, _, Backbone, requestAnimationFrameShim, MenuView, MaskView, PhotoView, AndyCanvasView, ShareView, AndyCanvasModel, Composition) {

      return Backbone.View.extend({

         initialize: function () {

            _(this).bindAll("onDragEnter", "onDragLeave", "onWindowResize", "onPreviewChange", "onAndyCanvasSelectionChange", "createShareView", "onShareViewRemove", "maskEventHandler", "maskModeEventHandler", "brushSizeEventHandler", "clearEventHandler");

            this.photoInit = true;

            document.onselectstart = function () {
               return false;
            };

            var andyCanvasModel = new AndyCanvasModel();

            this.menuView = new MenuView();
            this.maskView = new MaskView();
            this.photoView = new PhotoView();
            this.andyCanvas = new AndyCanvasView({model: andyCanvasModel});
            this.andyCanvas.on("selectionChange", this.onAndyCanvasSelectionChange, this);

            this.photoView.addEventListener("PREVIEW_CHANGE", this.onPreviewChange);
            this.menuView.addEventListener("SHARE", this.createShareView);
            this.menuView.addEventListener("MASK", this.maskEventHandler);
            this.menuView.addEventListener("MASK_MODE", this.maskModeEventHandler);
            this.menuView.addEventListener("BRUSH_SIZE", this.brushSizeEventHandler);
            this.menuView.addEventListener("CLEAR", this.clearEventHandler);

            this.maskView.setMaskBrushSize(16);
            this.menuView.setAndyCanvasRef(this.andyCanvas);

            $(window).resize(this.onWindowResize);

         },

         onDragEnter: function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.photoView.hasPhoto()) {
               this.photoView.hidePhoto(true);
               this.andyCanvas.hideView(true);
               this.maskView.hideView(true);
            }
         },

         onDragLeave: function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.photoView.hasPhoto()) {
               this.photoView.hidePhoto(false);
               this.andyCanvas.hideView(false);
               this.maskView.hideView(false);
            }
         },

         onWindowResize: function() {
            this.photoView.setViewHeight(window.innerHeight - this.menuView.getViewHeight());
         },

         onPreviewChange: function () {

            if (this.photoInit) {
               this.menuView.showControls();
               this.photoInit = false;
            }

            var previewWidth = this.photoView.getPreviewWidth();
            var canvasXPos = (window.innerWidth - previewWidth) / 2;
            canvasXPos = canvasXPos < 0 ? 0 : canvasXPos;

            this.andyCanvas.hideView(false);
            this.andyCanvas.model.set("x", canvasXPos, {silent: true});
            this.andyCanvas.model.set("y", this.menuView.getViewHeight());
            this.andyCanvas.model.set("width", Math.ceil(previewWidth), {silent: true});
            this.andyCanvas.model.set("height", window.innerHeight - this.menuView.getViewHeight());
            this.andyCanvas.model.set("scale", this.photoView.getPreviewScale());

            this.maskView.hideView(false);
            this.maskView.setPos(canvasXPos + 1, this.menuView.getViewHeight());
            this.maskView.changeSize(Math.ceil(previewWidth), window.innerHeight - this.menuView.getViewHeight());

            if (this.menuView.isMaskingOn()) {
               this.maskView.setPatternData(this.photoView.getPhotoData(), this.photoView.getPreviewWidth(), this.photoView.getPreviewHeight());
            }
         },

         onAndyCanvasSelectionChange: function(hasSelection) {
            this.maskView.fadeView(hasSelection)
         },

         createShareView: function () {
            var canvasWidth = this.photoView.getPreviewWidth();
            var canvasHeight = this.photoView.getPreviewHeight();
            var andySvg = this.andyCanvas.getSvgAsString();
            var photoData = this.photoView.getPhotoData();

            this.maskView.enableView(false);
            this.andyCanvas.enableKeyboardShortcuts(false);

            var comp = new Composition({canvasWidth: canvasWidth, canvasHeight: canvasHeight, photoData: photoData, maskCanvas: this.maskView.getMaskCanvas(), andySvg: andySvg});

            this.shareView = new ShareView({model: comp, el: this.el});
            this.shareView.addEventListener("REMOVED", this.onShareViewRemove);
         },

         onShareViewRemove: function () {
            if (this.menuView.isMaskingOn()) {
               this.maskView.enableView(true);
            }

            this.andyCanvas.enableKeyboardShortcuts(true);

            this.shareView.removeEventListener("REMOVED");
            this.shareView = undefined;
         },

         maskEventHandler: function (val) {
            this.maskView.enableView(val);
            this.photoView.dimView(val);
            this.andyCanvas.fadeView(val);
            if (val) {
               this.andyCanvas.onSelect();
               this.maskView.setPatternData(this.photoView.getPhotoData(), this.photoView.getPreviewWidth(), this.photoView.getPreviewHeight());
            }
         },

         maskModeEventHandler: function (val) {
            this.maskView.setMaskMode(val);
         },

         brushSizeEventHandler: function (brushSize) {
            this.maskView.setMaskBrushSize(brushSize);
         },

         clearEventHandler: function () {
            this.maskView.clearMask();
         },

         render: function () {

            this.$el.empty();
            this.$el.append(this.menuView.render().el);
            this.$el.append(this.maskView.render().el);
            this.$el.append(this.photoView.render().el);
            this.$el.append(this.andyCanvas.render().el);

            this.andyCanvas.hideView(true);

            this.andyCanvas.model.set("x", 0, {silent: true});
            this.andyCanvas.model.set("y", this.menuView.getViewHeight());
            this.andyCanvas.model.set("width", 100, {silent: true});
            this.andyCanvas.model.set("height", window.innerHeight - this.menuView.getViewHeight());

            this.maskView.hideView(true);
            this.photoView.setPos(0, this.menuView.getViewHeight());
            this.photoView.setViewHeight(window.innerHeight - this.menuView.getViewHeight());

            this.menuView.initUI();

            $("body").bind("dragenter", this.onDragEnter);
            $("#dropbox").bind("dragleave", this.onDragLeave);

         }

      });
   }
);