
// Defines an angular module.
// Sets your module name and an array of dependencies (optional).
const myApp = angular.module('myApp', ['ngRoute']);

// Define routes for our angular app.
// The selected template will be shown in the <div ng-view /> element.
myApp.config(function($locationProvider, $routeProvider) {

      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/books', {
          template: `<book-list-page/>`
        }).
        when('/books/:bookId', {
          template: `<book-page/>`
        }).
        otherwise('/books');
    }
  );


// Defines a controller for the view.
// The parameters in the function are the required services (injected by angular)
myApp.controller('MyController', function($scope, bookService) {

  // We don't need this controller anymore
  $scope.title = "Books";
});
