'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/crud',{
        templateUrl:'views/crud.html',
        controller: 'crudCtrl'
      })

      .when('/update',{
        templateUrl:'views/update.html',
        controller: 'updateCtrl'
      })

      .otherwise({
        redirectTo: '/crud'
      });
  });
