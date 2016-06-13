/*global define */
define(

   function () {

      return (function () {

         "use strict";

         var _isIE,
            _ieVersion,
            _isFirefox,
            _isChrome,
            _isIPad,
            _isIPhone,
            _isIPod,
            _isIOS,
            _isAndroid,
            _isSafari;

         _isIPad = navigator.userAgent.match(/iPad/i) !== null;
         _isIPhone = navigator.userAgent.match(/iPhone/i) !== null;
         _isIPod = navigator.userAgent.match(/iPod/i) !== null;
         _isAndroid = navigator.userAgent.toLowerCase().indexOf("android") !== -1;
         _isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") !== -1;
         _isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
         _isSafari = navigator.userAgent.match(/Safari/i) !== null;
         _isIE = navigator.appName == 'Microsoft Internet Explorer';
         _isIOS = _isIPad || _isIPhone || _isIPod;

         // get IE version if IE
         if (_isIE) {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
               _ieVersion = parseFloat(RegExp.$1);
         }

         return {
            isDeviceSupported:function () {
               return ((_isChrome || _isSafari || _isFirefox) && !(_isIOS || _isAndroid));
            }
         };

      }());

   }
);