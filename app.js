'use strict';

import angular from 'angular';

import BarChartDirective from './directives/bar-chart-directive';

import '../styles/sass/main.scss';

angular.module('responsiveD3', [])
  .directive('barÇhart', BarChartDirective);
