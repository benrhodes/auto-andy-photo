/*global define */
define(

   function () {

      return (function () {

         "use strict";

         return {

            getRandomAngleBetweenTwoAngles:function (angle1, angle2) {

               var angle1Filtered = angle1 < 0 ? 360 + angle1 : angle1;
               var angle2Filtered = angle2 < 0 ? 360 + angle2 : angle2;

               var smallAngle = angle2Filtered;
               var bigAngle = angle1Filtered;

               if (angle1Filtered < angle2Filtered) {
                  smallAngle = angle1Filtered;
                  bigAngle = angle2Filtered;
               }

               var clockwiseDiff = bigAngle - smallAngle;
               var counterClockwiseDiff = smallAngle + (360 - bigAngle);
               var randomAngle;

               if (clockwiseDiff < counterClockwiseDiff) {
                  randomAngle = smallAngle + (clockwiseDiff * Math.random());
               } else {
                  randomAngle = bigAngle + (counterClockwiseDiff * Math.random());
                  randomAngle = randomAngle > 360 ? randomAngle - 360 : randomAngle;
               }

               return randomAngle;

            },

            getMinAngleDiff:function (angle1, angle2) {

               var angle1Filtered = angle1 < 0 ? 360 + angle1 : angle1;
               var angle2Filtered = angle2 < 0 ? 360 + angle2 : angle2;

               var smallAngle = angle2Filtered;
               var bigAngle = angle1Filtered;

               if (angle1Filtered < angle2Filtered) {
                  smallAngle = angle1Filtered;
                  bigAngle = angle2Filtered;
               }

               var clockwiseDiff = bigAngle - smallAngle;
               var counterClockwiseDiff = smallAngle + (360 - bigAngle);

               var rotationDiff = counterClockwiseDiff;

               if (clockwiseDiff < counterClockwiseDiff) {
                  rotationDiff = clockwiseDiff;
               }

               return rotationDiff;

            },

            getMaxAngleDiff:function (angle1, angle2) {

               var angle1Filtered = angle1 < 0 ? 360 + angle1 : angle1;
               var angle2Filtered = angle2 < 0 ? 360 + angle2 : angle2;

               var smallAngle = angle2Filtered;
               var bigAngle = angle1Filtered;

               if (angle1Filtered < angle2Filtered) {
                  smallAngle = angle1Filtered;
                  bigAngle = angle2Filtered;
               }

               var clockwiseDiff = bigAngle - smallAngle;
               var counterClockwiseDiff = smallAngle + (360 - bigAngle);

               var rotationDiff = counterClockwiseDiff;

               if (clockwiseDiff > counterClockwiseDiff) {
                  rotationDiff = clockwiseDiff;
               }

               return rotationDiff;

            }

         };

      }());

   }

);