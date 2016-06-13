/*global define */
define(

   ['backbone', 'nocircleno/geom/rectangle'],

   function (Backbone, Rectangle) {

      return Backbone.Model.extend(

         (function () {

            "use strict";

            var _radiusDelta = 0;
            var _radiusCurveDelta = 0;

            return {

               defaults:{
                  minRadius:30,
                  maxRadius:50,
                  minCurveRadius:30,
                  maxCurveRadius:90,
                  outerPadding:20,
                  innerPadding:20,
                  generationDimensions:new Rectangle({x:20, y:20, width:340, height:340}),
                  colorPalette:["#4cd2e6", "#399dac", "#266973", "#13353a", "#79ddec", "#a5e8f2", "#d2f4f9", "#472de0", "#3522a8", "#241770", "#120b38", "#7562e8", "#a396ef", "#d1caf7", "#faa4b5", "#bb7b88", "#7d525b", "#3f292d", "#fbbbc8", "#fcd1da"]
               },

               initialize:function () {

                  this.set("colorPalette", ["#4cd2e6", "#399dac", "#266973", "#13353a", "#79ddec", "#a5e8f2", "#d2f4f9", "#472de0", "#3522a8", "#241770", "#120b38", "#7562e8", "#a396ef", "#d1caf7", "#faa4b5", "#bb7b88", "#7d525b", "#3f292d", "#fbbbc8", "#fcd1da"]);
                  this.set("generationDimensions", new Rectangle({x:20, y:20, width:340, height:340}));

                  // calculate deltas
                  _radiusDelta = this.get("maxRadius") - this.get("minRadius");
                  _radiusCurveDelta = this.get("maxCurveRadius") - this.get("minCurveRadius");

               },

               getRandomRadius:function () {
                  return this.get("minRadius") + Math.round(Math.random() * _radiusDelta);
               },

               getRandomCurveRadius:function () {
                  return this.get("minCurveRadius") + Math.round(Math.random() * _radiusCurveDelta);
               },

               getRandomColor:function (excludeColor, excludePassedColor) {

                  var ranColor = "#000000";

                  var colors = this.get("colorPalette");
                  var numberColors = colors.length;

                  if (excludePassedColor) {

                     var subColorPalette = [];

                     for (var i = 0; i < numberColors; ++i) {

                        if (colors[i] !== excludeColor) {
                           subColorPalette.push(colors[i]);
                        }

                     }

                     if (subColorPalette.length > 0) {
                        ranColor = subColorPalette[Math.floor(subColorPalette.length * Math.random())];
                     }

                  } else {

                     if (numberColors > 0) {
                        ranColor = colors[Math.floor(numberColors * Math.random())];
                     }

                  }

                  return ranColor;

               },

               randomizeSettings:function () {

                  var min_size = 100;
                  var max_size = 400;
                  var outer_padding_min = 4;
                  var outer_padding_max = 100;
                  var inner_padding_min = 4;
                  var inner_padding_max = 100;
                  var min_radius_min = 4;
                  var min_radius_max = 100;
                  var max_radius_min = 4;
                  var max_radius_max = 100;
                  var min_curve_radius_min = 0;
                  var min_curve_radius_max = 200;
                  var max_curve_radius_min = 0;
                  var max_curve_radius_max = 200;

                  // gather radius
                  this.set("minRadius", min_radius_min + Math.round((min_radius_max - min_radius_min) * Math.random()));
                  this.set("maxRadius", max_radius_min + Math.round((max_radius_max - max_radius_min) * Math.random()));

                  if (this.get("minRadius") > this.get("maxRadius")) {
                     this.set("maxRadius", this.get("minRadius"));
                  }

                  // gather curve radius
                  this.set("minCurveRadius", min_curve_radius_min + Math.round((min_curve_radius_max - min_curve_radius_min) * Math.random()));
                  this.set("maxCurveRadius", max_curve_radius_min + Math.round((max_curve_radius_max - max_curve_radius_min) * Math.random()));

                  if (this.get("minCurveRadius") > this.get("maxCurveRadius")) {
                     this.set("maxCurveRadius", this.get("minCurveRadius"));
                  }

                  this.set("outerPadding", outer_padding_min + Math.round((outer_padding_max - outer_padding_min) * Math.random()));
                  this.set("innerPadding", inner_padding_min + Math.round((inner_padding_max - inner_padding_min) * Math.random()));


                  this.get("generationDimensions").set("x", this.get("outerPadding"));
                  this.get("generationDimensions").set("y", this.get("outerPadding"));
                  this.get("generationDimensions").set("width", (min_size + Math.round((max_size - min_size) * Math.random())) + (2 * this.get("outerPadding")));
                  this.get("generationDimensions").set("height", (min_size + Math.round((max_size - min_size) * Math.random())) + (2 * this.get("outerPadding")));

               },

               toString:function () {
                  return "andy factory settings";
               }

            };
         })()

      );
   }
);