// Create your myApp module
var app = angular.module('dnne', ['ngRoute'], 'djng.forms');
 
angular.module('preachApp')
// configuring routing.
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { // If URL is at /, uses template at
            templateUrl: '/static/html/index.html', // this location
            controller: 'MainCtrl' // and apply instructions from this controller
        })
 
    .otherwise({ // Any other URL, take me back to /
        redirectTo: '/'
    });
});

var app = angular.module('dnne', ['ngRoute']);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});
