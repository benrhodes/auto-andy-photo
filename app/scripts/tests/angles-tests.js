/*global define module test expect equal notEqual*/
define(

    ["nocircleno/math/angles"],

    function(Angles) {

        module( "Angles");
        test( "getMinAngleDiff", function() {

            expect(2);

            var angle1 = 0;
            var angle2 = 45;

            equal(Angles.getMinAngleDiff(angle1, angle2), 45);

            angle1 = 10;
            angle2 = 270;

            equal(Angles.getMinAngleDiff(angle1, angle2), 100);

        });

        test( "getMaxAngleDiff", function() {

            expect(2);

            var angle1 = 0;
            var angle2 = 45;

            equal(Angles.getMaxAngleDiff(angle1, angle2), 315);

            angle1 = 10;
            angle2 = 270;

            equal(Angles.getMaxAngleDiff(angle1, angle2), 260);

        });

    }

);