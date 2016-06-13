/*global define module test expect equal notEqual*/
define(

   ["nocircleno/geom/rectangle"],

   function (Rectangle) {

      module("Rectangle Obj");

      test("Create Rectangle", function () {

         expect(20);

         var rect1 = new Rectangle({x:100, y:100, width:250, height:120});

         equal(rect1.get("width"), 250);
         equal(rect1.get("height"), 120);

         equal(rect1.left(), 100);
         equal(rect1.top(), 100);
         equal(rect1.right(), 350);
         equal(rect1.bottom(), 220);

         rect1.left(50);
         equal(rect1.get("x"), 50);
         equal(rect1.get("width"), 300);

         rect1.right(75);
         equal(rect1.get("x"), 50);
         equal(rect1.get("width"), 25);

         rect1.left(-50);
         equal(rect1.get("x"), -50);
         equal(rect1.get("width"), 125);
         equal(rect1.right(), 75);

         rect1.top(10);
         equal(rect1.get("y"), 10);
         equal(rect1.get("height"), 210);

         rect1.bottom(620);
         equal(rect1.get("y"), 10);
         equal(rect1.get("height"), 610);

         rect1.top(-100);
         equal(rect1.get("y"), -100);
         equal(rect1.get("height"), 720);

         rect1.set("y", "very large");
         equal(rect1.get("y"), -100);

      });

   }

);