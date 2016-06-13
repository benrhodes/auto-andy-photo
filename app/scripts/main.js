require(["nocircleno/utils/devices"],

   function (Devices) {
      if(Devices.isDeviceSupported()) {
         require(["nocircleno/auto_andy_photo/main-view"],
            function (MainView) {
               var main = new MainView({el: "#app_container"});
               main.render();
            }
         );
      } else {
         require(["nocircleno/auto_andy_photo/un-supported-view"],
            function (UnSupportedView) {
               var main = new UnSupportedView({el: "#app_container"});
               $("#app_container").fadeOut(0);
               main.render();
               $("#app_container").fadeIn(500);
            }
         );
      }
   });