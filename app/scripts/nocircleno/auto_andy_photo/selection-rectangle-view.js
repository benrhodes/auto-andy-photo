/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates', 'nocircleno/svg-backbone-view', 'nocircleno/auto_andy_photo/selection-rectangle-model', 'nocircleno/utils/conversions'],

   function ($, _, Backbone, templates, SvgBackboneView, SelectionRectangleModel, Conversions) {

      return SvgBackboneView.extend({

         tagName:"g",

         className:"selectionRectangle",

         initialize:function () {
            _(this).bindAll("onRotationStartDrag", "onHandleStartDrag", "onMouseMove", "onMouseUp", "onAnimationFrame");
            this.template = templates.selection_rectangle_svg;
            this.transformTemplate = templates.svg_transform;
            this.documentEl = $(document);
            this.model = new SelectionRectangleModel();
            this.model.on("change:x change:y change:rotation", this.onTransformChange, this);
            this.model.on("change:width change:height", this.onSizeChange, this);
         },

         moveTo: function(x, y) {
            this.model.set({"x": x, "y": y});
         },

         resize: function(width, height) {
            this.model.set({"width": width, "height": height});
         },

         onTransformChange: function() {
            this.$el.attr("transform", this.transformTemplate(this.model.attributes));
         },

         onSizeChange: function() {
            this.selectionRect.attr({"x": -this.model.get("halfWidth"),
                                     "y": -this.model.get("halfHeight"),
                                     "width": this.model.get("width"),
                                     "height": this.model.get("height")});
            this.ulScaleHandle.attr({x:-this.model.get("halfWidth") - this.model.get("halfHandleSize"),
                                     y: -this.model.get("halfHeight") - this.model.get("halfHandleSize")});
            this.urScaleHandle.attr({x:this.model.get("halfWidth") - this.model.get("halfHandleSize"),
                                     y:-this.model.get("halfHeight") - this.model.get("halfHandleSize")});
            this.llScaleHandle.attr({x:-this.model.get("halfWidth") - this.model.get("halfHandleSize"),
                                     y:this.model.get("halfHeight") - this.model.get("halfHandleSize")});
            this.lrScaleHandle.attr({x:this.model.get("halfWidth") - this.model.get("halfHandleSize"),
                                     y:this.model.get("halfHeight") - this.model.get("halfHandleSize")});
            this.rotationGroup.attr({transform:"translate(0, " + -this.model.get("halfHeight") + ")"});
         },

         onRotationStartDrag: function(e) {
            e.preventDefault();

            this.calculatePageCenterPoint();
            this.rotationHandleDrag = true;

            this.documentEl.bind("mousemove", this.onMouseMove);
            this.documentEl.bind("mouseup", this.onMouseUp);
         },

         onHandleStartDrag: function(e) {
            e.preventDefault();

            this.calculatePageCenterPoint();

            this.scaleHandleDrag = true;

            this.documentEl.bind("mousemove", this.onMouseMove);
            this.documentEl.bind("mouseup", this.onMouseUp);
         },

         onMouseMove: function(e) {
            this.pendingWidth = this.model.get("width");
            this.pendingHeight = this.model.get("height");
            this.pendingRotation = this.model.get("rotation");

            if(this.rotationHandleDrag) {
               this.calculateRectangleRotation(e.pageX, e.pageY);
            } else if(this.scaleHandleDrag) {
               this.calculateRectangleSize(e.pageX, e.pageY);
            }

            window.requestAnimationFrame(this.onAnimationFrame);
         },

         calculateRectangleRotation: function(pageX, pageY) {
            this.xDelta =  pageX - this.model.get("pageRectCenterX");
            this.yDelta =  this.model.get("pageRectCenterY") - pageY;
            this.pendingRotation = 450 - Conversions.degrees(Math.atan(this.yDelta/this.xDelta));

            switch(Conversions.getQuadrantNumber(this.xDelta, this.yDelta)) {
               case 2:
               case 3:
                  this.pendingRotation += 180;
                  break;
               case 4:
                  this.pendingRotation += 360;
                  break;
            }
         },

         calculateRectangleSize: function(pageX, pageY) {
            this.rotatedPoint = Conversions.rotatePointAroundOrigin(this.model.get("pageRectCenterX"), this.model.get("pageRectCenterY"), pageX, pageY, Conversions.radians(-this.model.get("rotation")));

            this.xDelta = Math.abs(this.model.get("pageRectCenterX") -  this.rotatedPoint.x);
            this.yDelta =  Math.abs(this.model.get("pageRectCenterY") -  this.rotatedPoint.y);

            if(this.xDelta < this.model.get("handleSize")) {
               this.xDelta = this.model.get("handleSize");
            }

            if(this.yDelta < this.model.get("handleSize")) {
               this.yDelta = this.model.get("handleSize");
            }

            this.pendingWidth = this.xDelta * 2;
            this.pendingHeight = this.yDelta * 2;

            this.scaleWidthDelta = this.pendingWidth / this.model.get("width");
            this.scaleHeightDelta = this.pendingHeight / this.model.get("height");

            if(this.scaleWidthDelta < this.scaleHeightDelta) {
               this.pendingHeight = this.model.get("height") * this.scaleWidthDelta;
            } else {
               this.pendingWidth = this.model.get("width") * this.scaleHeightDelta;
            }
         },

         onMouseUp: function(e) {
            e.preventDefault();
            this.rotationHandleDrag = false;
            this.scaleHandleDrag = false;
            this.documentEl.unbind("mousemove", this.onMouseMove);
            this.documentEl.unbind("mouseup", this.onMouseUp);
         },

         onAnimationFrame: function() {
            this.model.set({"width": this.pendingWidth, height:this.pendingHeight, rotation:this.pendingRotation});
            if(this.scaleHandleDrag || this.rotationHandleDrag) {
               window.requestAnimationFrame(this.onAnimationFrame);
            }
         },

         calculatePageCenterPoint: function() {

            var rotation = this.model.get("rotation");
            this.model.set("rotation", 0);

            var centerX = ( this.rotationHandle.offset().left + this.model.get("halfHandleSize"));
            var centerY = ( this.rotationHandle.offset().top + this.model.get("halfHandleSize") + Math.abs(this.model.get("rotationHandleYOffset")) + this.model.get("halfHeight"));

            this.model.set({"pageRectCenterX": centerX,
                            "pageRectCenterY": centerY,
                            "rotation": rotation});
         },

         render:function () {
            var svgXml = this.template(this.model.attributes);
            var svgFragment = $.parseXML(svgXml);

            // write children to svg
            while(svgFragment.documentElement.childElementCount > 0) {
               this.el.appendChild(svgFragment.documentElement.childNodes[0]);
            }

            this.selectionRect = this.$el.find("[class~='selection-rect']");
            this.ulScaleHandle = this.$el.find("[class~='ul-scale-handle']");
            this.urScaleHandle = this.$el.find("[class~='ur-scale-handle']");
            this.llScaleHandle = this.$el.find("[class~='ll-scale-handle']");
            this.lrScaleHandle = this.$el.find("[class~='lr-scale-handle']");
            this.rotationGroup = this.$el.find("[class~='rotation-group']");
            this.rotationHandle = this.$el.find("[class~='rotate-handle']");

            $(this.ulScaleHandle).bind("mousedown", this.onHandleStartDrag);
            $(this.urScaleHandle).bind("mousedown", this.onHandleStartDrag);
            $(this.llScaleHandle).bind("mousedown", this.onHandleStartDrag);
            $(this.lrScaleHandle).bind("mousedown", this.onHandleStartDrag);
            $(this.rotationHandle).bind("mousedown", this.onRotationStartDrag);

            return this;
         }
      });
   }
);