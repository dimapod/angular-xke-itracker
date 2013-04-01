'use strict';

var bugTrackerApp = angular.module('bugTrackerApp', ['ngResource', 'ngSanitize'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            // EXO-1.1 (route for /issue  (already fixed))
            .when('/issue', {
                templateUrl: 'partials/issue.html',
                controller: 'issueCtrl'
            })
            // EXO-1.1 (route for /archive)
            .when('/archive', {
                templateUrl: 'partials/archive.html',
                controller: 'issueCtrl'
            })
            // EXO-1.1 (routes for /about)
            .when('/about', {
                templateUrl: 'partials/about.html'
            })
            // EXO-2.1 (route for /user)
            // EXO-3.1 (route for /add)
            // EXO-5.1 (route for /edit)
            // EXO-1.3 (default route)

    }]);


