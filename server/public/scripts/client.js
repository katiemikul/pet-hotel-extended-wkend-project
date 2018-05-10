console.log('client.js has been loaded');

let app = angular.module('PetApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as vm'
    }).when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController as vm'
    }).when('/owners', {
        templateUrl: 'views/owners.html',
        controller: 'OwnersController as vm'
    }).otherwise({
        template: '<h2>404</h2>'
    });
});