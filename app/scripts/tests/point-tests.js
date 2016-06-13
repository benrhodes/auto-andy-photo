/*global define module test expect equal notEqual*/
define(["nocircleno/geom/point"], function (Point) {

      module("Point Obj");

      test("Create Points", function () {

         expect(5);

         var point1 = new Point({x:100, y:100});
         var point2 = new Point({x:500, y:500});
         var point3 = new Point({x:100, y:100});

         equal(point1.equals(point2), false);
         equal(point1.equals(point3), true);
         notEqual(point1.equals(point2));

         var p2X = point2.get("x");

         equal(p2X, 500);

         point2.set("x", 300);

         equal(point2.get("x"), 300);

      });

      test("Change Points", function () {

         expect(3);

         var point1 = new Point({x:1, y:2});

         equal(point1.get("x"), 1);
         equal(point1.get("y"), 2);

         point1.set("x", 999);

         equal(point1.get("x"), 999);

      });


      test("Clone Points", function () {

         expect(8);

         var point1 = new Point({x:1, y:2});
         var point2 = point1.clone();

         equal(point1.get("x"), 1);
         equal(point1.get("y"), 2);
         equal(point2.get("x"), 1);
         equal(point2.get("y"), 2);

         point2.set("x", 999);
         point2.set("y", 1000);

         equal(point1.get("x"), 1);
         equal(point1.get("y"), 2);
         equal(point2.get("x"), 999);
         equal(point2.get("y"), 1000);

      });
   }
);