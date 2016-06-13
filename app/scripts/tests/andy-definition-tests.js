/*global define module test expect equal notEqual*/
define(

   ["nocircleno/geom/point", "nocircleno/geom/arc", "nocircleno/auto_andy_core/andy-definition"],

   function (Point, Arc, AndyDefinition) {

      var p1 = new Point({x:100, y:100});
      var p2 = new Point({x:500, y:500});
      var p3 = new Point({x:100, y:100});

      var arc1 = new Arc({startPoint:p1, controlPoint:p2, endPoint:p3});

      var p4 = new Point({x:100, y:100});
      var p5 = new Point({x:500, y:500});
      var p6 = new Point({x:100, y:100});

      var arc2 = new Arc({startPoint:p4, controlPoint:p5, endPoint:p6});

      var p7 = new Point({x:100, y:100});
      var p8 = new Point({x:500, y:500});
      var p9 = new Point({x:100, y:100});

      var arc3 = new Arc({startPoint:p7, controlPoint:p8, endPoint:p9});

      var p10 = new Point({x:333, y:33});
      var p11 = new Point({x:3, y:3333});
      var p12 = new Point({x:33, y:333});

      var arc4 = new Arc({startPoint:p10, controlPoint:p11, endPoint:p12});

      module("Andy Definitions");

      test("addArc", function () {

         expect(3);

         var andyDef1 = new AndyDefinition({renderColor:"#ff0000"});
         andyDef1.addArc(arc1);
         andyDef1.addArc(arc2);
         andyDef1.addArc(arc3);

         equal(andyDef1.get("arcs").length, 3);

         var andyDef1b = new AndyDefinition({renderColor:"#ff0000"});
         andyDef1b.addArc(arc1);

         equal(andyDef1b.get("arcs").length, 1);
         equal(andyDef1.get("arcs").length, 3);

      });

      test("replaceArcAt", function () {

         expect(2);

         var andyDef2 = new AndyDefinition({renderColor:"#ff0000"});
         andyDef2.addArc(arc1);
         andyDef2.addArc(arc2);
         andyDef2.addArc(arc3);

         var xRef = andyDef2.get("arcs")[2].get("startPoint").get("x");

         equal(xRef, 100);

         andyDef2.replaceArcAt(arc4, 2);

         equal(andyDef2.get("arcs")[2].get("startPoint").get("x"), 333);

      });

      test("removeArc", function () {

         expect(3);

         var andyDef5 = new AndyDefinition({renderColor:"#ffffff"});
         andyDef5.addArc(arc1);
         andyDef5.addArc(arc2);

         equal(andyDef5.get("arcs").length, 2);

         andyDef5.removeArc(arc1);

         equal(andyDef5.get("arcs").length, 1);

         equal(andyDef5.get("arcs")[0].equals(arc2), true);

      });

      test("buildDirty Flag", 2, function () {

         expect(2);

         var andyDef4 = new AndyDefinition({renderColor:"#ffffff"});

         equal(andyDef4.get("buildDirty"), false);

         andyDef4.addArc(arc1);

         equal(andyDef4.get("buildDirty"), true);

      });

      test("getSVGPath", function () {

         expect(1);

         var andyDef3 = new AndyDefinition({renderColor:"#ff0000"});
         andyDef3.addArc(arc1);

         var svg = andyDef3.getSVGPath();

         equal(svg, "M 100 100 Q 500 500 100 100 z");

      });

   }

);