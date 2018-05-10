console.log('client.js has been loaded');

let app = angular.module('PetApp', ['ngRoute']);

app.controller('HomeController', ['$http', function($http) {
    let self=this;
    self.message = "Welcome to the Home Page";

}])