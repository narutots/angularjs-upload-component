'use strict';
 
var myApp =angular.module('myApp', [
  'ui.router',
  'ngRoute',
  'uploadFileTest',
  'angularFileUpload',
  'services.common.constants'
]).config(function($httpProvider, $stateProvider,$routeProvider) {
 $httpProvider.defaults.headers.post = {
    'Content-Type' : 'application/json',
    'X-Requested-With' : 'XMLHttpRequest'
  }
  $routeProvider.otherwise({redirectTo: '/uploadTest'});
  $stateProvider
  .state('uploadTest', {
    url : '/uploadTest',
    templateUrl : 'uploadFileTest/uploadFileTest.html',
    controller : 'uploadFileTestCtrl'
  })
 
});
