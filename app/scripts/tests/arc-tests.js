/*global define module test expect equal notEqual*/
define(

   ["nocircleno/geom/point", "nocircleno/geom/arc"],

   function (Point, Arc) {

      module("Arc Obj");

      test("Arcs", function () {

         expect(6);

         var point1 = new Point({x:100, y:100});
         var point2 = new Point({x:500, y:500});
         var point3 = new Point({x:100, y:100});

         var point4 = new Point({x:100, y:100});
         var point5 = new Point({x:500, y:500});
         var point6 = new Point({x:100, y:100});

         var arc1 = new Arc({startPoint:point1, controlPoint:point2, endPoint:point3});
         var arc2 = new Arc({startPoint:point3, controlPoint:point1, endPoint:point3});
         var arc3 = new Arc({startPoint:point1, controlPoint:point2, endPoint:point3});
         var arc4 = new Arc({startPoint:point4, controlPoint:point5, endPoint:point6});

         var arcsTest1 = arc1.equals(arc1);
         var arcsTest2 = arc1.equals(arc2);
         var arcsTest3 = arc1.equals(arc3);
         var arcsTest4 = arc1.equals(arc4);

         equal(arcsTest1, true);
         equal(arcsTest2, false);
         equal(arcsTest3, true);
         equal(arcsTest4, true);
         notEqual(arcsTest2);
         equal(arc1.get("startPoint").get("x"), 100);

      });
   }
);