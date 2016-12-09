'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import Routing from './routes';
import BarChartDirective from './directives/bar-chart-directive';

import './styles/sass/main.scss';

angular.module('responsiveD3', [
    ngRoute
  ])
  .config(Routing)
  .directive('barChart', BarChartDirective);

