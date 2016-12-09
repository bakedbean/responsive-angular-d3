'use strict';

export default [
  '$routeProvider',
  function Routing($routeProvider) {
    $routeProvider
      .when('/', { 
        template: require('./views/index.html')
      })
      .otherwise({
        redirectTo: '/'
      });
  }
];
