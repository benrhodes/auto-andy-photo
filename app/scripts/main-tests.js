/*global require */
require([],

   function () {

      QUnit.init();

      require(["tests/point-tests", "tests/rectangle-tests", "tests/arc-tests", "tests/angles-tests", "tests/generator-circle-tests", "tests/andy-definition-tests"], function () {
         QUnit.start();
      });
   }
);