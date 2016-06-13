define(['handlebars'], function(Handlebars) {

this["AutoAndyPhoto"] = this["AutoAndyPhoto"] || {};

this["AutoAndyPhoto"]["andy_svg"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <rect transform=\"translate(";
  if (stack1 = helpers.outerLeft) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.outerLeft; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ", ";
  if (stack1 = helpers.outerTop) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.outerTop; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")\" width=\"";
  if (stack1 = helpers.outerWidth) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.outerWidth; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.outerHeight) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.outerHeight; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" fill=\"#CCCCCC\"/>\n   ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <circle cx=\"";
  if (stack1 = helpers.centerX) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.centerX; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" cy=\"";
  if (stack1 = helpers.centerY) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.centerY; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" r=\"8\" fill=\"#000000\"/>\n   ";
  return buffer;
  }

  buffer += "<g xmlns=\"http://www.w3.org/2000/svg\">\n   ";
  stack1 = helpers['if'].call(depth0, depth0.outerLeft, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n   <path fill=\"";
  if (stack1 = helpers.renderColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.renderColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" d=\"";
  if (stack1 = helpers.bodyPath) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bodyPath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n   <g transform=\"translate(";
  if (stack1 = helpers.faceXPos) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.faceXPos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",";
  if (stack1 = helpers.faceYPos) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.faceYPos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ") scale(";
  if (stack1 = helpers.faceScale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.faceScale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ") rotate(";
  if (stack1 = helpers.faceRotation) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.faceRotation; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")\">\n      <path fill=\"";
  if (stack1 = helpers.faceColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.faceColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" d=\"";
  if (stack1 = helpers.facePath) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.facePath; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n   </g>\n   ";
  stack1 = helpers['if'].call(depth0, depth0.centerX, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</g>";
  return buffer;
  });

this["AutoAndyPhoto"]["menu_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"title_container\">\n   <h1>Auto Andy <span>Photo</span></h1>\n   <div id=\"app_info_container\">Created by <a href=\"http://www.nocircleno.com\" target=\"_blank\">Ben Rhodes</a> | In collaboration with <a href=\"http://www.andyandyandy.com\" target=\"_blank\">Andy Detskas</a></div>\n</div>\n<div id=\"menu_button_container\">\n    <button id=\"add_andy_button\" class=\"add_andy_mask_mode_off\">+ Andy</button>\n    <button id=\"mask_button\" class=\"mask_button_mask_mode_off\">Mask</button>\n    <div id=\"mask_options_container\">\n       <span>{</span> <div id=\"ink_mode_buttons_container\">\n           <label>Ink Mode</label>\n           <button id=\"add_mask_button\" class=\"activeSubButton\">Add</button>\n           <button id=\"erase_mask_button\">Erase</button>\n       </div>\n       <div id=\"bush_size_container\">\n         <label>Brush Size</label>\n       </div>\n       <button id=\"clear_work_button\">Clear</button>\n       <span>|</span>\n    </div>\n    <button id=\"share_work_button\">Share</button>\n</div>\n";
  });

this["AutoAndyPhoto"]["photo_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"dropbox\"></div>\n<div id=\"background\"><img id=\"preview\" alt=\"\" /></div>\n";
  });

this["AutoAndyPhoto"]["selection_rectangle_svg"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<g xmlns=\"http://www.w3.org/2000/svg\">\n	<rect class=\"selection-rect\" x=\"0\" y=\"0\" fill=\"none\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" width=\"200\" height=\"200\"/>\n	<rect class=\"ul-scale-handle\" x=\"-15\" y=\"-15\" fill=\"";
  if (stack1 = helpers.fillColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fillColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" width=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n	<rect class=\"ur-scale-handle\" x=\"185\" y=\"-15\" fill=\"";
  if (stack1 = helpers.fillColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fillColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" width=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n	<rect class=\"ll-scale-handle\" x=\"-15\" y=\"185\" fill=\"";
  if (stack1 = helpers.fillColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fillColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" width=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n	<rect class=\"lr-scale-handle\" x=\"185\" y=\"185\" fill=\"";
  if (stack1 = helpers.fillColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fillColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" width=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.handleSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handleSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n	<g class=\"rotation-group\" transform=\"translate(100, 0)\">\n		<circle class=\"rotate-handle\" fill=\"";
  if (stack1 = helpers.fillColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fillColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" cx=\"0\" cy=\"";
  if (stack1 = helpers.rotationHandleYOffset) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rotationHandleYOffset; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" r=\"";
  if (stack1 = helpers.rotationHandleRadius) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rotationHandleRadius; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n		<line fill=\"none\" stroke=\"";
  if (stack1 = helpers.strokeColor) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeColor; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-width=\"";
  if (stack1 = helpers.strokeSize) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.strokeSize; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" stroke-miterlimit=\"10\" x1=\"0\" y1=\"-40\" x2=\"0\" y2=\"0\"/>\n	</g>\n</g>";
  return buffer;
  });

this["AutoAndyPhoto"]["share_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"share_container\">\n    <div id=\"paper_work\">\n        <input id=\"photo_title\" type=\"text\" placeholder=\"Photo Title\" autofocus=\"true\" />\n        <div id=\"share_ui_container\">\n            <button id=\"share_it_button\">Share it!</button>\n            <button id=\"cancel_share_button\">Cancel</button>\n        </div>\n    </div>\n    <canvas id=\"composition\" width=\"";
  if (stack1 = helpers.canvasWidth) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.canvasWidth; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" height=\"";
  if (stack1 = helpers.canvasHeight) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.canvasHeight; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></canvas>\n</div>\n<div id=\"loading_container\">\n    <div>Cutting you a share!</div>\n    <img src=\"images/loader.gif\"/>\n</div>\n<div id=\"shared_link_container\">\n    <h3>Your photo awaits you!</h3>\n    <div id=\"shared_link\"></div>\n    <button id=\"close_overlay\">Close</button>\n</div>\n<div id=\"overlay\"></div>\n";
  return buffer;
  });

this["AutoAndyPhoto"]["svg_canvas"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<defs xmlns=\"http://www.w3.org/2000/svg\">\n   <filter id=\"dropshadow\" height=\"130%\">\n      <feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"3\"/>\n         <feOffset dx=\"2\" dy=\"2\" result=\"offsetblur\"/>\n      <feComponentTransfer>\n         <feFuncA type=\"linear\" slope=\"0.5\"/>\n      </feComponentTransfer>\n      <feMerge>\n      <feMergeNode/>\n      <feMergeNode in=\"SourceGraphic\"/>\n      </feMerge>\n   </filter>\n   <filter id=\"selectedFilter\" >\n     <feColorMatrix type=\"matrix\" values=\".343 .669 .119 0 0 .249 .626 .130 0 0 .172 .334 .111 0 0 .000 .000 .000 1 0\" />\n   </filter>\n</defs>";
  });

this["AutoAndyPhoto"]["svg_transform"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "translate(";
  if (stack1 = helpers['x']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['x']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",";
  if (stack1 = helpers['y']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['y']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ") scale(";
  if (stack1 = helpers.scale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.scale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ") rotate(";
  if (stack1 = helpers.rotation) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rotation; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ")";
  return buffer;
  });

this["AutoAndyPhoto"]["unsupported_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<link href='http://fonts.googleapis.com/css?family=Kavoon' rel='stylesheet' type='text/css'>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/unsupported.css\">\n<h1>Auto Andy <span>Photo</span></h1>\n<p>Ok, I know this is a lame excuse ... but the device, browser or whale that landed you here isn't currently working with this app. Here is a nice little video of Auto Andy Photo in motion.</p>\n<iframe width=\"640\" height=\"360\" id=\"video_frame\" src=\"http://www.youtube.com/embed/7k683maN9NM\" frameborder=\"0\" allowfullscreen></iframe>\n<p>This thing should work in the newest versions of <span>Google Chrome</span>, <span>Firefox</span> or <span>Safari</span>.</p>\n<p id=\"app_info\">Auto Andy Photo created by <a href=\"http://www.nocircleno.com\">Ben Rhodes</a> | In collaboration with <a href=\"http://www.andyandyandy.com\">Andy Detskas</a></p>\n";
  });

this["AutoAndyPhoto"]["visual_slider_template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slider-handle\"><canvas class=\"slider-icon\" width=\"42\" height=\"42\"></canvas></div>";
  });

return this["AutoAndyPhoto"];

});