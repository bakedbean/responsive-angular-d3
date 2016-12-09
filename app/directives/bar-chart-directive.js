'use strict';

import BarChart from '../charts/bar-chart';

export default [
  '$window',
  '$timeout',
  'd3Service',
  function BarChartDirective($window, $timeout, d3Service){
    var linker = function(scope, element, attrs){
      d3Service.d3().then(function(d3) {
        // the DOM needs time to load, so that we can access the computed width of the container elements.
        // setting a 100ms timeout gives that xtra time to capture the final DOM
        $timeout(() => {
          let chart = new dsmBars(d3, element, scope.data);
          chart.render();

          angular.element($window).bind('resize', function(){
            chart.clean().size().render();
          });
        }, 100);
      });
    }

    return {
      restrict: 'EA',
      replace: true,
      link: linker,
      scope: { 
        data: '='
      }
    }
  }
];
