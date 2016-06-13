/*global define module test expect equal notEqual*/
define(

   ["nocircleno/geom/point", "nocircleno/auto_andy_core/generator-circle"],

   function (Point, GeneratorCircle) {

      module("Generator Circle");

      test("Create | Set", function () {

         expect(6);

         var point = new Point({x:200, y:200});
         var circle = new GeneratorCircle({centerPoint:point, radius:20, angleMin:0, angleMax:90});

         equal(circle.get("radius"), 20);
         equal(circle.get("angleMin"), 0);
         equal(circle.get("angleMax"), 90);

         var circle2 = new GeneratorCircle({radius:20, angleMin:0, angleMax:90});

         equal(circle2.get("centerPoint").get("x"), 0);

         circle2.set("centerPoint", new Point({x:-30, y:500}));

         equal(circle2.get("centerPoint").get("x"), -30);
         equal(circle2.get("centerPoint").get("y"), 500);


      });
   }
);