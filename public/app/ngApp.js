var nodeStart = angular.module('nodeStart', ['ngResource']);

nodeStart.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
})