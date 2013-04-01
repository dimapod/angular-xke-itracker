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
            // EXO-1.1 (routes for /about)
            // EXO-2.1 (route for /user)
            // EXO-3.1 (route for /add)
            // EXO-5.1 (route for /edit)
            // EXO-1.3 (default route)

    }]);


