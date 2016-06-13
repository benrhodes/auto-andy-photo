/*global define */
define(

   ['jquery', 'underscore', 'backbone', 'templates', 'rgbColor', 'vendor/canvg'],

   function ($, _, Backbone, templates, RGBColor, Canvg) {

      return Backbone.View.extend(

         (function () {

            "use strict";

            var _removeCallback;

            function showLoading() {
               $("#loading_container").show();
            }

            function showSharedLink(shareLink) {
               $("#loading_container").remove();
               $("#shared_link_container").show();

               var sharedLinkValid = (shareLink.toLowerCase().indexOf("http://") !== -1 || shareLink.toLowerCase().indexOf("https://") !== -1);

               if(sharedLinkValid) {

                  $("#shared_link").html("<a class='sharedUrlLink' href='" + shareLink + "' target='_blank'>" + shareLink + "</a>");

                  $(".sharedUrlLink").bind("click", function() {
                     if(typeof(_gaq) !== "undefined") {
                        _gaq.push(['_trackEvent','Auto Andy Photo','Clicked Shared Image Link', shareLink, undefined, true]);
                     }
                  });

               } else {
                  $("#shared_link").html("<p>...or maybe not, something broke :(</p>");
                  if(typeof(_gaq) !== "undefined") {
                     _gaq.push(['_trackEvent','Auto Andy Photo','Shared Image failed', shareLink, undefined, true]);
                  }
               }

               $("#close_overlay").bind("click", function () {
                  if (_removeCallback) {
                     _removeCallback.call();
                  }

                  $("#close_overlay").unbind("click");
                  $(".sharedUrlLink").unbind("click");

                  $("#shared_link_container").remove();
                  $("#overlay").remove();
               });
            }

            return {

               events:{
                  "click #cancel_share_button":"removeView",
                  "click #share_it_button":"storePhoto"
               },

               initialize:function () {
                  this.template = templates.share_view;
                  this.render();
               },

               storePhoto:function () {

                  var photoData = $("#composition")[0].toDataURL("image/jpg");
                  var photoTitle = $("#photo_title").val();

                  $.ajax({
                     url:"write.php",
                     context:document.body,
                     data:{photoData:photoData, photoTitle:photoTitle},
                     type:"POST",
                     success:function (data) {
                        showSharedLink(data);
                     }
                  });

                  showLoading();

                  $("#share_container").remove();

                  if(typeof(_gaq) !== "undefined") {
                     _gaq.push(['_trackEvent','Auto Andy Photo','Shared Photo', photoTitle, undefined, true]);
                  }
               },

               addEventListener:function (type, eventHandler) {
                  if (type === "REMOVED") {
                     _removeCallback = eventHandler;
                  }
               },

               removeEventListener:function (type) {
                  if (type === "REMOVED") {
                     _removeCallback = undefined;
                  }
               },

               removeView:function () {
                  if (_removeCallback) {
                     _removeCallback.call();
                  }

                  $("#share_container").remove();
                  $("#overlay").remove();
               },

               render:function () {
                  var compositionWidth = this.model.get("canvasWidth");
                  var compositionHeight = this.model.get("canvasHeight");

                  $(this.el).append(this.template(this.model.toJSON()));

                  var compositionEl = $("#composition");
                  var shareContainerEl = $("#share_container");

                  var ctx = compositionEl[0].getContext('2d');

                  var andySvg = this.model.get("andySvg");
                  var maskCanvas = this.model.get("maskCanvas");

                  var baseImage = new Image();
                  baseImage.onload = function () {

                     ctx.drawImage(baseImage, 0, 0, Number(compositionWidth), Number(compositionHeight));

                     var x = new Canvg(compositionEl[0], andySvg, {ignoreClear:true, ignoreDimensions:true});

                     if (maskCanvas) {
                        var maskImg = new Image();
                        maskImg.onload = function () {
                           ctx.drawImage(this, 0, 0, Number(compositionWidth), Number(compositionHeight));
                           shareContainerEl.css("opacity", 1);
                        };

                        maskImg.src = maskCanvas.toDataURL("image/png");
                     }
                  };

                  baseImage.src = this.model.get("photoData");

                  shareContainerEl.css("margin-left", -compositionWidth / 2 - 4);

               }
            };
         }()));
   }
);