/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates'],

   function ($, _, Backbone, templates) {

      return Backbone.View.extend({

         initialize:function () {
            this.template = templates.unsupported_view;
            this.render();
         },

         render:function () {
            this.$el.html(this.template());
         }
      });
   }
);