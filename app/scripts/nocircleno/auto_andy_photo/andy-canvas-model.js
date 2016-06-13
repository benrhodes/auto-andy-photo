/*global define */
define(

   ['underscore', 'backbone'],

   function (_, Backbone) {

      return Backbone.Model.extend({

         defaults:function () {
            return {
               width: 100,
               height: 100,
               x: 0,
               y: 0,
               scale: 1,
               andyViews: []
            };
         },

         removeAndyViewById: function(id) {

            var andyViews = this.get("andyViews");
            var numberViews = andyViews.length;
            for(var i=0; i<numberViews; i++) {
               if(andyViews[i].model.id === id) {
                  andyViews.splice(i, 1);
                  break;
               }
            }

         }
      });
   }
);