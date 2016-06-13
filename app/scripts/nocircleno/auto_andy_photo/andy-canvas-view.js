/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates',
      'nocircleno/svg-backbone-view',
      'nocircleno/auto_andy_core/andy-factory-settings',
      'nocircleno/auto_andy_core/andy-factory',
      'nocircleno/auto_andy_core/registration-point-location',
      'nocircleno/auto_andy_core/andy-view',
      'nocircleno/auto_andy_photo/selection-rectangle-view'
   ],

   function ($, _, Backbone, templates, SvgBackboneView, AndyFactorySettings, AndyFactory, RegistrationPointLocation, AndyView, SelectionRectangleView) {

      return SvgBackboneView.extend({

         tagName: "svg",

         className: "andyCanvasView",

         id: "andy_canvas",

         deleteKeyCode: 8,
         keyboardShortcutsEnabled: true,

         selectedAndyView: undefined,

         initialize: function () {
            _(this).bindAll("onKeyboardShortCut");
            this.template = templates.svg_canvas;
            this.selectionRectangle = new SelectionRectangleView();
            this.model.on("change:width change:height", this.onSizeChange, this);
            this.model.on("change:x change:y", this.onPositionChange, this);
            this.model.on("change:scale", this.onScaleChange, this);

            $("body").bind("keydown", this.onKeyboardShortCut)
         },

         events: {
            "dragenter": "onDragEnter",
            "mousedown": "checkForDeselect"
         },

         enableKeyboardShortcuts: function(enable) {
            this.keyboardShortcutsEnabled = enable;
         },

         onKeyboardShortCut: function (e) {
            if(this.keyboardShortcutsEnabled) {
               if (e.keyCode === this.deleteKeyCode) {
                  e.preventDefault();
                  if (this.selectedAndyView) {
                     this.deleteAndyView(this.selectedAndyView);
                  }
               }
            }
         },

         getSvgAsString: function () {
            var svg = this.el.cloneNode(true);
            var defs = svg.getElementsByTagName("defs")[0];
            svg.removeChild(defs);

            var selectionRectangle;
            var childNodes = svg.childNodes;
            var numberChildren = childNodes.length;

            for (var i = 0; i < numberChildren; i++) {
               childNodes[i].removeAttribute("filter");
               if (childNodes[i].getAttribute("class") === "selectionRectangle") {
                  selectionRectangle = childNodes[i];
               }
            }

            if (selectionRectangle) {
               svg.removeChild(selectionRectangle);
            }

            return new XMLSerializer().serializeToString(svg);
         },

         onDragEnter: function () {},

         checkForDeselect: function (e) {
            if (e.target.id === "andy_canvas") {
               e.preventDefault();
               this.onSelect();
            }
         },

         clear: function () {
            while (this.model.get("andyViews").length > 0) {
               this.deleteAndyView(this.model.get("andyViews")[0]);
            }
         },

         fadeView: function (fade) {
               if(fade) {
               if(this.el.classList) {
                  this.el.classList.add('fadeOut');
               } else {
                  this.$el.css({"-webkit-transition": "opacity 0.4s", "-moz-transition": "opacity 0.4s", "transition": "opacity 0.4s", "opacity": "0.5"});
               }
            } else {
               if(this.el.classList) {
                  this.el.classList.remove('fadeOut');
               } else {
                  this.$el.css({"-webkit-transition": "", "-moz-transition": "", "transition": "", "opacity": ""});
               }
            }
         },

         deleteAndyView: function (andyView) {
            this.onSelect();
            this.el.removeChild(andyView.el);
            this.model.removeAndyViewById(andyView.model.id);
            andyView.destroy();
         },

         hideView: function (hide) {
            if (hide) {
               if(this.el.classList) {
                  this.el.classList.add("hiddenElement");
               } else {
                  this.$el.css({"display":"none"});
               }
            } else {
               if(this.el.classList) {
                  this.el.classList.remove("hiddenElement");
               } else {
                  this.$el.css({"display":""});
               }
            }
         },

         onSizeChange: function () {
            // deselect any andy on resize
            this.onSelect();

            var i;
            this.$el.attr("width", this.model.get("width"));
            this.$el.attr("height", this.model.get("height"));
            this.$el.attr("viewBox", "0 0 " + this.model.get("width") + " " + this.model.get("height"));

            for (i = 0; i < this.model.get("andyViews").length; i++) {
               this.model.get("andyViews")[i].model.set("containerScale", this.model.get("scale"));
            }
         },

         onPositionChange: function () {
            this.$el.css({
               "left": this.model.get("x"),
               "top": this.model.get("y")
            });
         },

         onScaleChange: function () {

            var scale = this.model.get("scale");

            _.each(this.model.get("andyViews"), function (andyView) {
               andyView.model.set({"containerScale": scale});
            });

         },

         addAndy: function (randomizeGeneration, andyDef) {

            if (randomizeGeneration === undefined) {
               randomizeGeneration = false;
            }

            if (!andyDef) {

               var afs = new AndyFactorySettings();

               if (randomizeGeneration) {
                  afs.randomizeSettings();
               }

               AndyFactory.setFactorySettings(afs);

               andyDef = AndyFactory.makeDefinition(RegistrationPointLocation.VISUAL_CENTER);
               andyDef.set("id", _.uniqueId("andySvg"));
               andyDef.set("containerScale", this.model.get("scale"));
               andyDef.set("x", this.model.get("width") * 0.5);
               andyDef.set("y", this.model.get("height") * 0.5);
            }

            var andyView = new AndyView({model: andyDef});
            andyView.on("select", this.onSelect, this);
            this.$el.append(andyView.render().el);

            this.$el.append(this.selectionRectangle.el);

            this.onSelect();

            this.model.get("andyViews").push(andyView);
         },

         onSelect: function (andyView) {
            if (this.selectedAndyView !== undefined) {
               this.selectedAndyView.setSelected(false);
            }

            if (andyView) {
               this.selectedAndyView = andyView;
               this.selectionRectangle.$el.css("display", "");
               this.selectedAndyView.setSelected(true, this.selectionRectangle);
            } else {
               this.selectionRectangle.$el.css("display", "none");
            }

            this.trigger("selectionChange", (andyView !== undefined));
         },

         render: function () {
            var svgXml = this.template();
            var svgElements = $.parseXML(svgXml);
            var svgRoot = svgElements.documentElement;
            $(svgRoot).attr("width", this.model.get("width"));
            $(svgRoot).attr("height", this.model.get("height"));
            $(svgRoot).attr("viewBox", "0 0 " + this.model.get("width") + " " + this.model.get("height"));

            this.$el.append(svgElements.documentElement);

            this.selectionRectangle.render();
            this.selectionRectangle.$el.css("display", "none");

            return this;
         }
      });
   }
);