console.log("app.js file has loaded");
const app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
  console.log("app.js has loaded");

  $routeProvider
    .when('/', {
      controller : 'userController',
      templateUrl : 'partials/_login.html',
    })
    .when('/dashboard', {
      controller : 'questionController',
      templateUrl : 'partials/_dashboard.html',
    })
    .when('/account', {
      controller : 'userController',
      templateUrl : 'partials/_account.html',
    })
    .when('/add_question', {
      controller : 'questionController',
      templateUrl : 'partials/_add_question.html',
    })
    .when('/play', {
      controller : 'questionController',
      templateUrl : 'partials/_play.html',
    })
    .otherwise('/')
}])
