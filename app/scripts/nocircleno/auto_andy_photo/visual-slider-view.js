/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates'],

   function ($, _, Backbone, templates) {

      return Backbone.View.extend({

         className: "visual-slider",

         events: {
            "mousedown .slider-handle": "onSliderStartDrag"
         },

         initialize: function() {
            this.template = templates.visual_slider_template;
            this.documentEl = $(document);
            _(this).bindAll("onSliderMouseMove", "onSliderMouseUp", "onAnimationFrame");
            this.model.on("change:value", this.updateHandleIcon, this);
         },

         updateHandleIcon: function() {

            this.iconSize = this.model.get("value");
            this.halfIconSize = this.iconSize / 2;
            this.iconXOffset = this.model.get("handleWidth") / 2 -  this.halfIconSize;
            this.iconYOffset = this.model.get("handleHeight") / 2 -  this.halfIconSize;

            this.sliderHandleIconContext.clearRect(0, 0, this.model.get("handleWidth"), this.model.get("handleHeight"));

            this.sliderHandleIconContext.fillStyle = "#ffffff";
            this.sliderHandleIconContext.shadowOffsetX = 0;
            this.sliderHandleIconContext.shadowOffsetY = 1;
            this.sliderHandleIconContext.shadowBlur = 4;
            this.sliderHandleIconContext.shadowColor = 'rgba(0, 0, 0, 0.6)';
            this.sliderHandleIconContext.beginPath();
            this.sliderHandleIconContext.moveTo(this.iconXOffset,  this.iconYOffset + this.halfIconSize);
            this.sliderHandleIconContext.lineTo(this.iconXOffset + this.halfIconSize, this.iconYOffset);
            this.sliderHandleIconContext.lineTo(this.iconXOffset + this.iconSize, this.iconYOffset + this.halfIconSize);
            this.sliderHandleIconContext.lineTo(this.iconXOffset + this.halfIconSize, this.iconYOffset + this.iconSize);
            this.sliderHandleIconContext.lineTo(this.iconXOffset, this.iconYOffset + this.halfIconSize);
            this.sliderHandleIconContext.closePath();
            this.sliderHandleIconContext.fill();
         },

         onAnimationFrame: function() {
            this.sliderHandle.css("left", this.newLeft + "px");
            this.updateSliderValue();
            if(this.dragging) {
               window.requestAnimationFrame(this.onAnimationFrame);
            }
         },

         onSliderStartDrag: function(e) {
            e.preventDefault();
            this.dragging = true;
            this.model.set({startDragPointX:e.pageX, startDragPointY:e.pageY});
            this.documentEl.bind("mousemove", this.onSliderMouseMove);
            this.documentEl.bind("mouseup", this.onSliderMouseUp);
         },

         onSliderMouseMove: function(e) {
            e.preventDefault();
            this.yDelta = e.pageX - this.model.get("startDragPointX");
            this.currentLeft = Number(this.sliderHandle.css("left").replace(/px/g, ""));
            this.newLeft = this.currentLeft + this.yDelta;
            this.model.set({startDragPointX:e.pageX, startDragPointY:e.pageY});

            if(this.newLeft < 0) {
               this.newLeft = 0;
            } else if(this.newLeft > this.model.get("width") - this.model.get("handleWidth")) {
               this.newLeft = this.model.get("width") - this.model.get("handleWidth");
            }

            window.requestAnimationFrame(this.onAnimationFrame);
         },

         onSliderMouseUp: function(e) {
            e.preventDefault();
            this.dragging = false;
            this.documentEl.unbind("mousemove", this.onSliderMouseMove);
            this.documentEl.unbind("mouseup", this.onSliderMouseUp);
         },

         updateSliderPositionFromValue: function() {
            this.sliderValue = this.model.get("value");
            this.rangePercent = (this.sliderValue - this.model.get("rangeMin")) / (this.model.get("rangeMax") -  this.model.get("rangeMin"));
            this.sliderHandle.css("left", Math.round((this.model.get("width") - this.model.get("handleWidth")) * this.rangePercent) + "px");
         },

         updateSliderValue: function() {
            this.currentLeft = Number(this.sliderHandle.css("left").replace(/px/g, ""));
            this.rangePercent = this.currentLeft / (this.model.get("width") - this.model.get("handleWidth"));
            this.sliderValue = this.model.get("rangeMin") + ((this.model.get("rangeMax") -  this.model.get("rangeMin")) * this.rangePercent);
            this.model.set("value", Math.round(this.sliderValue));
         },

         render: function() {
            this.$el.append(this.template());
            this.sliderHandle = this.$el.find(".slider-handle");
            this.sliderHandleIconContext = this.$el.find(".slider-icon")[0].getContext("2d");
            this.updateSliderPositionFromValue();
            this.updateHandleIcon();
            return this;
         }

      });

   }
);