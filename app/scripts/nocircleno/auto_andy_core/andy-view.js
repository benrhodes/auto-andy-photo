/*global define */
/*global console */
define(

   ['jquery', 'underscore', 'backbone', 'templates', 'nocircleno/svg-backbone-view', 'nocircleno/geom/point'],

   function ($, _, Backbone, templates, SvgBackboneView, Point) {

      return SvgBackboneView.extend({

         tagName: "g",
         className: "andyViewSvg",
         scaleKeyCode: 16,
         rotationKeyCode: 82,
         selected:false,

         events:{
            "mousedown":"onMouseDown"
         },

         initialize:function () {
            _.bindAll(this, "onAnimationFrame", "onMouseMove", "onMouseUp");

            this.template = templates.andy_svg;
            this.transformTemplate = templates.svg_transform;

            this.bodyEl = $("body");
            this.dragStartPoint = new Point();
            this.clickPoint = new Point();
            this.dragEnabled = true;
            this.dragging = false;

            this.model.on("change:containerScale", this.onContainerScaleChange, this);
            this.model.on("change:x change:y change:scale change:rotation", this.onTransformChange, this);
            this.render();
         },

         destroy: function() {
            this.detachSelectionRectangle();
            this.model.off("change:containerScale", this.onContainerScaleChange);
            this.model.off("change:x change:y change:scale change:rotation", this.onTransformChange);
         },

         setSelected: function(selected, selectionRectangleRef) {
            this.selected = selected;

            if(this.selected) {
               this.selectionRectangleRef = selectionRectangleRef;
               this.attachSelectionRectangle();
            } else {
               this.detachSelectionRectangle();
               this.selectionRectangleRef = undefined;
            }
         },

         onSelectionRectangleTransform: function(model) {
            if(model.hasChanged("width")) {
               this.model.set("scale", this.model.get("scale") * (model.get("width") / model.previous("width")));
            } else if(model.hasChanged("rotation")) {
               this.model.set("rotation", model.get("rotation"));
            }
         },

         attachSelectionRectangle: function() {
            if(this.selectionRectangleRef) {

               var outerBounds = _.clone(this.model.get("outlineBounds"));
               var andyScale = this.model.get("containerScale") * this.model.get("scale");
               var width = outerBounds.get("width") * andyScale;
               var height = outerBounds.get("height") * andyScale;

               this.selectionRectangleRef.moveTo(this.model.get("x"), this.model.get("y"));
               this.selectionRectangleRef.resize(width, height);

               this.selectionRectangleRef.model.set("rotation", this.model.get("rotation"));
               this.selectionRectangleRef.model.on("change:rotation change:width", this.onSelectionRectangleTransform, this);
            }
         },

         detachSelectionRectangle: function() {
            if(this.selectionRectangleRef) {
               this.selectionRectangleRef.model.off("change:rotation change:width", this.onSelectionRectangleTransform);
               return false;
            }
         },

         setDragEnabled: function(dragEnabled) {
            this.dragEnabled = dragEnabled;
         },

         onAnimationFrame: function() {
            this.model.set({"x":this.pendingX, "y":this.pendingY});
            if(this.dragging) {
               window.requestAnimationFrame(this.onAnimationFrame);
            }
         },

         onMouseDown:function(e) {
            e.preventDefault();

            if(!this.selected) {
               this.selected = true;
               this.trigger("select", this);
            }

            if(!this.dragEnabled) {
               return;
            }

            this.dragging = true;
            this.clickPoint.set({"x":e.pageX, "y":e.pageY});
            this.dragStartPoint.set({"x":this.model.get("x"), "y":this.model.get("y")});

            this.pendingX = this.model.get("x");
            this.pendingY = this.model.get("y");

            this.bodyEl.bind("mousemove", this.onMouseMove);
            this.bodyEl.bind("mouseup", this.onMouseUp);

            window.requestAnimationFrame(this.onAnimationFrame);
         },

         onMouseMove: function(e) {
            e.preventDefault();

            this.pendingX = this.dragStartPoint.get("x") + (e.pageX - this.clickPoint.get("x"));
            this.pendingY = this.dragStartPoint.get("y") + (e.pageY - this.clickPoint.get("y"));
         },

         onMouseUp: function(e) {
            e.preventDefault();

            this.dragging = false;

            this.bodyEl.unbind("mousemove", this.onMouseMove);
            this.bodyEl.unbind("mouseup", this.onMouseUp);
         },

         onContainerScaleChange:function () {
            var scaleDelta = this.model.get("containerScale") / this.model.previous("containerScale");
            this.model.set({"x":this.model.get("x") * scaleDelta, "y":this.model.get("y") * scaleDelta});
         },

         onTransformChange: function() {

            if(this.selectionRectangleRef) {
               this.selectionRectangleRef.moveTo(this.model.get("x"), this.model.get("y"));
            }

            this.$el.attr("transform", this.transformTemplate(this.model.toJSON()));
         },

         render:function () {

            var svgMarkup = this.template(this.model.toJSON());
            var svgFragment = $.parseXML(svgMarkup);

            // write children to svg
            while(svgFragment.documentElement.childElementCount > 0) {
               this.el.appendChild(svgFragment.documentElement.childNodes[0]);
            }

            this.$el.attr("filter", "url(#dropshadow)");

            this.onTransformChange();

            return this;
         }

      });

   }
);